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

    it('Should launch a Helium Validator', () => {
      cy.login(
        Cypress.env('TEST_USER_EMAIL'),
        Cypress.env('TEST_USER_PASSWORD'),
      );
      cy.waitForElement('[data-cy="nodes-launchNode-button"]', 15000);
      cy.get('[data-cy="nodes-launchNode-button"]').click();

      cy.get('[data-cy="nodeLauncher-protocol-Helium"]').then((item) => {
        return cy
          .wrap(item)
          .get('[data-cy="nodeLauncher-nodeType-button-Helium-Validator"]')
          .click({ force: true });
      });

      cy.get('[data-cy="nodeLauncher-launch-button"]').click();
    });

    it('Should redirect to nodes after deleting Helium Validator', () => {
      cy.login(
        Cypress.env('TEST_USER_EMAIL'),
        Cypress.env('TEST_USER_PASSWORD'),
      );

      cy.waitForElement('[data-cy="nodeList-Helium-Validator"]', 20000);
      cy.get('[data-cy="nodeList-Helium-Validator"]').click();

      cy.get('[data-cy="node-details-title"]').then((element) => {
        const title = element.text();

        cy.deleteNode(title);
        cy.url({ timeout: 15000 }).should(
          'be.equal',
          `${Cypress.config('baseUrl')}/nodes`,
        );
      });
    });

    it('Should launch a Algorand Node', () => {
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
    });

    it('Should redirect to nodes after deleting a Algorand Node', () => {
      cy.login(
        Cypress.env('TEST_USER_EMAIL'),
        Cypress.env('TEST_USER_PASSWORD'),
      );

      cy.waitForElement('[data-cy="nodeList-Algorand-Node"]', 15000);
      cy.get('[data-cy="nodeList-Algorand-Node"]').click();

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
