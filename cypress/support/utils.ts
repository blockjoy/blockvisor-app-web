import { faker } from '@faker-js/faker/locale/en_US';

export function Authenticate(email: string, password: string) {
  cy.visit('/login');
  cy.get('[data-cy="login-email-input"]').type(email);
  cy.get('[data-cy="login-password-input"]').type(password);
  cy.get('[data-cy="login-submit-button"]').click();
}

export function createOrganization(orgName: string) {
  Authenticate(
    Cypress.env('TEST_USER_EMAIL'),
    Cypress.env('TEST_USER_PASSWORD'),
  );
  cy.get('[data-cy="sidebarMain-organizations-link"]').click();
  cy.get('[data-cy="organizations-create-button"]').click();
  cy.get('[data-cy="organization-drawer-add-input"]').type(orgName);
  cy.get('[data-cy="organization-drawer-submit-button"]').click();
}

export function generateOrganizationName() {
  return faker.company.name();
}

export function generateUserRegistrationData() {
  return {
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    password: faker.internet.password(),
  };
}
