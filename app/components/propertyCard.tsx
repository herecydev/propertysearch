import { Link } from "@remix-run/react";
import { Property } from "~/models/properties.server";

const PropertyCard = ({ property }: { property: Property }) => (
  <article className="bg-white rounded-md hover:bg-emerald-300">
    <Link className="flex flex-col items-center p-5" to={`/properties/${property.id}`} prefetch="intent">
      <header className="font-bold">
        <h1>{property.name}</h1>
      </header>
      <img className="my-4" width={500} height={500} src={property.image} />
      <p className="text-center">{property.shortDescription}</p>
    </Link>
  </article>
);
export default PropertyCard;
