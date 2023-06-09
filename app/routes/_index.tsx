import { ActionArgs, json, LoaderArgs } from "@vercel/remix";
import { Link, useLoaderData, useSearchParams } from "@remix-run/react";
import { useState } from "react";
import PropertyCard from "~/components/propertyCard";
import Search from "~/components/search";
import { getProperties } from "~/data/properties.server";
import { getSession } from "~/sessions";
import { toggleFavourite } from "~/data/favourites.server";

export const loader = async ({ request }: LoaderArgs) => {
  const search = new URL(request.url).searchParams.get("search");
  const properties = await getProperties();
  const session = await getSession(request.headers.get("Cookie"));

  return json({
    properties: search
      ? properties.filter((property) =>
          property.title.toLowerCase().includes(search.toLowerCase())
        )
      : properties,
    favouriteProperties: session.get("favouriteProperties") ?? [],
  });
};

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();

  return json(null, {
    headers: {
      "Set-Cookie": await toggleFavourite(request, `${formData.get("id")}`),
    },
  });
};

const Index = () => {
  const { properties, favouriteProperties } = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [favouritesOnly, setFavouritesOnly] = useState(false);
  const favouritePropertiesSet = new Set(favouriteProperties);

  return (
    <main>
      <div className="flex justify-center my-10 sm:my-20">
        <Search search={search} setSearch={setSearch} />
      </div>
      {properties.length ? (
        <section data-testid="properties" className="xl:container mx-auto">
          <label className="text-lg">
            <input
              type="checkbox"
              className="mr-1 mb-4 w-4 h-4 accent-emerald-300"
              checked={favouritesOnly}
              onChange={() => setFavouritesOnly(!favouritesOnly)}
            />
            Just my favourites
          </label>
          <div className="grid justify-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties
              .filter((property) =>
                favouritesOnly ? favouritePropertiesSet.has(property.id) : true
              )
              .map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  isFavourited={favouritePropertiesSet.has(property.id)}
                />
              ))}
          </div>
        </section>
      ) : (
        <div className="text-center">
          Sorry, we can't find any properties!
          <Link
            to="/"
            onClick={() => {
              setSearch("");
            }}
            className="text-emerald-700 ms-1 underline"
          >
            Try again.
          </Link>
        </div>
      )}
    </main>
  );
};

export default Index;
