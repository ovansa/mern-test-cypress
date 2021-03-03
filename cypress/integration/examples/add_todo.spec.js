/// <reference types="Cypress" />
import AddTodoPage from '../../support/page_objects/AddTodoPage'

describe('ADD TODO SCENARIOS', function () {
    it('Adding a todo by selecting all fields is successful: Validate that description, responsible, and priority is the same as filled.', function () {
        const addTodoPage = new AddTodoPage()
        const randomDescriptionText = "Description " + Math.random().toString(36).substring(2,7)
        const randomResponsibleText = "Responsible " + Math.random().toString(36).substring(2,7)

        const priorityTypes = ['Low', 'Medium', 'High'];
        const randomPriority = priorityTypes[Math.floor(Math.random() * priorityTypes.length)];

        cy.visit('http://localhost:3000')
        cy.contains('Create Todo').click();
        cy.get('h3').should('have.text', 'Create New Todo');
        addTodoPage.getDescriptionField(randomDescriptionText);
        addTodoPage.getResponsibleField(randomResponsibleText);
        addTodoPage.getPriorityLevelField(randomPriority)
        addTodoPage.getCreateButton().click()

        cy.get('tr td:nth-child(1)').each(($e1, index, $list) => {
            const text = $e1.text()
            if(text.includes(randomDescriptionText)) {
                cy.get('tr td:nth-child(1)').eq(index).next().then(function(value) {
                    const responsible = value.text()
                    expect(responsible).to.equal(randomResponsibleText)
                })
                cy.get('tr td:nth-child(2)').eq(index).next().then(function(value) {
                    const priorityText = value.text()
                    expect(priorityText).to.equal(randomPriority)
                })
            }
        })
    })
})
