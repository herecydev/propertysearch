import { Property } from "~/models/properties.server";
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
  summary,
}: {
  property: Property;
  summary: boolean;
}) => (
  <article
    data-testid={`property-${property.id}`}
    className={`bg-white rounded-md flex flex-col max-w-xl h-full transition-all duration-200 ease-in ${
      summary && "group hover:bg-emerald-300"
    }`}
  >
    <picture className="rounded-t-md overflow-hidden">
      <img
        className="group-hover:scale-110 transition-all duration-200 ease-in"
        src={property.image}
        alt="alt text"
      />
    </picture>
    <div className={`p-6 ${!summary && "mx-auto"}`}>
      <header className="flex justify-between gap-4 text-lg">
        <h1 className="font-normal uppercase">{property.name}</h1>
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
      {summary ? (
        <p className="font-light">{property.shortDescription}</p>
      ) : (
        <div className="space-y-4">
          {property.description.map((paragraph, index) => (
            <p className="font-light" key={index}>
              {paragraph}
            </p>
          ))}
        </div>
      )}
    </div>
  </article>
);
export default PropertyCard;
