import { json, LoaderArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
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

  return (
    <main>
      <div className="flex justify-center my-10 sm:my-20">
        <Search />
      </div>
      {properties.length ? (
        <section
          data-testid="properties"
          className="xl:container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5"
        >
          {properties.map((property) => (
            <Link to={`/properties/${property.id}`} prefetch="intent">
              <PropertyCard
                key={property.id}
                property={property}
                summary={true}
              />
            </Link>
          ))}
        </section>
      ) : (
        <div className="text-center">
          Sorry, we can't find any properties!
          <Link to="/" className="text-emerald-700 ms-1">
            Try again.
          </Link>
        </div>
      )}
    </main>
  );
};

export default Index;
