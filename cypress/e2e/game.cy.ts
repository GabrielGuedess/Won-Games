/// <reference path="../support/index.d.ts" />

describe('Game Page', () => {
  before(() => {
    cy.visit('/game/cyberpunk-2077');
  });

  it('should render game page sections', () => {
    cy.getByDataCy('game-info').within(() => {
      cy.findByRole('heading', { name: /cyberpunk 2077/i }).should('exist');
      cy.findByText(/^cyberpunk 2077 is an open-world/i).should('exist');
      cy.findByText('$59.99').should('exist');
      cy.findByRole('button', { name: /add to cart/i }).should('exist');
    });

    // gallery
    cy.findAllByRole('button', { name: /thumb \-/i }).should(
      'have.length.gt',
      0,
    );

    // content
    cy.getByDataCy('content').within(() => {
      cy.findByRole('heading', { name: /description/i });
    });

    cy.getByDataCy('content').children().should('have.length.at.least', 2);

    // details
    cy.getByDataCy('game-details').within(() => {
      cy.findByRole('heading', { name: /game details/i }).should('exist');
      cy.findByRole('heading', { name: /developer/i }).should('exist');
      cy.findByRole('heading', { name: /release date/i }).should('exist');
      cy.findByRole('heading', { name: /platforms/i }).should('exist');
      cy.findByRole('heading', { name: /publisher/i }).should('exist');
      cy.findByRole('heading', { name: /rating/i }).should('exist');
      cy.findByRole('heading', { name: /genres/i }).should('exist');

      cy.findAllByText(/cd projekt red/i).should('have.length', 2);
      cy.findAllByText(/dec 8, 2020/i).should('exist');
      cy.findByRole('img', { name: /windows/i }).should('exist');
      cy.findAllByText('O+').should('exist');
      cy.findAllByText('Role-playing / Action / Sci-fi').should('exist');
    });

    // showcases
    cy.shouldRenderShowcase({ name: 'Upcoming Games' });
    cy.shouldRenderShowcase({
      name: 'You may like these games',
      hasHighlight: false,
    });
  });

  it('should add/remove game in cart', () => {
    // add to cart
    cy.getByDataCy('game-info').within(() => {
      cy.findByRole('button', { name: /add to cart/i }).click();
      cy.findByRole('button', { name: /remove from cart/i }).should('exist');
    });

    cy.findAllByLabelText(/cart items/i)
      .first()
      .should('have.text', 1)
      .click();

    cy.getByDataCy('cart-list').within(() => {
      cy.findByRole('heading', { name: /cyberpunk 2077/i }).should('exist');
    });

    // close dropdown
    cy.findAllByLabelText(/cart items/i)
      .first()
      .click();

    // remove from cart
    cy.getByDataCy('game-info').within(() => {
      cy.findByRole('button', { name: /remove from cart/i }).click();
      cy.findByRole('button', { name: /add to cart/i }).should('exist');
    });

    cy.findAllByLabelText(/cart items/i).should('not.exist');
  });
});