class AddTodoPage {
    getHeaderTitleField() {
        return cy.get('h3');
    }

    getDescriptionField() {
        return cy.get(':nth-child(1) > .form-control');
    }

    getResponsibleField() {
        return cy.get(':nth-child(2) > .form-control');
    }

    getPriorityLevelField(priorityValue) {
        const priorityTag = '#priority'+ priorityValue
        return cy.get(priorityTag);
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