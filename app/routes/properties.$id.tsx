import { useLoaderData } from "@remix-run/react";
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

  return json({
    property,
    favouriteProperties: session.get("favouriteProperties") ?? [],
  });
};

export const action = async ({ request, params }: ActionArgs) => {
  if (!params.id) {
    return redirect("/");
  }

  const formData = await request.formData();
  const action = formData.get("_action");

  if (action === "favourite") {
    return json(null, {
      headers: {
        "Set-Cookie": await toggleFavourite(request, `${formData.get("id")}`),
      },
    });
  }

  if (action === "calculate") {
    const deposit = formData.get("mortgageDeposit") ?? 0;
    const interest = formData.get("mortgageInterest") ?? 0;
    const term = formData.get("mortgageTerm") ?? 0;

    return json({
      mortgageInterest: interest,
      mortgageTerm: term,
      monthlyCost: await calculateInterest(
        params.id,
        +deposit,
        +interest,
        +term
      ),
    });
  }

  throw new Error("Invalid action type");
};

const Property = () => {
  const { property, favouriteProperties } = useLoaderData<typeof loader>();

  return (
    <main className="mt-10 gap-8 flex justify-center max-lg:flex-wrap">
      <PropertyCard
        property={property}
        isFavourited={favouriteProperties.some(
          (favourite) => favourite === property.id
        )}
      />
      <div className="h-max flex flex-col justify-center gap-10">
        <EstateAgentProfile estateAgent={property.estateAgent} />
        <Finance />
      </div>
    </main>
  );
};

export default Property;
