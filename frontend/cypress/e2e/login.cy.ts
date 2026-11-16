describe('Teste de Login - Classic Cars', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000/login')
  })

  it('Deve carregar a página de login', () => {
    cy.contains('Entrar').should('be.visible')
  })

})