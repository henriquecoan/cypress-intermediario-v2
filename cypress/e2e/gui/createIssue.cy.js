
import { faker } from '@faker-js/faker'

describe('Create Project', () => {
    const project = {
        name: `project-${faker.datatype.uuid()}`,
        description: faker.random.words(5)
      }
      
      const issue = {
        title: `issue-${faker.lorem.sentence()}`,
        description: faker.random.words(10)
    }
  beforeEach(() => {
    cy.api_deleteProject()
    cy.login()
    cy.api_createProject(project)
  })

  it('successfully', () => {
     cy.gui_createIssue(issue)

    // cy.url().should('be.equal', `${Cypress.config('baseUrl')}/${Cypress.env('user_name')}/${project.name}`)
    cy.contains(issue.title).should('be.visible')
    //cy.contains(issue.description).should('be.visible')
  })
})
