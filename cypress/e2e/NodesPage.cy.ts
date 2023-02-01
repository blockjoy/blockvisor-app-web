import { Authenticate } from 'cypress/support/utils';

describe('Nodes Page tests', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  });

  it('Should go to launch-node when clicked on Launch Node', () => {
    cy.visit('/login');
    Authenticate(
      Cypress.env('TEST_USER_EMAIL'),
      Cypress.env('TEST_USER_PASSWORD'),
    );
    cy.get('[data-cy="nodes-launchNode-button"]').click();

    cy.url().should('be.equal', `${Cypress.config('baseUrl')}/launch-node`);
  });
});
