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
      cy.login(
        Cypress.env('TEST_USER_EMAIL'),
        Cypress.env('TEST_USER_PASSWORD'),
      );
      cy.waitForElement('[data-cy="nodes-launchNode-button"]', 15000);
      cy.get('[data-cy="nodes-launchNode-button"]').click();

      cy.url().should('be.equal', `${Cypress.config('baseUrl')}/launch-node`);
    });

    it('Should launch a Helium Validator and redirect to nodes after deleting', () => {
      cy.login(
        Cypress.env('TEST_USER_EMAIL'),
        Cypress.env('TEST_USER_PASSWORD'),
      );
      cy.waitForElement('[data-cy="nodes-launchNode-button"]', 15000);
      cy.get('[data-cy="nodes-launchNode-button"]').click();

      cy.waitForElement('[data-cy="nodeLauncher-protocol-Helium"]', 15000);
      cy.get('[data-cy="nodeLauncher-protocol-Helium"]').then((item) => {
        return cy
          .wrap(item)
          .get('[data-cy="nodeLauncher-nodeType-button-Helium-Validator"]')
          .click({ force: true });
      });

      cy.get('[data-cy="nodeLauncher-launch-button"]').click();

      cy.get('[data-cy="node-details-title"]').then((element) => {
        const title = element.text();

        cy.deleteNode(title);
        cy.url({ timeout: 15000 }).should(
          'be.equal',
          `${Cypress.config('baseUrl')}/nodes`,
        );
      });
    });

    it('Should launch a Algorand Node and redirect to nodes after deleting', () => {
      cy.login(
        Cypress.env('TEST_USER_EMAIL'),
        Cypress.env('TEST_USER_PASSWORD'),
      );
      cy.waitForElement('[data-cy="nodes-launchNode-button"]', 15000);
      cy.get('[data-cy="nodes-launchNode-button"]').click();

      cy.get('[data-cy="nodeLauncher-protocol-Algorand"]').then((item) => {
        return cy
          .wrap(item)
          .get('[data-cy="nodeLauncher-nodeType-button-Algorand-Node"]')
          .click({ force: true });
      });

      cy.get('[data-cy="nodeLauncher-launch-button"]').click();

      cy.get('[data-cy="node-details-title"]').then((element) => {
        const title = element.text();

        cy.deleteNode(title);
        cy.url({ timeout: 15000 }).should(
          'be.equal',
          `${Cypress.config('baseUrl')}/nodes`,
        );
      });
    });
  });
});
export {};
