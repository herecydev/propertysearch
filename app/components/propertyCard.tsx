import { Link } from "@remix-run/react";
import { Property } from "~/models/properties.server";

const PropertyCard = ({ property }: { property: Property }) => (
  <article className="bg-white rounded-md hover:bg-emerald-300">
    <Link
      className="flex flex-col items-center"
      to={`/properties/${property.id}`}
      prefetch="intent"
    >
      <img className="rounded-t-md" width={500} height={500} src={property.image} />
      <div className="p-4">
        <header className="font-bold text-center">
          <h1>{property.name}</h1>
        </header>
        <p>{property.shortDescription}</p>
      </div>
    </Link>
  </article>
);
export default PropertyCard;
