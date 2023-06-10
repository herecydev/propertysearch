🪄 https://searchproperty.vercel.app/ 🪄

A simple property search application built in react with the help of [Remix](https://remix.run/) and tested using [Cypress](https://www.cypress.io/).
This isn't obviously exhaustive but covers:

- Fundamental React principles & building blocks
- Integrating with a server to get SSR, data fetching and the whole application works without javascript! Accessibility 🚀
- Typescript
- An approach to styling using tailwind
- Automated testing
- Deployment onto Vercel

Stying isn't meant to be perfect, I'm no designer 🙈

## What don't I like 🧐?

We're 🤏 close to moving to ESM, it will land in Remix V2. However for the time being we have to do some CJS craziness with MSW in order to get the data returning our fakes. It's not too bad but one thing I can't wait to remove.
