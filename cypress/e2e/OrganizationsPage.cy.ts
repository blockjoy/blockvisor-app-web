import { Authenticate, generateOrganizationName } from 'cypress/support/utils';

describe('Organizations page tests', () => {
  context('FullHD resolution', () => {
    beforeEach(() => {
      cy.clearLocalStorage();
      cy.viewport(1920, 1080);
    });

    afterEach(() => {
      cy.clearLocalStorage();
    });

    it('Should go to organizations page when clicked on the main sidebar link', () => {
      Authenticate(
        Cypress.env('TEST_USER_EMAIL'),
        Cypress.env('TEST_USER_PASSWORD'),
      );
      cy.get('[data-cy="sidebarMain-organizations-link"]').click();

      cy.url().should('be.equal', `${Cypress.config('baseUrl')}/organizations`);
    });

    it('Should open a drawer when clicked on create new organization', () => {
      Authenticate(
        Cypress.env('TEST_USER_EMAIL'),
        Cypress.env('TEST_USER_PASSWORD'),
      );
      cy.get('[data-cy="sidebarMain-organizations-link"]').click();
      cy.get('[data-cy="organizations-create-button"]').click();

      cy.get('[data-cy="organizations-add-drawer"]').should('be.visible');
    });

    it('Should display an error when creating organization without a name', () => {
      Authenticate(
        Cypress.env('TEST_USER_EMAIL'),
        Cypress.env('TEST_USER_PASSWORD'),
      );
      cy.get('[data-cy="sidebarMain-organizations-link"]').click();
      cy.get('[data-cy="organizations-create-button"]').click();
      cy.get('[data-cy="organization-drawer-submit-button"]').click();

      cy.get('[data-cy="input-error-field"]').should('be.visible');
    });

    it('Should redirect to created organization page', () => {
      Authenticate(
        Cypress.env('TEST_USER_EMAIL'),
        Cypress.env('TEST_USER_PASSWORD'),
      );
      cy.get('[data-cy="sidebarMain-organizations-link"]').click();
      cy.get('[data-cy="organizations-create-button"]').click();
      const org = generateOrganizationName();
      cy.get('[data-cy="organization-drawer-add-input"]').type(org);
      cy.get('[data-cy="organization-drawer-submit-button"]').click();

      cy.get('[data-cy="organization-title-input"]').should('have.value', org);
    });

    it('Should display a toast success message when the organization is renamed successfully', () => {
      Authenticate(
        Cypress.env('TEST_USER_EMAIL'),
        Cypress.env('TEST_USER_PASSWORD'),
      );
      cy.get('[data-cy="sidebarMain-organizations-link"]').click();
      cy.get('[data-cy="organizations-create-button"]').click();
      const org = generateOrganizationName();
      cy.get('[data-cy="organization-drawer-add-input"]').type(org);
      cy.get('[data-cy="organization-drawer-submit-button"]').click();

      cy.get('[data-cy="organization-edit-title"]').click();
      cy.get('[data-cy="organization-title-input"]').type('e2e org');
      cy.get('[data-cy="organization-save-title"]').click();

      cy.get('.Toastify__toast--success').should('be.visible');
    });
  });
});
