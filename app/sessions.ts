import { createCookieSessionStorage } from "@remix-run/node";

type SessionData = {
  favouriteProperties: string[];
};

const { getSession, commitSession } = createCookieSessionStorage<SessionData>({
  cookie: {
    name: "__session",
    httpOnly: true,
  },
});

export { getSession, commitSession };
