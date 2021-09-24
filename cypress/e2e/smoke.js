describe('app', () => {
  it('works', () => {
    cy.visit('/')
    cy.wait(500) // wait for rehydration
    cy.findAllByRole('link', {name: /portfolio/i})
      .last()
      .click()
    cy.findAllByRole('heading', {name: /choose/i})
  })
})
