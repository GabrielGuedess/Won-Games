/// <reference path="../support/index.d.ts" />

describe('Home Page', () => {
  it('should render home page sections', () => {
    cy.visit('/');

    cy.shouldRenderBanner();

    cy.shouldRenderShowcase({ name: 'New Games', hasHighlight: false });
    cy.shouldRenderShowcase({ name: 'Most Popular Games' });
    cy.shouldRenderShowcase({ name: 'Upcoming Games' });
    cy.shouldRenderShowcase({ name: 'Free Games' });
  });
});
