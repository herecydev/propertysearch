import { json, LoaderArgs, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getProperties } from "~/models/properties.server";

export const loader = async ({ params }: LoaderArgs) => {
  const properties = await getProperties();

  if (!params.id) {
    return redirect("/");
  }

  const property = properties.find((property) => property.id == params.id);
  if (!property) throw new Response("", { status: 404 });

  return json({
    property,
  });
};

const Property = () => {
  const { property } = useLoaderData<typeof loader>();

  return <h1>{property.name}</h1>;
};

export default Property;
