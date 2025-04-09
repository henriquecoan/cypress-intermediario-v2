import { faker } from '@faker-js/faker'

const options = { env: { snapshotOnly: true } }

describe('Set milestone on issue', options, () => {
    const issue = {
        title: `issue-${faker.string.uuid()}`, // Atualizado para usar faker.string.uuid()
        description: faker.word.words(3), // Atualizado para usar faker.word.words()
        project: {
          name: `project-${faker.string.uuid()}`, // Atualizado para usar faker.string.uuid()
          description: faker.word.words(5) // Atualizado para usar faker.word.words()
        }
      }

      const milestone = {
        title: `milestone-${faker.word.sample()}` // Atualizado para usar faker.word.sample()
      }

  beforeEach(() => {
    cy.api_deleteProjects()
    cy.login()
    cy.api_createIssue(issue)
      .then(response => {
        cy.api_createMilestone(response.body.project_id, milestone)
        cy.visit(`${Cypress.env('user_name')}/${issue.project.name}/issues/${response.body.iid}`)
      })
  })

  it('successfully', () => {
    cy.gui_setMilestoneOnIssue(milestone)

    cy.get('.block.milestone').should('contain', milestone.title)
  })
})
