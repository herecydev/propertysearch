import { Property } from "~/models/properties.server";

const PropertyDetails = ({ property }: { property: Property }) => (
  <section className="mx-auto max-w-4xl mt-10 flex flex-col gap-4 items-center bg-white rounded-md">
    <img width="100%" src={property.image} alt={property.name} />
    <h1 className="text-3xl">{property.name}</h1>
    <div className="flex">
      <div className="max-w-xl space-y-4">
        {property.description.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  </section>
);

export default PropertyDetails;
