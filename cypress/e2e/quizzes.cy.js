import "../support/commands";

describe('Quizzes Page', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('http://localhost:3000/quizzes');
    cy.intercept('GET', '/api/courses').as('getCourses');
    // cy.wait('@getCourses').its('response.statusCode').should('eq', 200);
});

  it('should add a new quiz successfully', () => {
    // Open the Add Module modal
    cy.get('.dashboardCards_add').click();
    
    // Fill in the module form
    cy.get('select[id="course"]').select(0); // Assuming 0 is the value for the first course
    cy.get('select[id="module"]').select(0); // Assuming 0 is the value for the first course
    cy.get('select[id="chapter"]').select(0); // Assuming 0 is the value for the first course
    cy.get('input[name="quizGroup"]').type('0');
    cy.get('input[name="question"]').type('Test Question');
    cy.get('input[name="correct answer"]').type('correct answer');


    // Submit the form
    cy.get('button[name="addOption"]').click();
    cy.get('button[name="addOption"]').click();
    cy.get('button[name="addOption"]').click();
    cy.get('button[name="delOption"]').click();
    cy.get('input[name="option-1"]').type('wrong option')
    cy.get('input[name="option-2"]').type('wrong option')
    cy.get('input[name="option-3"]').type('wrong option')

    cy.get('button#send').click()
    // Verify the new module is added and visible
    cy.get('.quiz-question').last().contains('Test Question');
  });


    it('should modify an existing quiz successfully', () => {
        // Assuming there's a way to select a course to modify
        // Click the modify button for the first course
        cy.get('button.quiz-modify').last().click(); // Adjust the selector accordingly
        
         // Modify in the module form
   cy.get('select[id="course"]').select(0); // Assuming 0 is the value for the first course
    cy.get('select[id="module"]').select(0); // Assuming 0 is the value for the first course
    cy.get('select[id="chapter"]').select(0); // Assuming 0 is the value for the first course
    cy.get('input[name="quizGroup"]').type('1');
    cy.get('input[name="question"]').clear().type('Updated Test Question');
    cy.get('input[name="correct answer"]').clear().type('Updated correct answer');



    cy.get('input[name="option-1"]').clear().type('Updated wrong option')
    cy.get('input[name="option-2"]').clear().type('Updated wrong option')
    cy.get('input[name="option-3"]').clear().type('Updated wrong option')

        // Submit the form
        cy.get('button#send').click();
        
        // Verify the quiz is updated
    cy.get('.quiz-question').last().contains('Updated Test Question');
});


      it('should remove a quiz successfully', () => {
        // Assuming there's a way to delete a course
        // Click the delete button for the first course
        cy.get('button.quiz-remove').last().click(); // Adjust the selector accordingly
        
        // Confirm the deletion in the prompt
        cy.on('window:confirm', () => true);
        
        // Verify the course is removed (adjust based on the course name)
        cy.contains('Quiz to be deleted').should('not.exist'); // Replace with actual course name
      });
});
