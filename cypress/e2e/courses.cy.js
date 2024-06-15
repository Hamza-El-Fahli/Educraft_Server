import "./../support/commands"
describe('Courses Page', () => {

  beforeEach(() => {
    cy.login();

    cy.visit('http://localhost:3000/courses'); // Adjust the URL based on your actual route
  });

  it('should add a new course successfully', () => {
    // Open the Add Course modal
    cy.get('.dashboardCards_add').click();
    
    // Fill in the course form
    cy.get('input[name="Coursename"]').type('Test Course');
    cy.get('input[name="description"]').type('This is a test course');
    cy.get('input[name="instructor"]').type('1');

    // Submit the form
    cy.get('button#send').click();
    
    // Verify the new course is added and visible
    cy.contains('Test Course').should('be.visible');
  });

  it('should modify an existing course successfully', () => {
    // Assuming there's a way to select a course to modify
    // Click the modify button for the first course
    cy.get('button.modifyBTN').last().click(); // Adjust the selector accordingly
    
    // Modify the course form
    cy.get('input[name="Coursename"]').clear().type('Updated Course Name');
    cy.get('input[name="description"]').clear().type('Updated description');
    cy.get('input[name="instructor"]').clear().type('2');

    // Submit the form
    cy.get('button#send').click();
    
    // Verify the course is updated
    cy.contains('Updated Course Name').should('be.visible');
  });

  it('should remove a course successfully', () => {
    // Assuming there's a way to delete a course
    // Click the delete button for the first course
    cy.get('button.removeBTN').last().click(); // Adjust the selector accordingly
    
    // Confirm the deletion in the prompt
    cy.on('window:confirm', () => true);
    
    // Verify the course is removed (adjust based on the course name)
    cy.contains('Course to be deleted').should('not.exist'); // Replace with actual course name
  });
});
