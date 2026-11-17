
describe('Testes de Acesso - Classic Cars', () => {

  it('CT-11 - Deve impedir acesso ao painel sem autenticação', () => {
    cy.clearLocalStorage()
    cy.visit('/admin')

    cy.url().should('include', '/login')
  })

  it('CT-12 - Deve permitir acessar o cadastro pela tela de login', () => {
    cy.visit('/login')

    cy.get('a[href="/cadastrar"]').should('be.visible').click()

    cy.url().should('include', '/cadastrar')
    cy.contains('button', 'Cadastrar').should('be.visible')
  })

  it('CT-13 - Deve permitir voltar ao login pela tela de cadastro', () => {
    cy.visit('/cadastrar')

    cy.get('a[href="/login"]').first().should('be.visible').click()

    cy.url().should('include', '/login')
    cy.contains('button', 'Entrar').should('be.visible')
  })

  it('CT-14 - Deve impedir acesso ao painel após limpar a autenticação', () => {
    cy.visit('/login')

    cy.window().then((win) => {
      win.localStorage.setItem('tipo', 'user')
      win.localStorage.setItem('usuario', 'Teste')
    })

    cy.visit('/admin')

    cy.url().should('include', '/login')
  })

  it('CT-15 - Deve manter o usuário na tela de login ao acessar uma rota protegida sem autenticação', () => {
    cy.clearLocalStorage()
    cy.visit('/admin')

    cy.url().should('include', '/login')
    cy.contains('Entrar').should('be.visible')
  })

})
