import { Form, useActionData, useSubmit } from "@remix-run/react";
import { ComponentPropsWithoutRef } from "react";
import type { action } from "~/routes/properties.$id";
import { currencyFormat } from "~/utilities/intl";
import Button from "./button";

const Input = ({
  label,
  ...rest
}: {
  label: string;
} & ComponentPropsWithoutRef<"input">) => {
  return (
    <div className="my-5 flex flex-col gap-1">
      <label>{label}</label>
      <input
        {...rest}
        required
        className="border-2 border-emerald-200 py-1 text-center text-2xl focus:outline-none rounded-sm"
      />
    </div>
  );
};

const Finance = () => {
  const actionData = useActionData<typeof action>();
  const submit = useSubmit();

  return (
    <section data-testid="finance" className="bg-white rounded-md p-5 h-max">
      <h1 className="text-2xl text-center">Estimated mortgage costs</h1>
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
