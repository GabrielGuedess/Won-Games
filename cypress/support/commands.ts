/// <reference types="cypress" />

import '@testing-library/cypress/add-commands';

Cypress.Commands.add('google', () => cy.visit('https://google.com'));

Cypress.Commands.add('getByDataCy', selector => {
  return cy.get(`[data-cy="${selector}"]`);
});

Cypress.Commands.add('shouldRenderBanner', () => {
  cy.get('.slick-slider').within(() => {
    cy.findByRole('heading', { name: /cyberpunk 2077/i });
    cy.findByRole('link', { name: /buy now/i });

    cy.get('.slick-dots > :nth-child(2) > button').click();
    cy.wait(500);

    cy.findByRole('heading', { name: /horizon zero dawn/i });
    cy.findByRole('link', { name: /buy now/i });

    cy.get('.slick-dots > :nth-child(3) > button').click();
    cy.wait(500);

    cy.findByRole('heading', { name: /huge promotion!/i });
    cy.findByRole('link', { name: /browse games/i });
  });
});

Cypress.Commands.add(
  'shouldRenderShowcase',
  ({ name, hasHighlight = true }) => {
    cy.getByDataCy(name).within(() => {
      cy.findByRole('heading', { name }).should('exist');

      cy.getByDataCy('highlight').should(hasHighlight ? 'exist' : 'not.exist');

      if (hasHighlight) {
        cy.getByDataCy('highlight').within(() => {
          cy.findByRole('link').should('have.attr', 'href');
        });
      }

      cy.getByDataCy('game-card').should('have.length.gt', 0);
    });
  },
);

Cypress.Commands.add('getFields', fields => {
  fields.map(({ label }) => {
    cy.findByText(label).should('exist');
  });
});

Cypress.Commands.add('shouldBeGreaterThan', value => {
  cy.findByText(/^\$\d+(\.\d{1,2})?/)
    .invoke('text')
    .then($el => $el.replace('$', ''))
    .then(parseFloat)
    .should('be.gt', value);
});

Cypress.Commands.add('shouldBeLessThan', value => {
  cy.findByText(/^\$\d+(\.\d{1,2})?/)
    .invoke('text')
    .then($el => $el.replace('$', ''))
    .then(parseFloat)
    .should('be.lt', value);
});

Cypress.Commands.add('signUp', user => {
  cy.findByPlaceholderText(/username/i).type(user.username);
  cy.findByPlaceholderText(/email/i).type(user.email);
  cy.findByPlaceholderText(/^password/i).type(user.password);
  cy.findByPlaceholderText(/confirm password/i).type(user.password);

  cy.findByRole('button', { name: /sign up now/i }).click();
});

Cypress.Commands.add(
  'signIn',
  (email = 'e2e@wongames.com', password = '123456') => {
    cy.findByPlaceholderText(/email/i).type(email);
    cy.findByPlaceholderText(/^password/i).type(password);

    cy.findByRole('button', { name: /sign in now/i }).click();
  },
);

Cypress.Commands.add('addToCartByIndex', index => {
  cy.getByDataCy('game-card')
    .eq(index)
    .within(() => {
      cy.findByRole('button', { name: /add to cart/i }).click();
    });
});

Cypress.Commands.add('removeFromCartByIndex', index => {
  cy.getByDataCy('game-card')
    .eq(index)
    .within(() => {
      cy.findByRole('button', { name: /remove from cart/i }).click();
    });
});
