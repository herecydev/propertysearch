import { PropertySummary } from "~/models/properties";
import PropertyCard from "./propertyCard";

const PropertyGrid = ({ properties }: { properties: PropertySummary[] }) => {
  return (
    <section
      data-testid="properties"
      className="xl:container mx-auto grid justify-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </section>
  );
};

export default PropertyGrid;
