/// <reference types="cypress" />

type ShowcaseAttributes = {
  name: string;
  hasHighlight?: boolean;
};

type FieldsAttributes = {
  name: string | number;
  label: string;
};

type UserAttributes = Record<'username' | 'email' | 'password', string>;

declare namespace Cypress {
  interface Chainable {
    google(): Chainable<AUTWindow>;

    signIn(email?: string, password?: string): Chainable<Element>;
    signUp(user: UserAttributes): Chainable<Element>;

    getByDataCy(selector: string): Chainable<JQuery<HTMLElement>>;
    getFields(fields: FieldsAttributes[]): Chainable<Element>;

    shouldBeGreaterThan(value: number): Chainable<Element>;
    shouldBeLessThan(value: number): Chainable<Element>;

    shouldRenderBanner(): Chainable<Element>;
    shouldRenderShowcase(attrs: ShowcaseAttributes): Chainable<Element>;

    addToCartByIndex(value: number): Chainable<Element>;
    removeFromCartByIndex(value: number): Chainable<Element>;
  }
}
