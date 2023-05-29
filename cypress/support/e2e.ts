Cypress.on("uncaught:exception", () => {
  // This absolute isn't ideal, right now however React 18 and SSR hydration is very tough to get right
  // See https://github.com/facebook/react/issues/24430
  // Specifically remix/react are rendering something on the server and then cypress is injecting a heap of other stuff that causes hydration to throw a fair few warnings
  return false;
});
