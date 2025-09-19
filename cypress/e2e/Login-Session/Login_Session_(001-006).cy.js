describe("All TestCase Login ", () => {
  beforeEach(() => {
    cy.visit("https://www.saucedemo.com/");
  });

  it("SD_TC_001 Login with valid username and password", () => {
    cy.login("standard_user", "secret_sauce"); //จากcommands.js สร้างคำสั่งสำหรับล็อกอินเพื่อลดโค้ด และสามารถแก้ไขได้ง่ายในไฟล์ commands.js

    // asserts ตรวจสอบการล็อกอินว่าสําเร็จจริงมั้ย
    cy.location("pathname").should("eq", "/inventory.html");
    cy.get(".title").should("have.text", "Products");
  });

  it("SD_TC_002 Wrong password", () => {
    cy.login("standard_user", "baby888");
    cy.get(".error-message-container h3")
      .should("be.visible")
      .and("contain", "Epic sadface", "something went wrong");
  });

  it("SD_TC_003 Locked out user", () => {
    cy.login("locked_out_user", "secret_sauce");
    cy.get(".error-message-container h3")
      .should("be.visible")
      .and("contain", "Epic sadface", "locked out");
  });

  

  it("SD_TC_004 Empty password", () => {
    cy.login("", "secret_sauce");
    cy.get(".error-message-container h3")
      .should("be.visible")
      .and("contain", "Epic sadface", "Password is required");
  });

  //กรณีไม่ใช้ commands.js ใช้ .type() และ .clear() ได้เลย
  // it('Empty password', () => {
  //   cy.get('[data-test="username"]').type('standard_user')
  //   cy.get('[data-test="password"]').clear()
  //   cy.get('[data-test="login-button"]').click()
  //   cy.get('.error-message-container h3').should('be.visible')
  //   .and('contain', 'Epic sadface','Password is required')
  // })

    it("SD_TC_005 Empty password", () => {
    cy.login("standard_user", "");
    cy.get(".error-message-container h3")
      .should("be.visible")
      .and("contain", "Epic sadface", "Password is required");
  });

  it("SD_TC_006 Logout", () => {
    cy.login("standard_user", "secret_sauce");
    cy.get("#react-burger-menu-btn").click();
    cy.get('[data-test="logout-sidebar-link"]').click();

    cy.location("pathname").should("eq", "/");
    cy.get('[data-test="username"]')
      .should("be.visible")      
    cy.get('[data-test="password"]')
      .should("be.visible")
    cy.get('[data-test="login-button"]').should("be.visible");
  });


});
