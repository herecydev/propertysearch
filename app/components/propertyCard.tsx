import { PropertyDetail, PropertySummary } from "~/models/properties";
import { currencyFormat } from "~/utilities/intl";
import Bath from "./icons/bath";
import Bed from "./icons/bed";

const Icon = ({ icon, count }: { icon: JSX.Element; count: number }) => (
  <div className="flex gap-2">
    {icon}
    {count}
  </div>
);

const PropertyCard = ({
  property,
}: {
  property: PropertyDetail | PropertySummary;
}) => {
  const hasSummary = "summary" in property;

  return (
    <article
      data-testid={`property-${property.id}`}
      className={`bg-white rounded-md flex flex-col max-w-lg h-full transition-all duration-200 ease-in ${
        hasSummary && "group hover:bg-emerald-300"
      }`}
    >
      <picture className="rounded-t-md overflow-hidden">
        <img
          className="group-hover:scale-110 transition-all duration-200 ease-in"
          src={property.image}
          width={1200}
          height={1200}
        />
      </picture>
      <div className="p-6">
        <header className="flex justify-between gap-4 text-lg">
          <h1 className="uppercase">{property.title}</h1>
          <span className="font-semibold text-teal-700">
            {currencyFormat.format(property.price)}
          </span>
        </header>
        <div className="flex gap-4 my-2">
          <Icon
            icon={<Bed title={`${property.bedrooms} bedrooms`} />}
            count={property.bedrooms}
          />
          <Icon
            icon={<Bath title={`${property.bathrooms} bathrooms`} />}
            count={property.bathrooms}
          />
        </div>
        {hasSummary ? (
          <p className="font-light">{property.summary}</p>
        ) : (
          <div className="my-4 space-y-4 font-light">
            {property.description.split("\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        )}
      </div>
    </article>
  );
};

export default PropertyCard;
