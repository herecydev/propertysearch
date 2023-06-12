import type { LinksFunction } from "@vercel/remix";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import styles from "./tailwind.css";
import Icon from "./components/icons/home";
import FavouritesContextProvider from "./components/favouritesContextProvider";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export default function App() {
  return (
    <html lang="en">
      <head>
        <title>Property Search</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <Meta />
        <Links />
      </head>
      <body className="xl:container mx-auto bg-blue-100/50 p-3 md:p-6">
        <header>
          <Icon />
        </header>
        <FavouritesContextProvider>
          <Outlet />
        </FavouritesContextProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
