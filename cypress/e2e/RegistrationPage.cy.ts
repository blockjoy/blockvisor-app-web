import { generateUserRegistrationData } from 'cypress/support/utils';

describe('Registration page tests', () => {
  it('Should display validation errors when submiting empty form', () => {
    cy.visit('/register');
    cy.get('[data-cy="register-submit-button"]').click();

    cy.get('[data-cy="input-error-field"]').should('have.length', 5);
  });

  it('Should go to login page when clicked on Login link', () => {
    cy.visit('/register');
    cy.get('[data-cy="register-signin-link"]').click();

    cy.url().should('be.equal', `${Cypress.config('baseUrl')}/login`);
  });

  it('Should go to verify page when registration is successful', () => {
    cy.visit('/register');
    const userData = generateUserRegistrationData();
    cy.get('[data-cy="register-email-input"]').type(userData.email);
    cy.get('[data-cy="register-firstName-input"]').type(userData.firstName);
    cy.get('[data-cy="register-lastName-input"]').type(userData.lastName);
    cy.get('[data-cy="register-password-input"]').type(userData.password);
    cy.get('[data-cy="register-confirmPassword-input"]').type(
      userData.password,
    );

    cy.get('[data-cy="register-submit-button"]').click();

    cy.url().should('be.equal', `${Cypress.config('baseUrl')}/verify`);
  });

  it('Should display an error when the email address is already registered', () => {
    cy.visit('/register');
    const userData = generateUserRegistrationData();
    cy.get('[data-cy="register-email-input"]').type(
      Cypress.env('TEST_USER_EMAIL'),
    );
    cy.get('[data-cy="register-firstName-input"]').type(userData.firstName);
    cy.get('[data-cy="register-lastName-input"]').type(userData.lastName);
    cy.get('[data-cy="register-password-input"]').type(userData.password);
    cy.get('[data-cy="register-confirmPassword-input"]').type(
      userData.password,
    );

    cy.get('[data-cy="register-submit-button"]').click();

    cy.get('[data-cy="register-error-message"]').should('be.visible');
  });
});
