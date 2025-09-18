describe('titles test', () => {
  it('shows the todo list and categories title', () => {
    cy.visit('http://localhost:5173/');

    cy.get('[data-testid=todo-list-title]').should('have.text', 'Todo List');
    cy.get('[data-testid=categories-list-title]').should('have.text', 'Categories');
  });
});

describe('adding categories and todos', () => {
  it('adds a new category and a new todo', () => {
    cy.visit('http://localhost:5173/');

    // Add a new category
    cy.get('[data-testid=new-category-input]').type('New Category{enter}');
    cy.get('[data-testid=categories-list]').contains('New Category');

    // Add a new todo
    cy.get('[data-testid=new-todo-input]').type('New Todo{enter}');
    cy.get('[data-testid=todo-list]').contains('New Todo');
  });
});

describe('deleting categories', () => {
  it('deletes a category', () => {
    cy.visit('http://localhost:5173/');

    // Delete the category
    cy.get('[data-testid=delete-category-button]').last().click();
    cy.get('[data-testid=modal-dialog]').should('be.visible');
    cy.get('[data-testid=modal-cancel-button]').click();
    cy.get('[data-testid=modal-dialog]').should('not.exist');
    cy.wait(1000);

    cy.get('[data-testid=delete-category-button]').last().click();
    cy.get('[data-testid=modal-dialog]').should('be.visible');
    cy.wait(1000);

    cy.get('[data-testid=modal-confirm-button]').click();
    cy.wait(1000);

    cy.get('[data-testid=modal-dialog]').should('not.exist');
    cy.wait(1000);
    cy.get('[data-testid=categories-list]').should('not.contain', 'New Category');
  });
});

describe('deleting todos', () => {
  it('deletes a todo', () => {
    cy.visit('http://localhost:5173/');

    // Delete the todo
    cy.get('[data-testid=delete-todo-button]').last().click();
    cy.get('[data-testid=modal-dialog]').should('be.visible');
    cy.get('[data-testid=modal-cancel-button]').click();
    cy.get('[data-testid=modal-dialog]').should('not.exist');

    cy.get('[data-testid=delete-todo-button]').last().click();
    cy.get('[data-testid=modal-dialog]').should('be.visible');
    cy.get('[data-testid=modal-confirm-button]').click();
    cy.get('[data-testid=modal-dialog]').should('not.exist');
    cy.wait(500);
    cy.get('[data-testid=todo-list]').should('not.contain', 'New Todo');
  });
});
