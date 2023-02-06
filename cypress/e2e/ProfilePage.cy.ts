import {
  Authenticate,
  generateUserRegistrationData,
} from 'cypress/support/utils';

describe('Profile page', () => {
  context('FullHD resolution', () => {
    beforeEach(() => {
      cy.clearLocalStorage();
      cy.viewport(1920, 1080);
    });

    it('Should go to Personal tab', () => {
      Authenticate(
        Cypress.env('TEST_USER_EMAIL'),
        Cypress.env('TEST_USER_PASSWORD'),
      );
      cy.get('[data-cy="profileDropdown-button"]').click();
      cy.get('[data-cy="profileDropdown-profile-button"]').click();

      cy.url().should('be.equal', `${Cypress.config('baseUrl')}/profile?tab=1`);
    });

    it('Should go to the Account tab', () => {
      Authenticate(
        Cypress.env('TEST_USER_EMAIL'),
        Cypress.env('TEST_USER_PASSWORD'),
      );
      cy.get('[data-cy="profileDropdown-button"]').click();
      cy.get('[data-cy="profileDropdown-profile-button"]').click();

      cy.get('[data-cy="profile-account-tab"]').click();
      cy.url().should('be.equal', `${Cypress.config('baseUrl')}/profile?tab=2`);
    });

    it('Should update first name and last name in the Personal tab', () => {
      const { firstName, lastName } = generateUserRegistrationData();
      Authenticate(
        Cypress.env('TEST_USER_EMAIL'),
        Cypress.env('TEST_USER_PASSWORD'),
      );
      cy.get('[data-cy="profileDropdown-button"]').click();
      cy.get('[data-cy="profileDropdown-profile-button"]').click();

      cy.get('[data-cy="profile-firstName-input"]').clear().type(firstName);
      cy.get('[data-cy="profile-lastName-input"]').clear().type(lastName);
      cy.get('[data-cy="profile-submit-button"]').click();

      cy.get('[data-cy="profile-firstName-input"]').should(
        'have.value',
        firstName,
      );
      cy.get('[data-cy="profile-lastName-input"]').should(
        'have.value',
        lastName,
      );
    });

    it('Should signout when clicked on the Danger zone signout button', () => {
      Authenticate(
        Cypress.env('TEST_USER_EMAIL'),
        Cypress.env('TEST_USER_PASSWORD'),
      );
      cy.get('[data-cy="profileDropdown-button"]').click();
      cy.get('[data-cy="profileDropdown-profile-button"]').click();
      cy.get('[data-cy="profile-account-tab"]').click();
      cy.get('[data-cy="profile-signout-button"]').click();
      cy.url().should(
        'be.equal',
        `${Cypress.config('baseUrl')}/login?redirect=%2F`,
      );
    });
  });
});
