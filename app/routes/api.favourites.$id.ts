import { ActionArgs, json } from "@remix-run/node";
import { commitSession, getSession } from "~/sessions";

export const action = async ({ request, params }: ActionArgs) => {
  if (!params.id) {
    return null;
  }
  const session = await getSession(request.headers.get("Cookie"));
  const favouriteProperties = new Set(session.get("favouriteProperties") ?? []);

  favouriteProperties.has(params.id)
    ? favouriteProperties.delete(params.id)
    : favouriteProperties.add(params.id);

  session.set("favouriteProperties", [...favouriteProperties]);

  return json(null, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};
