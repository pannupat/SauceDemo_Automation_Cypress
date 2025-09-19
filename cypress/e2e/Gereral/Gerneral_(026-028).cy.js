it("SD_TC_026 Problem user", () => {
  cy.login("problem_user", "secret_sauce");
  cy.location("pathname").should("eq", "/inventory.html");
  cy.get(".title").should("have.text", "Products");
  cy.get(".inventory_item").should("have.length", 6);
  cy.get(".inventory_item").eq(0).should("contain", "Sauce Labs Backpack");
  cy.get(".inventory_item").eq(1).should("contain", "Sauce Labs Bike Light");
  cy.get(".inventory_item").eq(2).should("contain", "Sauce Labs Bolt T-Shirt");
  cy.get(".inventory_item").eq(3).should("contain", "Sauce Labs Fleece Jacket");
  cy.get(".inventory_item").eq(4).should("contain", "Sauce Labs Onesie");
  cy.get(".inventory_item")
    .eq(5)
    .should("contain", "Test.allTheThings() T-Shirt (Red)");
  cy.get('[data-test="inventory-item-sauce-labs-backpack-img"]');
});

it("SD_TC_028: Add/Remove product from Detail เพิ่ม/ลบสินค้าจากหน้ารายละเอียด", () => {
  cy.login("standard_user", "secret_sauce");

  cy.contains(".inventory_item_name", "Sauce Labs Backpack").click();
  cy.url().should("include", "/inventory-item.html");
  cy.get(".inventory_details_name").should("contain", "Sauce Labs Backpack");

  cy.get('[data-test="add-to-cart"]').click();
  cy.get(".shopping_cart_badge").should("have.text", "1");

  cy.get('[data-test="remove"]').click();
  cy.get(".cart_item").should("have.length", 0);

  cy.get('[data-test="back-to-products"]').click();
  cy.url().should("include", "/inventory.html");
  cy.get(".inventory_item").should("have.length", 6);
  cy.get(".cart_item").should("have.length", 0);

  
});
