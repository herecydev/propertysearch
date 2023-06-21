import { Link, useLoaderData } from "@remix-run/react";
import { LoaderArgs, json } from "@vercel/remix";
import { useFavourites } from "~/components/favouritesContextProvider";
import PropertyGrid from "~/components/propertyGrid";
import Search from "~/components/search";
import { getProperties } from "~/data/properties.server";

const cacheHeaders = {
  "Cache-Control": "max-age=86400, s-maxage=86400",
};

export const config = { runtime: "edge" };

export const headers = () => cacheHeaders;

export const loader = async ({ request }: LoaderArgs) => {
  const search = new URL(request.url).searchParams.get("search");
  const properties = await getProperties();

  return json(
    {
      properties: search
        ? properties.filter((property) =>
            property.title.toLowerCase().includes(search.toLowerCase())
          )
        : properties,
    },
    {
      headers: cacheHeaders,
    }
  );
};

const Index = () => {
  const { properties } = useLoaderData<typeof loader>();
  const { favourites, favouritesOnly } = useFavourites();

  const filteredProperties = properties.filter((property) =>
    favouritesOnly && favourites.size > 0 ? favourites.has(property.id) : true
  );

  return (
    <>
      <div className="flex justify-center my-10 sm:my-20">
        <Search />
      </div>
      {properties.length ? (
        <PropertyGrid properties={filteredProperties} />
      ) : (
        <div className="text-center">
          Sorry, we can't find any properties!
          <Link to="/" className="text-emerald-700 ms-1 underline">
            Try again.
          </Link>
        </div>
      )}
    </>
  );
};

export default Index;
