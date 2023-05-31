import { ActionArgs, json, LoaderArgs, redirect } from "@remix-run/node";
import {
  Form,
  useActionData,
  useLoaderData,
  useSubmit,
} from "@remix-run/react";
import Button from "~/components/button";
import Input from "~/components/input";
import PropertyDetails from "~/components/propertyDetails";
import { getProperties } from "~/models/properties.server";
import { currencyFormat } from "~/utilities/intl";

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
  const actionData = useActionData<typeof action>();
  const submit = useSubmit();

  return (
    <main className="mt-10 gap-4 flex justify-center max-lg:flex-wrap">
      <PropertyDetails property={property} />
      <section data-testid="finance" className="bg-white rounded-md p-5 h-max">
        <h1 className="text-2xl text-center">Estimated mortgage costs</h1>
        <Form
          method="post"
          className="flex flex-col items-center"
          onChange={(evt) => {
            // I love this progressive enhancement 🤩
            // it works without javascript but we're making the value submit as the user types on the client
            submit(evt.currentTarget);
          }}
        >
          <div className="mx-6 my-4">
            <Input
              name="mortgageInterest"
              maxLength={5}
              defaultValue={actionData?.mortgageInterest || 4.5}
              label="Interest Rate"
            />
            <Input
              name="mortgageTerm"
              maxLength={2}
              label="Mortgage term"
              defaultValue={actionData?.mortgageTerm || 30}
            />
          </div>
          {actionData && (
            <strong className="mb-4">
              Monthly cost: {currencyFormat.format(actionData.monthlyCost)}
            </strong>
          )}
          <Button>Calculate</Button>
        </Form>
      </section>
    </main>
  );
};

export default Property;
