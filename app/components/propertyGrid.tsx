import { useLoaderData, useNavigation } from "@remix-run/react";
import { useState } from "react";
import type { loader } from "~/routes/_index";
import PropertyCard from "./propertyCard";

const PropertyGrid = () => {
  const { properties, favouriteProperties } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const [favouritesOnly, setFavouritesOnly] = useState(false);
  const favouritePropertiesSet = new Set(favouriteProperties);
  const favouriteSubmitting =
    (navigation.state === "submitting" || navigation.state === "loading") &&
    navigation.formData?.get("_action") === "favourite";

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
              isFavourited={
                favouriteSubmitting &&
                navigation.formData?.get("id") === property.id
                  ? !favouritePropertiesSet.has(property.id)
                  : favouritePropertiesSet.has(property.id)
              }
            />
          ))}
      </div>
    </section>
  );
};

export default PropertyGrid;
