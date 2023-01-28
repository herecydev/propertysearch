import { json, LoaderArgs, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import PropertyDetails from "~/components/propertyDetails";
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

  return <PropertyDetails property={property} />;
};

export default Property;
