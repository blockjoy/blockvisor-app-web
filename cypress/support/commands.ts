/// <reference types="cypress" />

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//

type RegistrationInput = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};
declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>;
      register({
        firstName,
        lastName,
        password,
        email,
      }: RegistrationInput): Chainable<void>;
      createOrganization(orgName: string): Chainable<void>;
      deleteOrganization(orgName: string): Chainable<void>;
      waitForElement(selector: string, timeout: number): Chainable<void>;
    }
  }
}

Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('/login');
  cy.get('[data-cy="login-email-input"]').type(email);
  cy.get('[data-cy="login-password-input"]').type(password);
  cy.get('[data-cy="login-submit-button"]').click();
});

Cypress.Commands.add(
  'register',
  ({ firstName, lastName, password, email }: RegistrationInput) => {
    cy.visit('/register');
    cy.get('[data-cy="register-email-input"]').type(email);
    cy.get('[data-cy="register-firstName-input"]').type(firstName);
    cy.get('[data-cy="register-lastName-input"]').type(lastName);
    cy.get('[data-cy="register-password-input"]').type(password);
    cy.get('[data-cy="register-confirmPassword-input"]').type(password);

    cy.get('[data-cy="register-submit-button"]').click();
  },
);

Cypress.Commands.add('createOrganization', (orgName: string) => {
  cy.waitForElement('[data-cy="sidebarMain-organizations-link"]', 15000);
  cy.get('[data-cy="sidebarMain-organizations-link"]').click();
  cy.get('[data-cy="organizations-create-button"]').click();
  cy.get('[data-cy="organization-drawer-add-input"]').type(orgName);
  cy.get('[data-cy="organization-drawer-submit-button"]').click();
});

Cypress.Commands.add('deleteOrganization', (orgName: string) => {
  cy.get('[data-cy="organization-delete-button"]').click();
  cy.get('[data-cy="organization-delete-confirm-input"]').type(orgName);
  cy.get('[data-cy="organization-delete-submit"]').click();
});

Cypress.Commands.add('waitForElement', (selector: string, timeout: number) => {
  cy.get(selector, { timeout });
});
export {};
