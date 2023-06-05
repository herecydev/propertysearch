import { Property } from "~/models/properties.server";
import { currencyFormat } from "~/utilities/intl";

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
      <header className="flex justify-between gap-4 mb-3 text-lg">
        <h1 className="font-normal uppercase">{property.name}</h1>
        <span className="font-semibold text-teal-700">
          {currencyFormat.format(property.price)}
        </span>
      </header>
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
