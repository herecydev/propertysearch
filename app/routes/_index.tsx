import { Link, useLoaderData, useSearchParams } from "@remix-run/react";
import { LoaderArgs, json } from "@vercel/remix";
import { useState } from "react";
import PropertyGrid from "~/components/propertyGrid";
import Search from "~/components/search";
import { getProperties } from "~/data/properties.server";

export const loader = async ({ request }: LoaderArgs) => {
  const search = new URL(request.url).searchParams.get("search");
  const properties = await getProperties();

  return json({
    properties: search
      ? properties.filter((property) =>
          property.title.toLowerCase().includes(search.toLowerCase())
        )
      : properties,
  });
};

const Index = () => {
  const { properties } = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") ?? "");

  return (
    <main>
      <div className="flex justify-center my-10 sm:my-20">
        <Search search={search} setSearch={setSearch} />
      </div>
      {properties.length ? (
        <PropertyGrid />
      ) : (
        <div className="text-center">
          Sorry, we can't find any properties!
          <Link
            to="/"
            onClick={() => {
              setSearch("");
            }}
            className="text-emerald-700 ms-1 underline"
          >
            Try again.
          </Link>
        </div>
      )}
    </main>
  );
};

export default Index;
