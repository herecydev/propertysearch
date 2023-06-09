import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import type { loader } from "~/routes/_index";
import PropertyCard from "./propertyCard";

const PropertyGrid = () => {
  const { properties, favouriteProperties } = useLoaderData<typeof loader>();
  const [favouritesOnly, setFavouritesOnly] = useState(false);
  const favouritePropertiesSet = new Set(favouriteProperties);

  return (
    <section data-testid="properties" className="xl:container mx-auto">
      <label className="text-lg font-light">
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
  );
};

export default PropertyGrid;
