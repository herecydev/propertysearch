import { Link, useLoaderData } from "@remix-run/react";
import { LoaderArgs, json, redirect } from "@vercel/remix";
import EstateAgentProfile from "~/components/estateAgentProfile";
import Finance from "~/components/finance";
import PropertyCard from "~/components/propertyCard";
import { calculateInterest } from "~/data/finance.server";
import { getProperty } from "~/data/properties.server";

const cacheHeaders = {
  "Cache-Control": "max-age=86400, s-maxage=86400",
};

export const config = { runtime: "edge" };

export const headers = () => cacheHeaders;

export const loader = async ({ request, params }: LoaderArgs) => {
  if (!params.id) {
    return redirect("/");
  }

  const property = await getProperty(params.id);
  const searchParams = new URL(request.url).searchParams;

  const cost = searchParams.get("cost");
  const deposit = searchParams.get("deposit");
  const interest = searchParams.get("interest");
  const term = searchParams.get("term");

  return json(
    {
      property,
      totalInterest:
        cost && deposit && interest && term
          ? calculateInterest(+cost, +deposit, +interest, +term)
          : null,
    },
    {
      headers: cacheHeaders,
    }
  );
};

const Property = () => {
  const { property } = useLoaderData<typeof loader>();

  return (
    <div className="mt-8 grid justify-center gap-8 grid-cols-[minmax(auto,35rem)] lg:grid-cols-[35rem_20rem]">
      <Link to="/" className="text-emerald-700 ms-1 underline lg:col-span-2">
        Back to all properties
      </Link>
      <PropertyCard property={property} />
      <aside className="h-max flex flex-wrap justify-center gap-10">
        <EstateAgentProfile estateAgent={property.estateAgent} />
        <Finance />
      </aside>
    </div>
  );
};

export default Property;
