describe('Forgot Password tests', () => {
  it('Submit button should be disabled when the field is empty', () => {
    cy.visit('/forgot-password');

    cy.get('[data-cy="forgot-password-submit"]').should('be.disabled');
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
