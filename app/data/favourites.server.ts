import { commitSession, getSession } from "~/sessions";

export const toggleFavourite = async (
  request: Request,
  id: string
): Promise<string> => {
  const session = await getSession(request.headers.get("Cookie"));

  const favouriteProperties = new Set(session.get("favouriteProperties") ?? []);

  favouriteProperties.has(id)
    ? favouriteProperties.delete(id)
    : favouriteProperties.add(id);

  session.set("favouriteProperties", [...favouriteProperties]);

  return await commitSession(session);
};
