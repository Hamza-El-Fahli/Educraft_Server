describe('Login Functionality', () => {
  it('should allow users to login with valid credentials', () => {
    cy.visit('http://localhost:3000/login'); // Visit the login page

    cy.get('#username').type('TestUser');
    cy.get('#password').type('0');

    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/userplatform');

  });

  it('should allow Admin to login with valid credentials', () => {
    cy.visit('http://localhost:3000/login'); // Visit the login page

    cy.get('#username').type('TestAdmin');
    cy.get('#password').type('0');

    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/dashboard');

  });

  it('should show error messages for invalid username', () => {
    cy.visit('http://localhost:3000/login'); 

    cy.get('#username').type('invalid_user');
    cy.get('#password').type('0');

    cy.get('button[type="submit"]').click();

    cy.get('#usernameError').should('be.visible');

  });
  it('should show error messages for invalid password', () => {
    cy.visit('http://localhost:3000/login'); 

    cy.get('#username').type('TestUser');
    cy.get('#password').type('invalid_password');

    cy.get('button[type="submit"]').click();

    cy.get('#passwordError').should('be.visible');

  });
});
