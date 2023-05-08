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

      cy.waitForElement('[data-cy="node-details-title"]', 5000);
      cy.get('[data-cy="node-details-title"]').then((element) => {
        const title = element.text();

        cy.deleteNode(title);
        cy.url({ timeout: 15000 }).should(
          'be.equal',
          `${Cypress.config('baseUrl')}/nodes`,
        );

        cy.waitForElement('.Toastify__toast--success', 5000).should(
          'be.visible',
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

      cy.waitForElement('[data-cy="node-details-title"]', 5000);
      cy.get('[data-cy="node-details-title"]').then((element) => {
        const title = element.text();

        cy.deleteNode(title);
        cy.url({ timeout: 15000 }).should(
          'be.equal',
          `${Cypress.config('baseUrl')}/nodes`,
        );

        cy.waitForElement('.Toastify__toast--success', 5000).should(
          'be.visible',
        );
      });
    });
  });

  //Skipped for now because of the its allowed to have more than one validator
  it.skip("If there is an active Helium Validator it shouldn't launch a new Helium Validator and display the error, delete the node after test", () => {
    cy.login(Cypress.env('TEST_USER_EMAIL'), Cypress.env('TEST_USER_PASSWORD'));
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

    cy.waitForElement('[data-cy="node-details-title"]', 5000);

    cy.get('[data-cy="nodes-launchNode-button"]').click();
    cy.waitForElement('[data-cy="nodeLauncher-protocol-Helium"]', 15000);
    cy.get('[data-cy="nodeLauncher-protocol-Helium"]').then((item) => {
      return cy
        .wrap(item)
        .get('[data-cy="nodeLauncher-nodeType-button-Helium-Validator"]')
        .click({ force: true });
    });

    cy.get('[data-cy="nodeLauncher-launch-button"]').click();
    cy.get('[data-cy="nodeLauncher-launch-button"]').should('be.disabled');
    cy.get('[data-cy="nodeLauncherSummary-serverError"]').should('be.visible');

    cy.get('[data-cy="layout-burger-button"]').click();
    cy.get('[data-cy="sidebarMain-node-link"]').click();
    cy.get('[data-cy="layout-burger-button"]').click();
    cy.waitForElement('[data-cy="nodeList-Helium-Validator"]', 2000);

    cy.get('[data-cy="nodeList-Helium-Validator"]').click();
    cy.get('[data-cy="node-details-title"]').then((element) => {
      const title = element.text();

      cy.deleteNode(title);
      cy.url({ timeout: 15000 }).should(
        'be.equal',
        `${Cypress.config('baseUrl')}/nodes`,
      );

      cy.waitForElement('.Toastify__toast--success', 5000).should('be.visible');
    });
  });
});
export {};
