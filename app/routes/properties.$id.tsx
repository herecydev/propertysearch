import { useLoaderData } from "@remix-run/react";
import { LoaderArgs, json, redirect } from "@vercel/remix";
import EstateAgentProfile from "~/components/estateAgentProfile";
import { useFavourites } from "~/components/favouritesContextProvider";
import Finance from "~/components/finance";
import PropertyCard from "~/components/propertyCard";
import { calculateInterest } from "~/data/finance.server";
import { getProperty } from "~/data/properties.server";

export const loader = async ({ request, params }: LoaderArgs) => {
  if (!params.id) {
    return redirect("/");
  }

  const property = await getProperty(params.id);
  const searchParams = new URL(request.url).searchParams;

  const deposit = searchParams.get("deposit");
  const interest = searchParams.get("interest");
  const term = searchParams.get("term");

  return json({
    property,
    totalInterest:
      deposit && interest && term
        ? await calculateInterest(property.id, +deposit, +interest, +term)
        : null,
  });
};

const Property = () => {
  const { property } = useLoaderData<typeof loader>();
  const { favourites } = useFavourites();

  return (
    <main className="mt-10 gap-8 flex justify-center max-lg:flex-wrap">
      <PropertyCard
        property={property}
        isFavourited={favourites.has(property.id)}
      />
      <div className="h-max flex flex-col justify-center gap-10">
        <EstateAgentProfile estateAgent={property.estateAgent} />
        <Finance />
      </div>
    </main>
  );
};

export default Property;
