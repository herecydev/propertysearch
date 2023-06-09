import { Link, useFetcher } from "@remix-run/react";
import { PropertyDetail, PropertySummary } from "~/models/properties";
import { currencyFormat } from "~/utilities/intl";
import Bath from "./icons/bath";
import Bed from "./icons/bed";
import Heart from "./icons/heart";
import HeartFilled from "./icons/heartFilled";

const Icon = ({ icon, count }: { icon: JSX.Element; count: number }) => (
  <div className="flex gap-2">
    {icon}
    {count}
  </div>
);

const PropertyCard = ({
  property,
  isFavourited,
}: {
  property: PropertyDetail | PropertySummary;
  isFavourited: boolean;
}) => {
  const fetcher = useFetcher();
  const hasSummary = "summary" in property;

  return (
    <article
      data-testid={`property-${property.id}`}
      className={`relative bg-white rounded-md flex flex-col max-w-lg h-full transition-all duration-200 ease-in ${
        hasSummary && "group"
      }`}
    >
      <picture className="rounded-t-md overflow-hidden">
        <img
          className="group-hover:scale-110 transition-all duration-200 ease-in"
          src={property.image}
          width={1200}
          height={1200}
          alt={property.title}
        />
      </picture>
      <div className="p-6">
        <div className="flex justify-between items-center gap-8 text-lg">
          <header>
            <h1 className="uppercase">{property.title}</h1>
            <span className="font-semibold text-teal-700">
              {currencyFormat.format(property.price)}
            </span>
          </header>
          <fetcher.Form
            method="post"
            action={`/api/favourites/${property.id}`}
            className="z-10 p-4"
          >
            <button>
              {isFavourited ? (
                <HeartFilled title="Favourite" />
              ) : (
                <Heart title="Favourite" />
              )}
            </button>
          </fetcher.Form>
        </div>
        <div className="flex gap-4 my-4">
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
      <Link
        className="after:absolute after:inset-0"
        to={`/properties/${property.id}`}
        prefetch="intent"
      />
    </article>
  );
};

export default PropertyCard;
