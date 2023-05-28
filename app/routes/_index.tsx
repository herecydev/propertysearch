import { json, LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
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
      <div className="flex justify-center my-20">
        <Search />
      </div>
      <section className="container mx-auto grid grid-cols-3 gap-5">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </section>
    </main>
  );
};

export default Index;
