describe("Login Page", () => {
  it("Verifies page components", () => {
    cy.visit("/");
    cy.get('.logo').should('be.visible').should('have.attr', 'alt', 'Piggy Bank logo');
    cy.get('.login-title').should('be.visible').should('contain', 'Welcome to Piggy Bank');
    cy.get('.login-button').should('be.visible').should('contain', 'Login');
  });

  it("Clicking Login navigates to /dashboard", () => {
    cy.visit("/");
    cy.get('.login-button').click();
    cy.url().should('eq', 'http://localhost:4173/dashboard');
  });
});

describe("Dashboard Page", () => {
  it("Verifies page components", () => {
    cy.visit("/");
    cy.get('.login-button').click();
    cy.url().should('eq', 'http://localhost:4173/dashboard');

    // verify header
    cy.get('.header').should('be.visible');
    cy.get('.logo').should('be.visible').should('have.attr', 'alt', 'Piggy Bank logo');
    cy.get('.welcome-message').should('be.visible').should('contain', 'Welcome, ');
    cy.get('.avatar').should('be.visible').should('have.attr', 'alt', 'avatar');

    // verify current balance
    cy.get('.balance').should('be.visible');
    cy.get('.balance-header').should('be.visible').should('contain', 'Current Balance');
    cy.get('.balance-amount').should('be.visible').should('not.be.empty').should('contain', '$998,913.61');

    // verify Account Trend
    cy.get('.account-trend').should('be.visible');
    cy.get('.account-trend__title').should('be.visible').should('contain', 'Account Trend');
    cy.get('#accountTrend').should('be.visible');

    // verify transactions
    cy.get('.transactions').should('be.visible');
    cy.get('.transactions-title').should('be.visible').should('contain', 'Transactions');

    // get the first transaction item and verify components/values 
    // hard coding these values as an example
    cy.get('.transaction-item__type').eq(0).should('be.visible').should('contain', 'credit');
    cy.get('.transaction-item__amount').eq(0).should('be.visible').should('contain', '1500');
    cy.get('.transaction-item__merchant').eq(0).should('be.visible').should('contain', 'IRS');
    cy.get('.transaction-item__details').eq(0).should('exist').should('be.visible').should('contain', 'Federal Income Tax Refund');
    cy.get('.transaction-item__balance').eq(0).should('be.visible').should('contain', '998913.61');

    // verify a debit transaction
    cy.get('.transaction-item__type').eq(1).scrollIntoView();
    cy.get('.transaction-item__type').eq(1).should('be.visible').should('contain', 'debit');
    cy.get('.transaction-item__amount').eq(1).should('be.visible').should('contain', '2785');
    cy.get('.transaction-item__merchant').eq(1).should('be.visible').should('contain', 'Amazon');
    cy.get('.transaction-item__balance').eq(1).should('be.visible').should('contain', '997413.61');
  });
});
