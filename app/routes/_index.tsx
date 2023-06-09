import { json, LoaderArgs } from "@remix-run/node";
import { Link, useLoaderData, useSearchParams } from "@remix-run/react";
import { useState } from "react";
import PropertyCard from "~/components/propertyCard";
import Search from "~/components/search";
import { getProperties } from "~/data/properties.server";
import { getSession } from "~/sessions";

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

const Index = () => {
  const { properties, favouriteProperties } = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");

  return (
    <main>
      <div className="flex justify-center my-10 sm:my-20">
        <Search search={search} setSearch={setSearch} />
      </div>
      {properties.length ? (
        <section
          data-testid="properties"
          className="xl:container mx-auto grid justify-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              isFavourited={favouriteProperties.some(
                (favourite) => favourite === property.id
              )}
            />
          ))}
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
