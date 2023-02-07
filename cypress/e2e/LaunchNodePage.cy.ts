import { Authenticate } from 'cypress/support/utils';

describe('Nodes Page tests', () => {
  context('FullHD resolution', () => {
    beforeEach(() => {
      cy.clearLocalStorage();
      cy.viewport(1920, 1080);
    });

    afterEach(() => {
      cy.clearLocalStorage();
    });
    it('Should go to launch-node when clicked on Launch Node', () => {
      Authenticate(
        Cypress.env('TEST_USER_EMAIL'),
        Cypress.env('TEST_USER_PASSWORD'),
      );
      cy.get('[data-cy="nodes-launchNode-button"]').click();

      cy.url().should('be.equal', `${Cypress.config('baseUrl')}/launch-node`);
    });

    it('Should launch a Validator node', () => {
      Authenticate(
        Cypress.env('TEST_USER_EMAIL'),
        Cypress.env('TEST_USER_PASSWORD'),
      );
      cy.get('[data-cy="nodes-launchNode-button"]').click();

      cy.get('[data-cy="nodeLauncher-protocol"]')
        .first()
        .then((item) => {
          return cy
            .wrap(item)
            .get('[data-cy="nodeLauncher-nodeType-button"]')
            .contains('Validator')
            .click({ force: true });
        });

      cy.get('[data-cy="nodeLauncher-launch-button"]').click();
    });
  });
});
