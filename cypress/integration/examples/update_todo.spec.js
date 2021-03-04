/// <reference types="Cypress" />
import CommonPageFields from '../../support/page_objects/CommonPageFields'
import UpdateTodoPage from '../../support/page_objects/UpdateTodoPage'

describe('UPDATE TODO SCENARIOS', function () {
    it('Scenario 1: The details of the todo selected by clicking edit button is prefilled in todo update page: \
    Verify that the prefilled Description, Responsible, and Priority is the same as that in the todo list table', function () {
        const commonPageFields = new CommonPageFields()

        // Generate random values to fill the Todo form
        const randomDescriptionText = "Description " + Math.random().toString(36).substring(2, 7)
        const randomResponsibleText = "Responsible " + Math.random().toString(36).substring(2, 7)
        const priorityTypes = ['Low', 'Medium', 'High'];
        const randomPriority = priorityTypes[Math.floor(Math.random() * priorityTypes.length)];

        var selectedDescription = ''
        var selectedResponsible = ''
        var selectedPriority = ''

        cy.visit('http://localhost:3000')
        cy.contains('Create Todo').click();

        // Create a todo
        commonPageFields.getDescriptionField().type(randomDescriptionText);
        commonPageFields.getResponsibleField().type(randomResponsibleText);
        commonPageFields.getPriorityLevelField(randomPriority).click()
        commonPageFields.getCreateButton().click()

        // Search for todo in Todo List table and click the edit link

        cy.get('tr td:nth-child(1)').contains(randomDescriptionText).should('have.length', 1).then(
            function () {
                cy.get('tr td:nth-child(1)').each(($e1, index, $list) => {
                    const text = $e1.text()
                    if (text.includes(randomDescriptionText)) {
                        // Gets the description text from the table
                        cy.get('tr td:nth-child(1)').eq(index).then(function (value) {
                            const description = value.text()
                            selectedDescription = description
                        }).then(function () {
                            // Checks that Responsible field is the same as created and gets the text
                            cy.get('tr td:nth-child(1)').eq(index).next().then(function (value) {
                                const responsible = value.text()
                                expect(responsible).to.equal(randomResponsibleText)
                                selectedResponsible = responsible
                            })
                        }).then(function () {
                            // Checks that Priority field is the same as created and gets the text
                            cy.get('tr td:nth-child(2)').eq(index).next().then(function (value) {
                                const priorityText = value.text()
                                expect(priorityText).to.equal(randomPriority)
                                selectedPriority = priorityText
                            })
                        }).then(function () {
                            // Click the edit link of todo 
                            cy.get('tr td:nth-child(3)').eq(index).next().contains('Edit').click()
                        }).then(function () {
                            // Verify that the texts in the text fields matches the selected todo from the Todo list table
                            commonPageFields.getDescriptionField().should('have.value', selectedDescription)
                            commonPageFields.getResponsibleField().should('have.value', selectedResponsible)
                            commonPageFields.getPriorityLevelField(selectedPriority).should('be.checked')
                        })
                    }
                })
            }
        )
    })

    it('Scenario 2: Todo can be completed successfully: Validate that completed todo i.e. \
    Description, Responsible and Priority texts are crossed out in Todo List table', function () {
        const commonPageFields = new CommonPageFields()
        const updateTodoPage = new UpdateTodoPage()

        // Generate random values to fill the Todo form
        const randomDescriptionText = "Description " + Math.random().toString(36).substring(2, 7)
        const randomResponsibleText = "Responsible " + Math.random().toString(36).substring(2, 7)
        const priorityTypes = ['Low', 'Medium', 'High'];
        const randomPriority = priorityTypes[Math.floor(Math.random() * priorityTypes.length)];

        cy.visit('http://localhost:3000')
        cy.contains('Create Todo').click();

        // Create a todo
        commonPageFields.getDescriptionField().type(randomDescriptionText);
        commonPageFields.getResponsibleField().type(randomResponsibleText);
        commonPageFields.getPriorityLevelField(randomPriority).click()
        commonPageFields.getCreateButton().click()

        // Search for todo in Todo List table and click the edit link

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

                        // Click the edit link of todo 
                        cy.get('tr td:nth-child(3)').eq(index).next().contains('Edit').click()
                    }
                })
            }
        )

        // Click on completed checkbox
        updateTodoPage.getCompletedCheckBox().check()

        // Click on update button
        updateTodoPage.getActionButton('Update Todo').click()

        // Search for todo in Todo List table and verify that the texts are crossed-out.
        cy.get('tr td:nth-child(1)').contains(randomDescriptionText).should('have.length', 1).then(
            function () {
                cy.get('tr td:nth-child(1)').each(($e1, index, $list) => {
                    const text = $e1.text()
                    if (text.includes(randomDescriptionText)) {

                        // Checks that Description text is crossed
                        cy.get('tr td:nth-child(1)').eq(index).should('have.class', 'completed')

                        // Checks that Responsible text is crossed
                        cy.get('tr td:nth-child(1)').eq(index).next().should('have.class', 'completed')

                        // Checks that Priority text is crossed
                        cy.get('tr td:nth-child(2)').eq(index).next().should('have.class', 'completed')
                    }
                })
            }
        )
    })
})