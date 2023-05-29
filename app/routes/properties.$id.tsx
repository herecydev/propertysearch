import { ActionArgs, json, LoaderArgs, redirect } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import Button from "~/components/button";
import Input from "~/components/input";
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
  const interest = formData.get("mortgage-interest");
  const term = formData.get("mortgage-term");

  const properties = await getProperties();
  const property = properties.find((property) => property.id == params.id);

  if (!interest || !term || !property) {
    return json({ monthlyCost: 0 });
  }

  // This is totally not how you calculate compound interest 😂
  const annualInterest = property.price * (+interest / 100);
  const totalInterest = annualInterest * +term;
  const total = property.price + totalInterest;
  const monthlyCost = total / +term / 12;

  return json({
    monthlyCost,
  });
};

const numberFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});

const Property = () => {
  const { property } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  return (
    <main className="mt-10 gap-4 flex justify-center max-lg:flex-wrap">
      <PropertyDetails property={property} />
      <section data-testid="finance" className="bg-white rounded-md p-5 h-max">
        <h1 className="text-2xl text-center">Estimated mortgage costs</h1>
        <Form method="post" className="flex flex-col items-center">
          <div className="mx-6 my-4">
            <Input
              name="mortgage-interest"
              maxLength={5}
              defaultValue={4.5}
              label="Interest Rate"
            />
            <Input
              name="mortgage-term"
              maxLength={2}
              label="Mortgage term"
              defaultValue={30}
            />
          </div>
          {actionData?.monthlyCost && (
            <strong className="mb-4">
              Monthly cost: {numberFormat.format(actionData.monthlyCost)}
            </strong>
          )}
          <Button>Calculate</Button>
        </Form>
      </section>
    </main>
  );
};

export default Property;
