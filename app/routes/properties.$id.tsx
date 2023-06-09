import { ActionArgs, json, LoaderArgs, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import EstateAgentProfile from "~/components/estateAgentProfile";
import Finance from "~/components/finance";
import PropertyCard from "~/components/propertyCard";
import { getProperty } from "~/data/properties.server";
import { commitSession, getSession } from "~/sessions";

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
    const session = await getSession(request.headers.get("Cookie"));
    const favouriteProperties = new Set(
      session.get("favouriteProperties") ?? []
    );

    favouriteProperties.has(params.id)
      ? favouriteProperties.delete(params.id)
      : favouriteProperties.add(params.id);

    session.set("favouriteProperties", [...favouriteProperties]);

    return json(undefined, {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  const deposit = formData.get("mortgageDeposit") ?? 0;
  const interest = formData.get("mortgageInterest") ?? 0;
  const term = formData.get("mortgageTerm") ?? 0;

  const property = await getProperty(params.id);

  // This is totally not how you calculate compound interest 😂
  const loan = property.price - +deposit;
  const annualInterest = loan * (+interest / 100);
  const totalInterest = annualInterest * +term;
  const total = loan + totalInterest;
  const monthlyCost = total / +term / 12;

  return json({
    mortgageInterest: interest,
    mortgageTerm: term,
    monthlyCost,
  });
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
