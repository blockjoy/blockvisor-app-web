import { Authenticate } from 'cypress/support/utils';

describe('Login Page', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  });

  it('Should go to launch-node when clicked n Launch Node', () => {
    cy.visit('/login');
    Authenticate('comimet108@tohup.com', 'test1234');
    cy.get('[data-cy="nodes-launchNode-button"]').click();

    cy.url().should('be.equal', `${Cypress.config('baseUrl')}/launch-node`);
  });
});
