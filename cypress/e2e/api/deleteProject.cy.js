import { faker } from '@faker-js/faker'

describe('Delete Project', () => {
    it('successfully', () => {
        cy.api_deleteProject()
     })
})
