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

      cy.waitForElement('[data-cy="sidebarMain-faq-link"]', 15000);
      cy.get('[data-cy="sidebarMain-faq-link"]').click();

      cy.wait(2000)
        .url()
        .should('be.equal', `${Cypress.config('baseUrl')}/faq`);
    });
  });
});

export {};
