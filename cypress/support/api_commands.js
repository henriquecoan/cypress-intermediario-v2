const accessToken = `Bearer ${Cypress.env('gitlab_access_token')}`

Cypress.Commands.add('api_createProject', project => {
  cy.request({
    method: 'POST',
    url: `/api/v4/projects/`,
    body: {
      name: project.name,
      description: project.description,
      initialize_with_readme: true
    },
    headers: { Authorization: accessToken },
  })
  Cypress.env('api_projectName', project.name)
})

Cypress.Commands.add('api_getProject', () => {
    cy.request({
      method: 'GET',
      url: `/api/v4/projects/`,
      headers: { Authorization: accessToken },
    })
  })

Cypress.Commands.add('api_deleteProject', () => {
    cy.api_getProject().then(response => {
      response.body.forEach(item => {
        cy.request({
            method: 'DELETE',
            url: `/api/v4/projects/${item.id}`,
            headers: { Authorization: accessToken },
        });
      })
    })
  })
