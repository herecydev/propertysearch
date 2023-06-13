import {
  Form,
  useLoaderData,
  useSearchParams,
  useSubmit,
} from "@remix-run/react";
import { ComponentPropsWithoutRef } from "react";
import { loader } from "~/routes/properties.$id";
import { currencyFormat } from "~/utilities/intl";
import Button from "./common/button";
import TextInput from "./common/textInput";

const FinanceInput = ({
  label,
  unit,
  ...rest
}: {
  label: string;
  unit?: string;
} & ComponentPropsWithoutRef<"input">) => {
  return (
    <label className="font-light">
      {unit ? (
        <div className="flex justify-between">
          {label}
          <span>{unit}</span>
        </div>
      ) : (
        <div className="flex justify-center">{label}</div>
      )}
      <div className="flex justify-between items-center gap-2">
        <TextInput
          {...rest}
          required
          className="mt-1 w-full py-1 text-center text-2xl"
        />
      </div>
    </label>
  );
};

const Finance = () => {
  const { property, totalInterest } = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();
  const submit = useSubmit();

  return (
    <section data-testid="finance" className="bg-white rounded-md p-5 max-w-xs">
      <h1 className="text-2xl text-center">Mortgage Calculator</h1>
      <Form
        className="flex flex-col items-center"
        preventScrollReset
        onChange={(evt) => {
          // I love this progressive enhancement 🤩
          // it works without javascript but when it does load
          // we're making the value submit as the user types on the client
          submit(evt.currentTarget, { preventScrollReset: true });
        }}
      >
        <input type="hidden" name="_action" value="calculate" />
        <div className="flex flex-col gap-4 my-6 mx-8">
          <FinanceInput
            name="cost"
            maxLength={8}
            defaultValue={searchParams.get("cost") ?? property.price}
            label="Property value"
            unit="$"
          />
          <FinanceInput
            name="deposit"
            maxLength={5}
            defaultValue={searchParams.get("deposit") ?? property.price / 5}
            label="Deposit"
            unit="$"
          />
          <div className="flex gap-6">
            <FinanceInput
              name="interest"
              maxLength={5}
              defaultValue={searchParams.get("interest") ?? 4.5}
              label="Interest"
              unit="%"
            />
            <FinanceInput
              name="term"
              maxLength={2}
              label="Years"
              defaultValue={searchParams.get("term") ?? 30}
            />
          </div>
        </div>
        {totalInterest !== null && (
          <span className="mb-6 font-light text-3xl">
            {currencyFormat.format(totalInterest)}{" "}
            <span className="text-xl">/month</span>
          </span>
        )}
        <Button>Calculate</Button>
      </Form>
    </section>
  );
};

export default Finance;
