import { json, LoaderArgs } from "@remix-run/node";
import { Link, useLoaderData, useSearchParams } from "@remix-run/react";
import { useState } from "react";
import PropertyCard from "~/components/propertyCard";
import Search from "~/components/search";
import { getProperties } from "~/models/properties.server";

export const loader = async ({ request }: LoaderArgs) => {
  const properties = await getProperties();
  const search = new URL(request.url).searchParams.get("search");

  return json({
    properties: search
      ? properties.filter((property) =>
          property.name.toLowerCase().includes(search.toLowerCase())
        )
      : properties,
  });
};

const Index = () => {
  const { properties } = useLoaderData<typeof loader>();
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
          className="xl:container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5"
        >
          {properties.map((property) => (
            <Link
              key={property.id}
              to={`/properties/${property.id}`}
              prefetch="intent"
            >
              <PropertyCard property={property} summary={true} />
            </Link>
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
