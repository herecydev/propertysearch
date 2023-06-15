import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@vercel/remix";
import FavouritesContextProvider from "./components/favouritesContextProvider";
import Header from "./components/header";
import styles from "./tailwind.css";

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
      <body className="bg-blue-100/50">
        <FavouritesContextProvider>
          <Header />
          <main className="xl:container mx-auto p-3 md:p-6">
            <Outlet />
          </main>
        </FavouritesContextProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
