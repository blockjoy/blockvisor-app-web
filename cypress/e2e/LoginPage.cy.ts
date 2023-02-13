describe('Login Page tests', () => {
  beforeEach(() => cy.clearLocalStorage());
  afterEach(() => cy.clearLocalStorage());

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
    cy.login('test@test.com', '1234');
    cy.get('[data-cy="input-error-field"]').should('exist');
  });

  it('Shows error message when the credentials are invalid', () => {
    cy.login('someone@somewhere.com', 'test123456');
    cy.get('[data-cy="login-error-field"]').should('exist');
  });

  it('Redirects to nodes route when authentication is successfull', () => {
    cy.login(Cypress.env('TEST_USER_EMAIL'), Cypress.env('TEST_USER_PASSWORD'));

    cy.url({ timeout: 15000 }).should(
      'be.equal',
      `${Cypress.config('baseUrl')}/nodes`,
    );
  });
});

export {};
