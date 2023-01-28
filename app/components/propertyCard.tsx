import { Link } from "@remix-run/react";
import { Property } from "~/models/properties.server";

const PropertyCard = ({ property }: { property: Property }) => (
  <article className="flex flex-col items-center bg-white rounded-md hover:bg-emerald-300">
    <Link
      className="p-5"
      to={`/properties/${property.id}`}
    >
      <header className="font-bold">
        <h1>{property.name}</h1>
      </header>
      <img className="my-4" width={500} height={500} src={property.image} />
      <p className="text-center">{property.description}</p>
    </Link>
  </article>
);
export default PropertyCard;
