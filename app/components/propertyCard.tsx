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
    className={`bg-white rounded-md flex flex-col h-full ${
      summary && "hover:bg-emerald-300"
    }`}
  >
    <img className="rounded-t-md" src={property.image} />
    <div className={`p-4 max-w-xl ${!summary && "mx-auto"}`}>
      <header className="flex justify-between gap-4 mb-2 text-lg">
        <h1 className="font-bold">{property.name}</h1>
        <span>{currencyFormat.format(property.price)}</span>
      </header>
      {summary ? (
        <p>{property.shortDescription}</p>
      ) : (
        <div className="space-y-4">
          {property.description.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      )}
    </div>
  </article>
);
export default PropertyCard;
