import "./../support/commands";

describe('Modules Page', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('http://localhost:3000/modules');
    cy.intercept('GET', '/api/courses').as('getCourses');
    cy.wait('@getCourses').its('response.statusCode').should('eq', 200);
});

  it('should add a new module successfully', () => {
    // Open the Add Module modal
    cy.get('.dashboardCards_add').click();
    
    // Fill in the module form
    cy.get('select[id="course"]').select(0); // Assuming 0 is the value for the first course
    cy.get('input[name="title"]').type('Test Module');
    cy.get('input[name="description"]').type('1');

    // Submit the form
    cy.get('button#send').click();
    
    // Verify the new module is added and visible
    cy.contains('Test Module').scrollIntoView().should('be.visible');  });


    it('should modify an existing module successfully', () => {
        // Assuming there's a way to select a course to modify
        // Click the modify button for the first course
        cy.get('button.modifyBTN').last().click(); // Adjust the selector accordingly
        
         // Modify in the module form
    cy.get('select[id="course"]').select(0); // Assuming 0 is the value for the first course
    cy.get('input[name="title"]').clear().type('Updated Module Name');
    cy.get('input[name="description"]').clear().type('1');

        // Submit the form
        cy.get('button#send').click();
        
        // Verify the module is updated
        cy.contains('Updated Module Name').should('be.visible');
      });


      it('should remove a module successfully', () => {
        // Assuming there's a way to delete a course
        // Click the delete button for the first course
        cy.get('button.removeBTN').last().click(); // Adjust the selector accordingly
        
        // Confirm the deletion in the prompt
        cy.on('window:confirm', () => true);
        
        // Verify the course is removed (adjust based on the course name)
        cy.contains('Module to be deleted').should('not.exist'); // Replace with actual course name
      });
});
