import {
  Form,
  useActionData,
  useLoaderData,
  useSubmit,
} from "@remix-run/react";
import { ComponentPropsWithoutRef } from "react";
import type { action, loader } from "~/routes/properties.$id";
import { currencyFormat } from "~/utilities/intl";
import Button from "./button";

const Input = ({
  label,
  unit,
  ...rest
}: {
  label: string;
  unit: string;
} & ComponentPropsWithoutRef<"input">) => {
  return (
    <div className="my-5">
      <label className="font-light">
        <div className="flex justify-between">{label}<span>{unit}</span></div>
        <div className="flex justify-between items-center gap-2">
          <input
            {...rest}
            required
            className="mt-1 w-full border-2 border-emerald-200 py-1 text-center text-2xl focus:outline-none rounded-sm"
          />
        </div>
      </label>
    </div>
  );
};

const Finance = () => {
  const { property } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const submit = useSubmit();

  return (
    <section data-testid="finance" className="bg-white rounded-md p-5">
      <h1 className="text-2xl text-center">Mortgage Calculator</h1>
      <Form
        method="post"
        className="flex flex-col items-center"
        onChange={(evt) => {
          // I love this progressive enhancement 🤩
          // it works without javascript but if we do have it
          // we're making the value submit as the user types on the client
          submit(evt.currentTarget);
        }}
      >
        <div className="mx-6 my-4 w-52">
          <Input
            name="mortgageDeposit"
            maxLength={5}
            defaultValue={property.price / 5}
            label="Deposit"
            unit="$"
          />
          <Input
            name="mortgageInterest"
            maxLength={5}
            defaultValue={actionData?.mortgageInterest || 4.5}
            label="Interest Rate"
            unit="%"
          />
          <Input
            name="mortgageTerm"
            maxLength={2}
            label="Mortgage term"
            defaultValue={actionData?.mortgageTerm || 30}
            unit="yr"
          />
        </div>
        {actionData && (
          <span className="mb-6 font-light text-3xl">
            {currencyFormat.format(actionData.monthlyCost)}{" "}
            <span className="text-xl">/month</span>
          </span>
        )}
        <Button>Calculate</Button>
      </Form>
    </section>
  );
};

export default Finance;
