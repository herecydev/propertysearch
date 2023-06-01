import { Form } from "@remix-run/react";
import Button from "./button";

const Search = () => (
  <section
    data-testid="search"
    className="flex flex-col items-center w-full max-w-xl bg-white rounded-md p-6"
  >
    <p className="text-lg font-bold">
      Find the perfect property today to buy or rent
    </p>
    <Form method="get" className="flex justify-between w-full gap-3 mt-7">
      <input
        required
        autoFocus
        aria-label="Property location"
        name="search"
        placeholder="Brisbane"
        className="border border-slate-400 rounded-md px-3 w-full"
      />
      <Button>Search</Button>
    </Form>
  </section>
);

export default Search;
