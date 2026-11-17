
import LoginPage from '../pages/LoginPage'

describe('Testes de Login - Classic Cars', () => {

  beforeEach(() => {
    LoginPage.visitar()
  })

  it('CT-01 - Deve carregar a página de login', () => {
    cy.contains('Entrar').should('be.visible')
  })

  it('CT-02 - Deve realizar login com credenciais válidas', () => {
    cy.fixture('example').then((dados) => {
      cy.login(dados.admin.email, dados.admin.senha)
    })

    cy.url().should('include', '/admin')
    cy.window().its('localStorage.tipo').should('eq', 'admin')
  })

  it('CT-03 - Deve impedir login com senha incorreta', () => {
    LoginPage.preencherEmail('admin')
    LoginPage.preencherSenha('senhaerrada')
    LoginPage.clicarEntrar()

    LoginPage.verificarErro('Usuário ou senha inválidos')
    cy.url().should('include', '/login')
  })

  it('CT-04 - Deve impedir login com campos vazios', () => {
    LoginPage.clicarEntrar()

    LoginPage.verificarErro('Preencha os campos')
    cy.url().should('include', '/login')
  })

  it('CT-05 - Deve acessar o painel administrativo', () => {
    cy.fixture('example').then((dados) => {
      cy.login(dados.admin.email, dados.admin.senha)
    })

    LoginPage.verificarPainel()
    cy.contains('Acessar Painel').should('be.visible')
  })

})
