import { properties } from "~/models/properties.server";
import { currencyFormat } from "~/utilities/intl";

const firstProperty = properties[0];

describe("Property search", () => {
  describe("Index page", () => {
    beforeEach(() => {
      cy.visit("/");
    });

    it("Displays all properties", () => {
      for (const property of properties) {
        cy.get(`[data-testid="property-${property.id}"]`).within(() => {
          cy.contains(property.name);
          cy.contains(currencyFormat.format(property.price));
          cy.contains(property.shortDescription);
        });
      }
    });

    it("Allows a user to search for properties", () => {
      cy.get("[data-testid='search']").within(() => {
        cy.contains("Find the perfect property today to buy or rent");

        cy.get("input").type(firstProperty.name);
        cy.get("button").click();
      });

      // Check that our filter does actually work
      cy.get(`[data-testid="properties"]`).children().should("have.length", 1);

      cy.get(`[data-testid="property-${firstProperty.id}"]`).click();
      cy.url().should("include", `/properties/${firstProperty.id}`);
    });

    it("Displays back link if there are no properties", () => {
      cy.get("[data-testid='search']").within(() => {
        cy.get("input").type("foo bar");
        cy.get("button").click();
      });

      cy.get(`[data-testid="properties"]`).should("not.exist");
      cy.contains("Sorry, we can't find any properties!")
      cy.contains("Try again.").click()

      cy.get(`[data-testid="properties"]`).children().should("have.length", properties.length);
    });
  });

  describe("Property page", () => {
    beforeEach(() => {
      cy.visit(`/properties/${firstProperty.id}`);
    });

    it("Allows a user to view property details", () => {
      cy.contains(firstProperty.name);
      cy.contains(currencyFormat.format(firstProperty.price));

      for (const description of firstProperty.description) {
        cy.contains(description);
      }
    });

    it("Allows a user to get an estimate mortgage cost", () => {
      cy.get("[data-testid='finance']").within(() => {
        cy.contains("Estimated mortgage costs");

        // Check default values
        cy.get("[name='mortgageInterest']").should("have.value", 4.5);
        cy.get("[name='mortgageTerm']").should("have.value", 30);

        cy.get("button").click();
        cy.contains("$2,611 /month");

        // Check that the interest rate/term does influence the value
        cy.get("[name='mortgageTerm']").clear().type("10");
        cy.get("button").click();
        cy.contains("$4,833 /month");
      });
    });
  });
});
