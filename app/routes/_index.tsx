import { Link, useLoaderData, useSearchParams } from "@remix-run/react";
import { ActionArgs, json, LoaderArgs } from "@vercel/remix";
import { useState } from "react";
import PropertyGrid from "~/components/propertyGrid";
import Search from "~/components/search";
import { toggleFavourite } from "~/data/favourites.server";
import { getProperties } from "~/data/properties.server";
import { getSession } from "~/sessions";

export const loader = async ({ request }: LoaderArgs) => {
  const search = new URL(request.url).searchParams.get("search");
  const properties = await getProperties();
  const session = await getSession(request.headers.get("Cookie"));

  return json({
    properties: search
      ? properties.filter((property) =>
          property.title.toLowerCase().includes(search.toLowerCase())
        )
      : properties,
    favouriteProperties: session.get("favouriteProperties") ?? [],
  });
};

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();

  return json(null, {
    headers: {
      "Set-Cookie": await toggleFavourite(request, `${formData.get("id")}`),
    },
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
