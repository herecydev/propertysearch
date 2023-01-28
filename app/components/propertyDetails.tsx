import { Property } from "~/models/properties.server";

const PropertyDetails = ({ property }: { property: Property }) => (
  <section className="mx-auto max-w-4xl mt-10 p-8 flex flex-col gap-4 items-center bg-white rounded-md">
    <h1 className="text-3xl">{property.name}</h1>
    <img width={500} height={500} src={property.image} />
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
