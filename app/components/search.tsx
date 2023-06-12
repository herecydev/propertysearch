import { Form, useSearchParams } from "@remix-run/react";
import Button from "./common/button";
import TextInput from "./common/textInput";

const Search = ({
  favourites,
  toggleFavourites,
}: {
  favourites: boolean;
  toggleFavourites: () => void;
}) => {
  const [searchParams] = useSearchParams();
  const defaultValue = searchParams.get("search") ?? undefined;

  return (
    <section className="w-full max-w-xl bg-white rounded-md p-6">
      <div data-testid="search" className="flex flex-col items-center">
        <h1 className="text-2xl font-light text-center">
          Find the perfect property today to buy or rent
        </h1>
        <Form method="get" className="flex justify-between w-full gap-3 mt-5">
          <TextInput
            required
            defaultValue={defaultValue}
            key={defaultValue}
            aria-label="Property location"
            name="search"
            placeholder="Brisbane"
            className="px-3 py-2 w-full"
          />
          <Button>Search</Button>
        </Form>
      </div>
      <label className="text-lg font-light">
        <input
          type="checkbox"
          className="mr-2 mt-6 w-4 h-4 accent-emerald-300"
          checked={favourites}
          onChange={toggleFavourites}
        />
        Just my favourites
      </label>
    </section>
  );
};

export default Search;
