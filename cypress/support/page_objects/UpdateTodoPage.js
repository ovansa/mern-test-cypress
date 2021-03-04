class UpdateTodoPage {
    getCompletedCheckBox() {
        return cy.get('#completedCheckbox');
    }

    getActionButton(name) {
        return cy.get('.btn').contains(name);
    }
}

export default UpdateTodoPage;