import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import PropertyCard from "~/components/propertyCard";
import Search from "~/components/search";
import { getProperties } from "~/models/properties.server";

export const loader = async () => {
  return json({
    properties: await getProperties(),
  });
};

const Index = () => {
  const { properties } = useLoaderData<typeof loader>();

  return (
    <main>
      <div className="flex justify-center my-28">
        <Search />
      </div>
      <section className="grid grid-cols-3 m-16 gap-5">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </section>
    </main>
  );
};

export default Index;
