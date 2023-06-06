import { ActionArgs, json, LoaderArgs, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import EstateAgentProfile from "~/components/estateAgentProfile";
import Finance from "~/components/finance";
import PropertyCard from "~/components/propertyCard";
import { properties } from "~/models/properties.server";

export const loader = async ({ params }: LoaderArgs) => {
  if (!params.id) {
    return redirect("/");
  }

  const property = properties.find((property) => property.id == params.id);
  if (!property) throw new Response("", { status: 404 });

  return json({
    property,
  });
};

export const action = async ({ request, params }: ActionArgs) => {
  const formData = await request.formData();
  const interest = formData.get("mortgageInterest");
  const term = formData.get("mortgageTerm");

  const property = properties.find((property) => property.id == params.id);

  if (!interest || !term || !property) {
    throw new Error();
  }

  // This is totally not how you calculate compound interest 😂
  const annualInterest = property.price * (+interest / 100);
  const totalInterest = annualInterest * +term;
  const total = property.price + totalInterest;
  const monthlyCost = total / +term / 12;

  return json({
    mortgageInterest: interest,
    mortgageTerm: term,
    monthlyCost,
  });
};

const Property = () => {
  const { property } = useLoaderData<typeof loader>();

  return (
    <main className="mt-10 gap-8 flex justify-center max-lg:flex-wrap">
      <PropertyCard property={property} summary={false} />
      <div className="flex flex-col gap-6">
        <EstateAgentProfile estateAgent={property.estateAgent} />
        <Finance />
      </div>
    </main>
  );
};

export default Property;
