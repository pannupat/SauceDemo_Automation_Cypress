function getNames() {
  return cy
    .get(selectors.items)
    .then(($items) =>
      Cypress._.map($items, (el) =>
        el.querySelector(selectors.itemName)?.textContent.trim()
      )
    );
}

function getPrices() {
  return cy.get(selectors.items).then(($items) =>
    Cypress._.map($items, (el) => {
      const t = el.querySelector(selectors.itemPrice)?.textContent.trim(); 
      return Number(t.replace("$", ""));
    })
  );
}

const selectors = {
  sort: '[data-test="product-sort-container"]',
  items: ".inventory_item",
  itemName: ".inventory_item_name",
  itemPrice: ".inventory_item_price",
  itemLink: ".inventory_item_name",
  title: ".title",
  backBtn: '[data-test="back-to-products"]', 
};

describe("Inventory Test All", () => {
  beforeEach(() => {
    cy.login("standard_user", "secret_sauce");
    //assert path/title
    cy.location("pathname").should("include", "inventory.html");
    cy.get(selectors.title).should("have.text", "Products");
  });

  it("SD_TC_007 Filter A-Z", () => {
    cy.get(selectors.sort).select("Name (A to Z)");

    getNames().then((names) => {
      const sorted = [...names].sort((a, b) => a.localeCompare(b));
      expect(names).to.deep.eq(sorted);
    });
  });

  it("SD_TC_008 Filter Z-A", () => {
    cy.get(selectors.sort).select("Name (Z to A)");

    getNames().then((names) => {
      const sorted = [...names].sort((a, b) => b.localeCompare(a));
      expect(names).to.deep.eq(sorted);
    });
  });

  it("SD_TC_009 Filter Price low to high", () => {
    cy.get(selectors.sort).select("Price (low to high)");

    getPrices().then((prices) => {
      const sorted = [...prices].sort((a, b) => a - b);
      expect(prices).to.deep.eq(sorted);
    });
  });

  it("SD_TC_010 Filter Price high to low", () => {
    cy.get(selectors.sort).select("Price (high to low)");

    getPrices().then((prices) => {
      const sorted = [...prices].sort((a, b) => b - a);
      expect(prices).to.deep.eq(sorted);
    });
  });

  it("SD_TC_011 Product detail", () => {
    cy.get(selectors.itemName)
      .first()
      .invoke("text")
      .then((clickedName) => {
        cy.get(selectors.itemName).first().click();
        cy.location("pathname").should("include", "inventory-item.html"); // ✅ ขีดกลาง
        cy.get(".inventory_details_name").should(
          "have.text",
          clickedName.trim()
        );
        cy.get(".inventory_details_price").should("be.visible");
        cy.get(".inventory_details_desc").should("be.visible");
      });
  });

  it("SD_TC_012 Back to Inventory", () => {
    cy.get(selectors.itemLink).eq(0).click();
    cy.get(selectors.backBtn).click();

    cy.location("pathname").should("include", "inventory.html");
    cy.get(".title").should("have.text", "Products");
    cy.get(".inventory_item").should("have.length.greaterThan", 0);
  });
});
