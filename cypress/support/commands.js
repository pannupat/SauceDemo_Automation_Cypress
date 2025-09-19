Cypress.Commands.add('login', (username, password) => {
  cy.visit('/')
  if (username){
    cy.get('[data-test="username"]').type(username)
  }else{
    cy.get('[data-test="username"]').clear()
  }
  if (password){
    cy.get('[data-test="password"]').type(password, { log: false })
  }else{
    cy.get('[data-test="password"]').clear()
  }
  cy.get('[data-test="login-button"]').click()
})

function addItemAndGoToCheckout() {
  cy.visit('/inventory.html')
  cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
  cy.get('.shopping_cart_link').click()
  cy.location('pathname').should('include','cart.html')
  cy.get('[data-test="checkout"]').click()
  cy.location('pathname').should('include','checkout-step-one.html')
}

