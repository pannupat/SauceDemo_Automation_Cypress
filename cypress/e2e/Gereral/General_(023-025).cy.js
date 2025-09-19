const addItemByName = (name) => {
  cy.contains('.inventory_item', name)
    .within(() => { cy.contains('button', 'Add to cart').click(); });
};

const proceedToCheckoutStepTwo = (first='John', last='Doe', postal='10110') => {
  cy.get('.shopping_cart_link').click();
  cy.url().should('include', '/cart.html');
  cy.get('[data-test="checkout"]').click();
  cy.url().should('include', '/checkout-step-one.html');

  cy.get('[data-test="firstName"]').type(first);
  cy.get('[data-test="lastName"]').type(last);
  cy.get('[data-test="postalCode"]').type(postal);
  cy.get('[data-test="continue"]').click();
  cy.url().should('include', '/checkout-step-two.html');
  cy.get('.title').should('have.text', 'Checkout: Overview');
};

describe('GENERAL Module (SD_TC_023 - SD_TC_025)', () => {
  beforeEach(() => {
    cy.login('standard_user', 'secret_sauce');
    cy.url().should('include', '/inventory.html');

    addItemByName('Sauce Labs Backpack');
    cy.get('.shopping_cart_badge').should('have.text', '1');
  });

  it('SD_TC_023: Finish Order สำเร็จ', () => {
    proceedToCheckoutStepTwo();
    cy.get('[data-test="finish"]').click();

    cy.url().should('include', '/checkout-complete.html');
    cy.get('.title').should('have.text', 'Checkout: Complete!');
    cy.contains('Thank you for your order!').should('be.visible');
  });

  it('SD_TC_024: Cancel ใน Step Two ย้อนกลับไปแก้ไข', () => {
    proceedToCheckoutStepTwo();
    cy.get('[data-test="cancel"]').click();


    cy.url().should('include', '/inventory.html');
    cy.get('.title').should('have.text', 'Products');
  });

  it('SD_TC_025: Back Home หลังสั่งซื้อเสร็จ', () => {
    proceedToCheckoutStepTwo();
    cy.get('[data-test="finish"]').click();
    cy.url().should('include', '/checkout-complete.html');

    cy.get('[data-test="back-to-products"]').click();

    cy.url().should('include', '/inventory.html');
    cy.get('.title').should('have.text', 'Products');
  });


 
  
  });
