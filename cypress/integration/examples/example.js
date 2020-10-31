describe('Sample test', () => {
  it('Doesn\'t do much', () => {
    cy.visit('http://facebook.com');
    cy.get('#email')
      .type('lequangnhat2000@gmail.com')
      .get('#pass')
      .type('lmao');
    cy.get('#u_0_b')
      .click();
  })
})
