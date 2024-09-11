// here are widely used commmands through all of the test suite
const envUsername = Cypress.env('username');
const envPassword = Cypress.env('password');


Cypress.Commands.add('performLogin', () => {
  cy.visit('https://hesti.maps/login');
  cy.get('input[name="username"]').type(envUsername);
  cy.get('input[name="password"]').type(envPassword);
  cy.get('button[type="submit"]').click();
});

// go to the application main page
Cypress.Commands.add('visitMap', () => {
  cy.visit('https://hesti.maps/map');
  cy.ensureElementVisible('#map');
});
