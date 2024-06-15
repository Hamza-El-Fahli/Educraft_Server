Cypress.Commands.add('login', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/api/users', // Adjust the URL based on your actual login endpoint
      body: {
        email: '0@m.com', // Replace with a valid email
        password: '0'  // Replace with a valid password
      }
    }).then((resp) => {
      cy.setCookie('currentUser', JSON.stringify(resp.body));
    });
  });
  