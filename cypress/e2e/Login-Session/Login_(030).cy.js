describe("All TestCase Login", () => {
  beforeEach(() => {
    cy.visit("https://www.saucedemo.com/");
  });

  it("SD_TC_030 Persist Cart หลัง Logout/Login ใหม่ (ต้องยังอยู่ครบ)", () => {

    cy.login("standard_user", "secret_sauce");
    cy.location("pathname").should("eq", "/inventory.html");
    cy.get(".title").should("have.text", "Products");

    const items = [
      "sauce-labs-backpack",
      "sauce-labs-bike-light",
      "sauce-labs-bolt-t-shirt",
      "sauce-labs-fleece-jacket",
    ];

    items.forEach(id => {
      cy.get(`[data-test="add-to-cart-${id}"]`).click();
    });
    cy.get(".shopping_cart_badge").should("have.text", String(items.length));

    cy.get("#react-burger-menu-btn").click();
    cy.get("#logout_sidebar_link").click();
    cy.url().should("eq", "https://www.saucedemo.com/");
    cy.title().should("eq", "Swag Labs");

    cy.login("standard_user", "secret_sauce");
    cy.location("pathname").should("eq", "/inventory.html");
    cy.get(".title").should("have.text", "Products");

    cy.get(".shopping_cart_badge").should("have.text", String(items.length));

    cy.get(".shopping_cart_link").click();
    cy.location("pathname").should("eq", "/cart.html");
    cy.get(".cart_item").should("have.length", items.length);

    const expectedNames = [
      "Sauce Labs Backpack",
      "Sauce Labs Bike Light",
      "Sauce Labs Bolt T-Shirt",
      "Sauce Labs Fleece Jacket",
    ];
    expectedNames.forEach(name => {
      cy.get(".cart_item .inventory_item_name").should("contain", name);
    });
  });
});
