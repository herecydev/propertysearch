import { kv } from "@vercel/kv";
import { createKvSessionStorage } from "@vercel/remix";

type SessionData = {
  favouriteProperties: string[];
};

const { getSession, commitSession } = createKvSessionStorage<SessionData>({
  kv,
  cookie: {
    name: "__session",
    httpOnly: true,
  },
});

export { getSession, commitSession };
