/// <reference types="Cypress" />
import CommonPageFields from '../../support/page_objects/CommonPageFields'

describe('ADD TODO SCENARIOS', function () {

    it('Scenario 1: Adding a todo by selecting all fields is successful: Validate that description, responsible, \
    and priority in the Todo List is the same as created.', function () {
        const addTodoPage = new CommonPageFields()

        // Generate random values to fill the Todo form
        const randomDescriptionText = "Description " + Math.random().toString(36).substring(2, 7)
        const randomResponsibleText = "Responsible " + Math.random().toString(36).substring(2, 7)
        const priorityTypes = ['Low', 'Medium', 'High'];
        const randomPriority = priorityTypes[Math.floor(Math.random() * priorityTypes.length)];

        cy.visit('http://localhost:3000')
        cy.contains('Create Todo').click();

        // Enter values into the form fields and submit
        addTodoPage.getDescriptionField().type(randomDescriptionText);
        addTodoPage.getResponsibleField().type(randomResponsibleText);
        addTodoPage.getPriorityLevelField(randomPriority).click()
        addTodoPage.getCreateButton().click()

        /** Searches the list of table and validates that the entry i.e. Description, Responsible, and Priority
         in the form is the same as in table
         */
        cy.get('tr td:nth-child(1)').contains(randomDescriptionText).should('have.length', 1).then(
            function () {
                cy.get('tr td:nth-child(1)').each(($e1, index, $list) => {
                    const text = $e1.text()
                    if (text.includes(randomDescriptionText)) {

                        // Checks that Responsible field is the same as created
                        cy.get('tr td:nth-child(1)').eq(index).next().then(function (value) {
                            const responsible = value.text()
                            expect(responsible).to.equal(randomResponsibleText)
                        })

                        // Checks that Priority field is the same as created
                        cy.get('tr td:nth-child(2)').eq(index).next().then(function (value) {
                            const priorityText = value.text()
                            expect(priorityText).to.equal(randomPriority)
                        })
                    }
                })
            }
        )
    })

    it('Scenario 2: Todo can be created by entering only description field: Validate that the Description text\
    is present in Todo List table, while the Responsible and Priority fields are empty in the table', function () {
        const addTodoPage = new CommonPageFields()

        // Generate random values to fill the Todo form
        const randomDescriptionText = "Description " + Math.random().toString(36).substring(2, 7)

        cy.visit('http://localhost:3000')
        cy.contains('Create Todo').click();

        // Enter values into only description field and submit
        addTodoPage.getDescriptionField().type(randomDescriptionText);
        addTodoPage.getCreateButton().click()

        /** Searches the list of table and validates that the entry i.e. Description field created 
         * is present, while the corresponding Responsible and Priority fields are empty
         */
        cy.get('tr td:nth-child(1)').contains(randomDescriptionText).should('have.length', 1).then(
            function () {
                cy.get('tr td:nth-child(1)').each(($e1, index, $list) => {
                    const text = $e1.text()
                    if (text.includes(randomDescriptionText)) {

                        // Checks that Description field is empty
                        cy.get('tr td:nth-child(1)').eq(index).next().then(function (value) {
                            const responsible = value.text()
                            expect(responsible).to.equal("")
                        })

                        // Checks that Priority field is empty
                        cy.get('tr td:nth-child(2)').eq(index).next().then(function (value) {
                            const priorityText = value.text()
                            expect(priorityText).to.equal("")
                        })
                    }
                })
            }
        )
    })

    it('Scenario 3: Todo can be created by entering only responsible field: Validate that the Responsible text\
    is present in Todo List table, while the Description and Priority fields are empty in the table', function () {
        const addTodoPage = new CommonPageFields()

        // Generate random values to fill the Todo form
        const randomResponsibleText = "Responsible " + Math.random().toString(36).substring(2, 15)

        cy.visit('http://localhost:3000')
        cy.contains('Create Todo').click();

        // Enter values into only description field and submit
        addTodoPage.getResponsibleField().type(randomResponsibleText);
        addTodoPage.getCreateButton().click()

        /** Searches the list of table and validates that the entry i.e. Description field created 
         * is present, and then checks that corresponding Responsible and Priority fields are empty
         */
        cy.get('tr td:nth-child(2)').contains(randomResponsibleText).should('have.length', 1).then(
            function () {
                cy.get('tr td:nth-child(2)').each(($e1, index, $list) => {
                    const text = $e1.text()
                    if (text.includes(randomResponsibleText)) {

                        // Checks that Description field is empty
                        cy.get('tr td:nth-child(2)').eq(index).prev().then(function (value) {
                            const responsible = value.text()
                            expect(responsible).to.equal("")
                        })

                        // Checks that Priority field is empty
                        cy.get('tr td:nth-child(2)').eq(index).next().then(function (value) {
                            const priorityText = value.text()
                            expect(priorityText).to.equal("")
                        })
                    }
                })
            }
        )
    })
})