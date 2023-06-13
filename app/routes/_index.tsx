import { Link, useLoaderData } from "@remix-run/react";
import { LoaderArgs, json } from "@vercel/remix";
import { useState } from "react";
import { useFavourites } from "~/components/favouritesContextProvider";
import PropertyGrid from "~/components/propertyGrid";
import Search from "~/components/search";
import { getProperties } from "~/data/properties.server";

export const headers = () => ({
  "Cache-Control": "max-age=86400, s-maxage=86400",
});

export const loader = async ({ request }: LoaderArgs) => {
  const search = new URL(request.url).searchParams.get("search");
  const properties = await getProperties();

  return json({
    properties: search
      ? properties.filter((property) =>
          property.title.toLowerCase().includes(search.toLowerCase())
        )
      : properties,
  });
};

const Index = () => {
  const { properties } = useLoaderData<typeof loader>();
  const [favouritesOnly, setFavouritesOnly] = useState(false);
  const { favourites } = useFavourites();

  const filteredProperties = properties.filter((property) =>
    favouritesOnly && favourites.size > 0 ? favourites.has(property.id) : true
  );

  return (
    <main>
      <div className="flex justify-center my-10 sm:my-20">
        <Search
          favourites={favouritesOnly}
          toggleFavourites={() => setFavouritesOnly(!favouritesOnly)}
        />
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
    </main>
  );
};

export default Index;
