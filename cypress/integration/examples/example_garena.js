function garenaTesting(username, password, email, retype_password = password, location = VN, is_agree_eula) {
  const url = 'https://sso.garena.com/ui/register?locale=vi';
  it('Do something', () => {
    cy.visit(url);
    cy.get('#sso_register_form_account')
      .type(username);
    cy.get('#sso_register_form_password')
      .type(password)
      .get('#msg')
      .should('not.exist');
    cy.get('#sso_register_form_password_confirm')
      .type(retype_password);
    cy.get('#sso_register_form_email')
      .type('s')
      .get('#msg')
      .should('not.exist');
    cy.get('#sso_register_form_email')
      .type(email)
      .get('#msg')
      .should('not.exist');
    cy.get('#sso_register_form_select_country')
      .select(location);
    if (is_agree_eula) {
      cy.get('#line-terms > a')
        .click()
    } else {
      cy.get('#confirm-btn')
        .click();
    }
    cy.get('#msg')
      .should('not.exist');
  })
}

describe('Garena Sign-up Testing', () => garenaTesting(
  'olereqewq',
  'samplePassd12!',
  'lmaoowepw@gmail.com',
  undefined,
  'VN',
  false
));
