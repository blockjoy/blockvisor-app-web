import { generateUserRegistrationData } from 'cypress/support/utils';

describe('Registration page tests', () => {
  it('Sumbmit button should be disabled when form is empty', () => {
    cy.visit('/register');
    cy.get('[data-cy="register-submit-button"]').should('be.disabled');
  });

  it('Should go to login page when clicked on Login link', () => {
    cy.visit('/register');
    cy.get('[data-cy="register-signin-link"]').click();

    cy.url().should('be.equal', `${Cypress.config('baseUrl')}/login`);
  });

  it('Should go to verify page when registration is successful', () => {
    const data = generateUserRegistrationData();
    cy.register({ ...data });

    cy.url().should('be.equal', `${Cypress.config('baseUrl')}/verify`);
  });

  it('Should display an error when the email address is already registered', () => {
    const { firstName, lastName, password } = generateUserRegistrationData();
    cy.register({
      email: Cypress.env('TEST_USER_EMAIL'),
      firstName,
      lastName,
      password,
    });

    cy.get('[data-cy="register-error-message"]').should('be.visible');
  });
});
