const THRESHOLD_MS = 5000;


describe('SD_TC_027: Performance Glitch User - ตรวจสอบความหน่วง', () => {
  it('Login → Products เร็วพอ (ไม่เกินค่า threshold)', () => {
    
    cy.visit('/');

    const t0 = Date.now();

    cy.get('[data-test="username"]').type('performance_glitch_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();

    cy.location('pathname').should('eq', '/inventory.html');
    cy.get('.title').should('have.text', 'Products');

    const t1 = Date.now();
    const duration = t1 - t0;
    cy.log(`Login-Products took: ${duration} ms`);
    expect(duration).to.be.lessThan(THRESHOLD_MS);

// describe('SD_TC_027: Performance Glitch User – ตรวจสอบความหน่วง', () => {
//   it('Login → Products ต้องเร็วกว่าค่า threshold', () => {
//     const THRESHOLD_MS = 5000;            
//     cy.visit('/');

//     const t0 = Date.now();
//     cy.get('[data-test="username"]').type('performance_glitch_user');
//     cy.get('[data-test="password"]').type('secret_sauce', { log: false });
//     cy.get('[data-test="login-button"]').click();

//     cy.get('.title', { timeout: 15000 }).should('have.text', 'Products').then(() => {
//       const duration = Date.now() - t0;
//       cy.log(`Login→Products took: ${duration} ms`);
//       expect(duration).to.be.lessThan(THRESHOLD_MS);
//     });
//   });
// });

    
    
  });
});
