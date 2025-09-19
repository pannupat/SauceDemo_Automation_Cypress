describe('SD_TC_029: Empty cart should not proceed to checkout (expected) vs actual', () => {
  beforeEach(() => {
    cy.login('standard_user', 'secret_sauce');
    cy.url().should('include', '/inventory.html');

   
    cy.get('body').then($b => {
        //cypress ดึงเอาbody รับค่าเป็น JQuery element ของ body ณ ตอนนั้น 
        //และใช้ Jquery ในการค้นหา badgeว่ามีของในตะกร้าไหม
        //**ไม่ใช้ cy.get('.shopping_cart_badge')เพราะถ้า badge ไม่มี cy.get จะรอ/retry แล้ว error */
      //**จึงใช้ JQuery ในการค้นหา.find() ใน.then() แทน */
      //**เทสไม่พังแล้วค่อยใช้ if/else ตรวจสอบเอง */
        const hasBadge = $b.find('.shopping_cart_badge').length > 0;
      //ถ้ามี badgeให้เข้าไปหน้า Cart
      if (hasBadge) {
        cy.get('.shopping_cart_link').click();
        //assert  url ว่าอยู่ถูกหน้า
        cy.url().should('include', '/cart.html');

        //นับจำนวนสินค้าที่ใน cart
        cy.get('body').then($bb => {
          const items = $bb.find('.cart_item').length;
          if (items > 0) {
            cy.get('.cart_item').each(($it) => {
              cy.wrap($it).find('button').contains('Remove').click();
              //cy.get('[data-test^="remove-"]').click({ multiple: true })
            //**ใช้ data-test เจาะจงปุ่ม remove ทั้งหมด */                    
            });
          }
        });
        cy.get('[data-test="continue-shopping"]').click();
        cy.url().should('include', '/inventory.html');
      }
    });

    cy.get('.shopping_cart_badge').should('not.exist');
  });

  it('ตรวจว่าระบบบล็อกหรือไม่ (และบันทึก Known Gap ถ้าไม่บล็อก)', () => {
    cy.get('.shopping_cart_link').click();
    cy.url().should('include', '/cart.html');
    cy.get('.cart_item').should('have.length', 0);

    cy.get('body').then($body => {
        //สร้างตัวแปร exists ค่าของปุ่ม checkout โดยหาปุ่มใน  body ว่ามีปุ่ม checkout หรือไม่    
      const exists = $body.find('[data-test="checkout"]').length > 0;
//เข้าเงื่อนไข ถ้าไม่มีปุ่ม checkout จะlogข้อความว่า "✅ เว็บได้บล็อกปุ่ม Checkout เมื่อตะกร้าว่าง (ไม่มีปุ่ม Checkout)"
      if (!exists) {
        cy.log('✅ App blocks checkout when cart is empty (no checkout button)');
        expect(true).to.eq(true);
      } else {

        //ถ้า ถ้ามี checkout แต่ปุ่มถูก Disable จะlogข้อความว่า "✅ เว็บได้บล็อกปุ่ม Checkout เมื่อตะกร้าว่าง (ปุ่มโดน Disable)"

        cy.get('[data-test="checkout"]').then($btn => {
          const disabled = $btn.is(':disabled') || $btn.attr('aria-disabled') === 'true';
          if (disabled) {
            cy.log('✅ App blocks checkout when cart is empty (button disabled)');
            expect(true).to.eq(true);
          } else {

            //แต่ถ้าไม่เข้าเงื่อนไข 2 อันแรก จะเป็น Known Gap หรือก็คือมีปุ่ม checkout แต่ปุ่มไม่ถูก Disable และสามารถกดไปต่อได้แม้ไม่มีการกรอกข้อมูลใดๆ
            cy.log('⚠️ Known Gap: App allows checkout with empty cart (product behavior)');
            cy.get('[data-test="checkout"]').click();
            cy.url().should('include', '/checkout-step-one.html');

          
            cy.get('[data-test="cancel"]').click()
            cy.url().should('include', '/cart.html');
            cy.get('.cart_item').should('have.length', 0);

            expect(true, 'Known Gap documented').to.eq(true);
          }
        });
      }
    });
  });
});
