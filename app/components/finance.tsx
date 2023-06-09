import {
  Form,
  useLoaderData,
  useSearchParams,
  useSubmit
} from "@remix-run/react";
import { ComponentPropsWithoutRef } from "react";
import { loader } from "~/routes/properties.$id";
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
        <div className="flex justify-between">
          {label}
          <span>{unit}</span>
        </div>
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
  const { property, totalInterest } = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();
  const submit = useSubmit();

  return (
    <section data-testid="finance" className="bg-white rounded-md p-5">
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
        <div className="mx-6 my-4 w-52">
          <Input
            name="deposit"
            maxLength={5}
            defaultValue={searchParams.get("deposit") ?? property.price / 5}
            label="Deposit"
            unit="$"
          />
          <Input
            name="interest"
            maxLength={5}
            defaultValue={searchParams.get("interest") ?? 4.5}
            label="Interest Rate"
            unit="%"
          />
          <Input
            name="term"
            maxLength={2}
            label="Mortgage term"
            defaultValue={searchParams.get("term") ?? 30}
            unit="yr"
          />
        </div>
        {totalInterest && (
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
