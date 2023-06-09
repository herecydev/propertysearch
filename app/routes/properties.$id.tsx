import { useLoaderData, useNavigation } from "@remix-run/react";
import { ActionArgs, json, LoaderArgs, redirect } from "@vercel/remix";
import EstateAgentProfile from "~/components/estateAgentProfile";
import Finance from "~/components/finance";
import PropertyCard from "~/components/propertyCard";
import { toggleFavourite } from "~/data/favourites.server";
import { calculateInterest } from "~/data/finance.server";
import { getProperty } from "~/data/properties.server";
import { getSession } from "~/sessions";

export const loader = async ({ request, params }: LoaderArgs) => {
  if (!params.id) {
    return redirect("/");
  }

  const property = await getProperty(params.id);
  const session = await getSession(request.headers.get("Cookie"));
  const searchParams = new URL(request.url).searchParams;

  const deposit = searchParams.get("deposit");
  const interest = searchParams.get("interest");
  const term = searchParams.get("term");

  return json({
    property,
    favouriteProperties: session.get("favouriteProperties") ?? [],
    totalInterest:
      deposit && interest && term
        ? await calculateInterest(property.id, +deposit, +interest, +term)
        : null,
  });
};

export const action = async ({ request, params }: ActionArgs) => {
  if (!params.id) {
    return redirect("/");
  }

  return json(null, {
    headers: {
      "Set-Cookie": await toggleFavourite(request, params.id),
    },
  });
};

const Property = () => {
  const { property, favouriteProperties } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const isFavourited = favouriteProperties.some(
    (favourite) => favourite === property.id
  );
  console.log(navigation.state);

  // We can use optimistic UI patterns to make this transition feel instant even if we're waiting for the server
  const isSubmittingFavourite =
    navigation.formData?.get("_action") == "favourite" &&
    (navigation.state == "submitting" || navigation.state == "loading");

  return (
    <main className="mt-10 gap-8 flex justify-center max-lg:flex-wrap">
      <PropertyCard
        property={property}
        isFavourited={isSubmittingFavourite ? !isFavourited : isFavourited}
      />
      <div className="h-max flex flex-col justify-center gap-10">
        <EstateAgentProfile estateAgent={property.estateAgent} />
        <Finance />
      </div>
    </main>
  );
};

export default Property;
