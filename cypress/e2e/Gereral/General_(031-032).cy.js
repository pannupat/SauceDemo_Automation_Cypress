describe("GENERAL: Menu links + Reset App State (SD_TC_031 - SD_TC_032)", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login("standard_user", "secret_sauce");
    cy.url().should("include", "/inventory.html");
    cy.get(".title").should("have.text", "Products");
  });

  it("SD_TC_031: เปิดลิงก์ About/All Items ในเมนู", () => {
  const runCIFlow = Cypress.env("CI_MODE") || Cypress.browser.isHeadless;

  cy.get("#react-burger-menu-btn").click();

  if (runCIFlow) {
    cy.get("#about_sidebar_link")
      .should("be.visible")
      .should("have.attr", "href")
      .then((href) => {
        expect(href).to.match(/^https?:\/\//);
        expect(href).to.match(/saucelabs\.com/i);
        cy.request({ url: href, method: "HEAD", followRedirect: true })
          .its("status")
          .should("be.oneOf", [200, 301, 302]);
      });
  } else {
    Cypress.once("uncaught:exception", (err) => {
      if (/postMessage/i.test(err.message)) return false;
    });

    cy.get("#about_sidebar_link")
      .should("have.attr", "href")
      .and("match", /^https?:\/\//);

    cy.get("#about_sidebar_link").invoke("removeAttr", "target").click();
    cy.title().should("not.be.empty"); 
    cy.go("back");
    cy.url().should("include", "/inventory.html");
  }

  
  cy.get("#react-burger-menu-btn").click();
  cy.get("#inventory_sidebar_link").should("be.visible").click();
  cy.url().should("include", "/inventory.html");
  cy.get(".title").should("have.text", "Products");

  cy.get("#inventory_sidebar_link").should("be.visible").click();
  cy.url().should("include", "/inventory.html");
  cy.get(".title").should("have.text", "Products");
});

  it("SD_TC_032: Reset App State", () => {
    const items = [
      "sauce-labs-backpack",
      "sauce-labs-bike-light",
      "sauce-labs-bolt-t-shirt",
      "sauce-labs-fleece-jacket",
    ];
    items.forEach((id) => {
      cy.get(`[data-test="add-to-cart-${id}"]`).click();
    });
    cy.get(".shopping_cart_badge").should("have.text", String(items.length));

    cy.get("#react-burger-menu-btn").click();
    cy.get("#reset_sidebar_link").click();
    cy.url().should("include", "/inventory.html");
    cy.get(".title").should("have.text", "Products");
    cy.get(".shopping_cart_badge").should("not.exist");

    cy.get('[data-test="shopping-cart-link"]').click();
    cy.url().should("include", "/cart.html");
    cy.get(".cart_item").should("have.length", 0);

    cy.get('[data-test="continue-shopping"]').click();
    cy.url().should("include", "/inventory.html");
    cy.get(".title").should("have.text", "Products");

    items.forEach((id) => {
      cy.get(`[data-test="add-to-cart-${id}"]`).should("be.visible");
    });
  });
});
