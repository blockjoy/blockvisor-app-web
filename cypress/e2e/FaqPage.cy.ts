describe('FAQ Page tests', () => {
  context('FullHD resolution', () => {
    beforeEach(() => {
      cy.clearLocalStorage();
      cy.viewport(1920, 1080);
    });
    it('Should go to FAQ when clicked on FAQ link', () => {
      cy.login(
        Cypress.env('TEST_USER_EMAIL'),
        Cypress.env('TEST_USER_PASSWORD'),
      );
      cy.get('[data-cy="sidebarMain-faq-link"]').click();

      cy.url().should('be.equal', `${Cypress.config('baseUrl')}/faq`);
    });
  });
});

export {};
