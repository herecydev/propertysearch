import { Link } from "@remix-run/react";
import { Property } from "~/models/properties.server";

const PropertyCard = ({ property }: { property: Property }) => (
  <article className="flex flex-col items-center bg-white p-5 rounded-md">
    <header className="font-bold">
      <h1>
        <Link className="hover:underline" to={`/properties/${property.id}`}>
          {property.name}
        </Link>
      </h1>
    </header>
    <img className="my-4" width={500} height={500} src={property.image} />
    <p className="text-center">{property.description}</p>
  </article>
);
export default PropertyCard;
