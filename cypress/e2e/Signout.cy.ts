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
      cy.get('[data-cy="profileDropdown-button"]').click();
      cy.get('[data-cy="profileDropdown-signout-button"]').click();

      cy.url().should(
        'be.equal',
        `${Cypress.config('baseUrl')}/login?redirect=%2F`,
      );
    });
  });
});

export {};
