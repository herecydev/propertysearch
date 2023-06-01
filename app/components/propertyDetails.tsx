import { useLoaderData } from "@remix-run/react";
import type { loader } from "~/routes/properties.$id";
import { currencyFormat } from "~/utilities/intl";

const PropertyDetails = () => {
  const { property } = useLoaderData<typeof loader>();
  
  return (
    <section className="max-w-2xl flex flex-col gap-4 bg-white rounded-md">
      <img className="rounded-t-md" src={property.image} alt={property.name} />
      <div className="p-4 flex flex-col gap-2 items-center">
        <h1 className="text-3xl">{property.name}</h1>
        <span>{currencyFormat.format(property.price)}</span>
        <div className="max-w-xl space-y-4">
          {property.description.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyDetails;
