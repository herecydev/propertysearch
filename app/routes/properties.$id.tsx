import { ActionArgs, json, LoaderArgs, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Finance from "~/components/finance";
import PropertyDetails from "~/components/propertyDetails";
import { getProperties } from "~/models/properties.server";

export const loader = async ({ params }: LoaderArgs) => {
  const properties = await getProperties();

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

  const properties = await getProperties();
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
    <main className="mt-10 gap-4 flex justify-center max-lg:flex-wrap">
      <PropertyDetails property={property} />
      <section data-testid="finance" className="bg-white rounded-md p-5 h-max">
        <h1 className="text-2xl text-center">Estimated mortgage costs</h1>
        <Finance />
      </section>
    </main>
  );
};

export default Property;
