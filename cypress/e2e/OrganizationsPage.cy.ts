import {
  Authenticate,
  createOrganization,
  generateOrganizationName,
} from 'cypress/support/utils';

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
      const org = generateOrganizationName();
      createOrganization(org);

      cy.get('[data-cy="organization-title-input"]').should('have.value', org);
    });

    it('Should display a toast success message when the organization is renamed successfully', () => {
      createOrganization(generateOrganizationName());

      cy.get('[data-cy="organization-edit-title"]').click();
      cy.get('[data-cy="organization-title-input"]').clear().type('e2e org');
      cy.get('[data-cy="organization-save-title"]').click();

      cy.get('.Toastify__toast--success').should('be.visible');
    });

    it('Should display a toast success message when a member has been invited', () => {
      createOrganization(generateOrganizationName());

      cy.get('[data-cy="organization-member-add-button"]').click();
      cy.get('[data-cy="organization-member-invite-input"]').type(
        'random@test.com',
      );
      cy.get('[data-cy="organization-member-invite-button"]').click();

      cy.get('.Toastify__toast--success').should('be.visible');
    });

    it('Should display invited member on the list', () => {
      const testUserEmail = 'random@test.com';
      createOrganization(generateOrganizationName());

      cy.get('[data-cy="organization-member-add-button"]').click();
      cy.get('[data-cy="organization-member-invite-input"]').type(
        testUserEmail,
      );
      cy.get('[data-cy="organization-member-invite-button"]').click();

      cy.get('table').contains('td', testUserEmail);
    });

    it('Should display an input for entering organization name when deleting organization', () => {
      createOrganization(generateOrganizationName());
      cy.get('[data-cy="organization-delete-button"]').click();
      cy.get('[data-cy="organization-delete-confirm-input"]').should(
        'be.visible',
      );
    });

    it('Should redirect to organizations when organization is deleted', () => {
      const org = generateOrganizationName();
      createOrganization(org);
      cy.get('[data-cy="organization-delete-button"]').click();
      cy.get('[data-cy="organization-delete-confirm-input"]').type(org);
      cy.get('[data-cy="organization-delete-submit"]').click();

      cy.url().should('be.equal', `${Cypress.config('baseUrl')}/organizations`);
    });
  });
});
