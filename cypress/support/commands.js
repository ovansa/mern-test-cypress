import CommonPageFields from "./page_objects/CommonPageFields";

const commonPageFields = new CommonPageFields()
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('navigateToAddTodoPage', () => {
    cy.visit(Cypress.env('todo_url'));
    cy.contains('Create Todo').click();
})

Cypress.Commands.add('fillTodoFormAndSubmit', (description, responsible, priority, btnName) => {
    if (description) {
        commonPageFields.getDescriptionField().type(description);
    }
    if (responsible) {
        commonPageFields.getResponsibleField().type(responsible);
    }
    if (priority) {
        commonPageFields.getPriorityLevelField(priority).check()
    }
    if (btnName) {
        commonPageFields.getActionButton(btnName).click()
    }
})

Cypress.Commands.add('clearForm', () => {
    commonPageFields.getDescriptionField().clear();
    commonPageFields.getResponsibleField().clear()
})