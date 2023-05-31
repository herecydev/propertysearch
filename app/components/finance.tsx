import { Form, useActionData, useSubmit } from "@remix-run/react";
import Input from "./input";
import Button from "./button";
import { action } from "~/routes/properties.$id";
import { currencyFormat } from "~/utilities/intl";

const Finance = () => {
  const actionData = useActionData<typeof action>();
  const submit = useSubmit();

  return (
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
  );
};

export default Finance;
