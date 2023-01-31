import { Authenticate } from 'cypress/support/utils';

describe('Signout Action', () => {
  context('FullHD resolution', () => {
    beforeEach(() => {
      cy.clearLocalStorage();
      cy.viewport(1920, 1080);
    });

    it('Should signout and return to login page', () => {
      cy.visit('/login');
      Authenticate('comimet108@tohup.com', 'test1234');
      cy.get('[data-cy="sidebarMain-signout-button"]').click();

      cy.url().should('be.equal', `${Cypress.config('baseUrl')}/login`);
    });
  });
});
