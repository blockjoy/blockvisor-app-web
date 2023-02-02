describe('Forgot Password tests', () => {
  it('Should show validation error when submiting without an email', () => {
    cy.visit('/forgot-password');

    cy.get('[data-cy="forgot-password-submit"]').click();

    cy.get('[data-cy="input-error-field"]').should('exist');
  });

  it('Should show toast when email is sent', () => {
    cy.visit('/forgot-password');
    cy.get('[data-cy="forgot-password-email-input"]').type('test@test.com');

    cy.get('[data-cy="forgot-password-submit"]').click();

    cy.get('.Toastify__toast--success').should('be.visible');
  });

  it('Should return to login page when cancel button is pressed', () => {
    cy.visit('/forgot-password');
    cy.get('[data-cy="forgot-password-cancel"]').click();

    cy.url().should('be.equal', `${Cypress.config('baseUrl')}/login`);
  });
});

export {};
