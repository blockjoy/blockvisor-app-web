describe('Signout Action', () => {
  context('FullHD resolution', () => {
    beforeEach(() => {
      cy.clearLocalStorage();
      cy.viewport(1920, 1080);
    });

    it('Should signout and return to login page', () => {
      cy.login(
        Cypress.env('TEST_USER_EMAIL'),
        Cypress.env('TEST_USER_PASSWORD'),
      );

      cy.waitForElement('[data-cy="profileDropdown-button"]', 15000);
      cy.get('[data-cy="profileDropdown-button"]').click();
      cy.get('[data-cy="profileDropdown-signout-button"]').click();

      cy.wait(2000)
        .url()
        .should('be.equal', `${Cypress.config('baseUrl')}/login`);
    });
  });
});

export {};
