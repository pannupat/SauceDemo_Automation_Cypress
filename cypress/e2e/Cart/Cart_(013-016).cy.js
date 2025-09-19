describe("Inventory Test All", () => {
  beforeEach(() => {
    cy.login("standard_user", "secret_sauce");
    //assert path/title
    cy.location("pathname").should("include", "inventory.html");
    cy.get(".title").should("have.text", "Products");
  });
  it("SD_TC_013 Add to cart", () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get(".shopping_cart_badge").should("have.text", "1");

    cy.get(".shopping_cart_link").click();
    cy.location("pathname").should("include", "cart.html");
    cy.get(".cart_item").should("have.length", 1);
    cy.get(".inventory_item_name").should("contain", "Sauce Labs Backpack");
  });

  it("SD_TC_014 Add more Product to cart", () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();

    cy.get(".shopping_cart_badge").should("have.text", "4");
  });

  it("SD_TC_015 Delete Product in cart", () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get(".shopping_cart_badge").should("have.text", "1");

    cy.get(".shopping_cart_link").click();
    cy.location("pathname").should("include", "cart.html");
    cy.get(".cart_item").should("have.length", 1);
    cy.get(".inventory_item_name").should("contain", "Sauce Labs Backpack");
    cy.get('[data-test="remove-sauce-labs-backpack"]').click();
    cy.get(".cart_item").should("have.length", 0);

    cy.get('[data-test="continue-shopping"]').click();
    cy.location("pathname").should("include", "inventory.html");
    cy.get(".title").should("have.text", "Products");
    cy.get(".inventory_item").should("have.length", 6);
  });

  it("SD_TC_016 Add more Product to cart and refresh to check product in cart", () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();
    cy.reload();
    //assert ยังมีสินค้าในตะกร้าตามที่เพิ่ม
    cy.get(".shopping_cart_badge").should("have.text", "4");
    // assertเปิดหน้าตะกร้าเพื่อเช็คว่ามีสินค้าตรงตามที่เพิ่มไหม
    cy.get(".shopping_cart_link").click();
    cy.location("pathname").should("include", "cart.html");
    cy.get(".cart_item").should("have.length", 4);
    cy.get(".inventory_item_name").should("contain", "Sauce Labs Backpack");
    cy.get(".inventory_item_name").should("contain", "Sauce Labs Bike Light");
    cy.get(".inventory_item_name").should("contain", "Sauce Labs Bolt T-Shirt");
    cy.get(".inventory_item_name").should(
      "contain",
      "Sauce Labs Fleece Jacket"
    );
  });
});
