describe('Login Page', () => {
  beforeEach(() => cy.clearLocalStorage());

  it('Goes to register page when the user click on Create Account', () => {
    cy.visit('/login');
    cy.get('[data-cy="login-create-account-link"]').click();

    cy.url().should('be.equal', `${Cypress.config('baseUrl')}/register`);
  });

  it('Goes to forgot password page when the user click on Forgot Password', () => {
    cy.visit('/login');
    cy.get('[data-cy="login-forgot-password-link"]').click();

    cy.url().should('be.equal', `${Cypress.config('baseUrl')}/forgot-password`);
  });

  it('Shows password validation error when password is too short', () => {
    cy.visit('/login');
    cy.get('[data-cy="login-email-input"]').type('test@test.com');
    cy.get('[data-cy="login-password-input"]').type('1234');
    cy.get('[data-cy="login-submit-button"]').click();
    cy.get('[data-cy="input-error-field"]').should('exist');
  });

  it('Shows error message when the credentials are invalid', () => {
    cy.visit('/login');
    cy.get('[data-cy="login-email-input"]').type('someone@somewhere.com');
    cy.get('[data-cy="login-password-input"]').type('test123456');
    cy.get('[data-cy="login-submit-button"]').click();
    cy.get('[data-cy="login-error-field"]').should('exist');
  });

  it('Redirects to nodes route when authentication is successfull', () => {
    cy.visit('/login');
    cy.get('[data-cy="login-email-input"]').type('comimet108@tohup.com');
    cy.get('[data-cy="login-password-input"]').type('test1234');
    cy.get('[data-cy="login-submit-button"]').click();

    cy.url().should('be.equal', `${Cypress.config('baseUrl')}/nodes`);
  });
});

export {};
