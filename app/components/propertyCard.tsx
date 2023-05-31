import { Link } from "@remix-run/react";
import { Property } from "~/models/properties.server";
import { currencyFormat } from "~/utilities/intl";

const PropertyCard = ({ property }: { property: Property }) => (
  <article
    data-testid={`property-${property.id}`}
    className="bg-white rounded-md hover:bg-emerald-300"
  >
    <Link
      className="flex flex-col items-center"
      to={`/properties/${property.id}`}
      prefetch="intent"
    >
      <img className="rounded-t-md" src={property.image} />
      <div className="p-4">
        <header className="flex justify-between mb-2 text-lg">
          <h1 className="font-bold">{property.name}</h1>
          <span>{currencyFormat.format(property.price)}</span>
        </header>
        <p>{property.shortDescription}</p>
      </div>
    </Link>
  </article>
);
export default PropertyCard;
