// cypress/e2e/chapters.cy.js
import "./../support/commands";

describe('Chapters Page', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('http://localhost:3000/chapters'); 
     });

  it('should add a new chapter successfully', () => {
    // Open the Add Chapter modal
    cy.get('.dashboardCards_add').click();

    // Fill in the chapter form
    cy.get('select[id="course"]').select(0); // Assuming 0 is the value for the first course
    cy.get('select[id="modules"]').select(0); // Assuming 0 is the value for the first module
    cy.get('input[name="title"]').type('Test Chapter');
    cy.get('input[name="description"]').type('1');

    // Submit the form
    cy.get('button#send').click();

    // Verify the new chapter is added and visible
    cy.contains('Test Chapter').scrollIntoView().should('be.visible');
  });

  it('should modify an existing chapter successfully', () => {
    // Click the modify button for the first chapter
    cy.get('button.modifyBTN').last().click(); // Adjust the selector accordingly

    // Modify the chapter form
    cy.get('select[id="course"]').select(0); // Assuming 0 is the value for the first course
    cy.get('select[id="modules"]').select(0); // Assuming 0 is the value for the first module
    cy.get('input[name="title"]').clear().type('Updated Chapter Name');
    cy.get('input[name="description"]').clear().type('1');

    // Submit the form
    cy.get('button#send').click();

    // Verify the chapter is updated
    cy.contains('Updated Chapter Name').should('be.visible');
  });

  it('should remove a chapter successfully', () => {
    // Click the delete button for the first chapter
    cy.get('button.removeBTN').last().click(); // Adjust the selector accordingly

    // Confirm the deletion in the prompt
    cy.on('window:confirm', () => true);

    // Verify the chapter is removed (adjust based on the chapter name)
    cy.contains('Chapter to be deleted').should('not.exist'); // Replace with actual chapter name
  });
});
