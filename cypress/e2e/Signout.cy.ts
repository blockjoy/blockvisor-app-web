import { Authenticate } from 'cypress/support/utils';

describe('Signout Action', () => {
  context('FullHD resolution', () => {
    beforeEach(() => {
      cy.clearLocalStorage();
      cy.viewport(1920, 1080);
    });

    it('Should signout and return to login page', () => {
      Authenticate(
        Cypress.env('TEST_USER_EMAIL'),
        Cypress.env('TEST_USER_PASSWORD'),
      );
      cy.get('[data-cy="sidebarMain-signout-button"]').click();

      cy.url().should('be.equal', `${Cypress.config('baseUrl')}/login`);
    });
  });
});
