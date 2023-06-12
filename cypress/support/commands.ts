Cypress.Commands.overwrite("visit", (originalFn, url, options) => {
  // This is, unfortunately the recommended way to deal with the react 18 hydration issue until 18.3 hopefully puts that to bed
  // What's really happening is that Cypress is able to find the input that's statically generated,
  // but is clashing with React's hydration that occurs rapidly after, so introducing a small wait to postpone until after React has replaced the server HTML with a full client representation
  originalFn(url, options);

  return cy.wait(300);
});
