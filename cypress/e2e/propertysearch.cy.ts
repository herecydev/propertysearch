import properties from "../../mocks/properties";
import { currencyFormat } from "~/utilities/intl";

const firstProperty = properties[0];

describe("Property search", () => {
  describe("Index page", () => {
    beforeEach(() => {
      cy.visit("/");
    });

    it("Displays all properties", () => {
      for (const property of properties) {
        cy.get(`[data-testid="property-${property.sys.id}"]`).within(() => {
          cy.contains(property.title);
          cy.contains(currencyFormat.format(property.price));
          cy.contains(`${property.bedrooms} bedrooms`);
          cy.contains(`${property.bathrooms} bathrooms`);
          cy.contains(property.summary);
        });
      }
    });

    it("Allows a user to search for properties", () => {
      cy.get("[data-testid='search']").within(() => {
        cy.contains("Find the perfect property today to buy or rent");
        cy.get("input").type(firstProperty.title);
        cy.get("button").click();
      });

      // Check that our filter does actually work
      cy.get(`[data-testid="properties"]`).children().should("have.length", 1);

      cy.get(`[data-testid="property-${firstProperty.sys.id}"]`).click();
      cy.url().should("include", `/properties/${firstProperty.sys.id}`);
    });

    it("Displays back link if there are no properties", () => {
      cy.get("[data-testid='search']").within(() => {
        cy.get("input").type("foo bar");
        cy.get("button").click();
      });

      cy.get(`[data-testid="properties"]`).should("not.exist");
      cy.contains("Sorry, we can't find any properties!");
      cy.contains("Try again.").click();

      cy.get(`[data-testid="properties"]`)
        .children()
        .should("have.length", properties.length);
    });

    it("Allows a user to favourite properties", () => {
      cy.get(`[data-testid="property-${firstProperty.sys.id}"] button`).click();
      cy.contains("My favourites").click();

      cy.get(`[data-testid="properties"]`).children().should("have.length", 1);
      cy.contains("My favourites").click();
      cy.get(`[data-testid="properties"]`).children().should("have.length", 2);
    });
  });

  describe("Property page", () => {
    beforeEach(() => {
      cy.visit(`/properties/${firstProperty.sys.id}`);
    });

    it("Allows a user to view property details", () => {
      cy.contains(firstProperty.title);
      cy.contains(currencyFormat.format(firstProperty.price));
      cy.contains(`${firstProperty.bedrooms} bedrooms`);
      cy.contains(`${firstProperty.bathrooms} bathrooms`);
      cy.contains(firstProperty.description);

      cy.get("[data-testid='estateAgentProfile']").within(() => {
        const estateAgent = firstProperty.estateAgent;

        cy.contains(estateAgent.name);
        cy.contains(`“${estateAgent.quote}”`);
        cy.contains("Contact estate agent").should(
          "have.attr",
          "href",
          `mailto:${estateAgent.email}`
        );
      });
    });

    it("Allows a user to get an estimate mortgage cost", () => {
      cy.get("[data-testid='finance']").within(() => {
        cy.contains("Mortgage Calculator");

        // Check default values
        cy.get("[name='cost']").should("have.value", firstProperty.price);
        cy.get("[name='deposit']").should(
          "have.value",
          firstProperty.price / 5
        );
        cy.get("[name='interest']").should("have.value", 4.5);
        cy.get("[name='term']").should("have.value", 30);

        cy.get("button").click();
        cy.contains("$1,621 /month");

        // Check that the interest rate/term does influence the value
        cy.get("[name='term']").clear().type("10");
        cy.get("button").click();
        cy.contains("$3,316 /month");
      });
    });
  });
});
