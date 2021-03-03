class AddTodoPage {
    getDescriptionField(value) {
        return cy.get(':nth-child(1) > .form-control').type(value);
    }

    getResponsibleField(value) {
        return cy.get(':nth-child(2) > .form-control').type(value);
    }

    getPriorityLevelField(priorityValue) {
        const priorityTag = '#priority'+ priorityValue
        return cy.get(priorityTag).click();
    }

    getCreateButton() {
        return cy.get('.btn');
    }
}

export default AddTodoPage;

// cy.get(':nth-child(1) > .form-control').type('Down Up');
//         cy.get(':nth-child(2) > .form-control').type('Person5');
//         cy.get('#priorityMedium').click();
//         cy.get('.btn').click();