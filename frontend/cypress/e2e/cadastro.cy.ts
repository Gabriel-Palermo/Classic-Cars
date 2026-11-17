
import CadastroPage from '../pages/CadastroPage'

describe('Testes de Cadastro - Classic Cars', () => {

  it('CT-06 - Deve impedir cadastro com campos vazios', () => {
    CadastroPage.visitar()
    CadastroPage.clicarCadastrar()

    CadastroPage.verificarErro('Preencha todos os campos')
    cy.url().should('include', '/cadastrar')
  })

  it('CT-07 - Deve impedir cadastro com email inválido', () => {
    cy.fixture('example').then((dados) => {
      CadastroPage.visitar()
      CadastroPage.preencherNome(dados.cadastroInvalido.nome)
      CadastroPage.preencherEmail(dados.cadastroInvalido.email)
      CadastroPage.preencherUsuario(dados.cadastroInvalido.usuario)
      CadastroPage.preencherSenha(dados.cadastroInvalido.senha)
      CadastroPage.confirmarSenha(dados.cadastroInvalido.senha)
      CadastroPage.clicarCadastrar()
    })

    CadastroPage.verificarErro('Email inválido')
    cy.url().should('include', '/cadastrar')
  })

  it('CT-08 - Deve impedir cadastro com senhas diferentes', () => {
    cy.fixture('example').then((dados) => {
      CadastroPage.visitar()
      CadastroPage.preencherNome(dados.cadastroInvalido.nome)
      CadastroPage.preencherEmail('teste@email.com')
      CadastroPage.preencherUsuario(dados.cadastroInvalido.usuario)
      CadastroPage.preencherSenha(dados.cadastroInvalido.senha)
      CadastroPage.confirmarSenha('654321')
      CadastroPage.clicarCadastrar()
    })

    CadastroPage.verificarErro('As senhas não coincidem')
    cy.url().should('include', '/cadastrar')
  })

  it('CT-09 - Deve impedir cadastro com senha menor que 6 caracteres', () => {
    cy.fixture('example').then((dados) => {
      CadastroPage.visitar()
      CadastroPage.preencherNome(dados.cadastroInvalido.nome)
      CadastroPage.preencherEmail('teste@email.com')
      CadastroPage.preencherUsuario(dados.cadastroInvalido.usuario)
      CadastroPage.preencherSenha('123')
      CadastroPage.confirmarSenha('123')
      CadastroPage.clicarCadastrar()
    })

    CadastroPage.verificarErro('Senha deve ter no mínimo 6 caracteres')
    cy.url().should('include', '/cadastrar')
  })

  it('CT-10 - Deve realizar cadastro com dados válidos', () => {
    const email = `teste${Date.now()}@email.com`

    CadastroPage.visitar()
    CadastroPage.preencherNome('Teste Cypress')
    CadastroPage.preencherEmail(email)
    CadastroPage.preencherUsuario('testecypress')
    CadastroPage.preencherSenha('123456')
    CadastroPage.confirmarSenha('123456')
    CadastroPage.clicarCadastrar()

    cy.on('window:alert', (mensagem) => {
      expect(mensagem).to.equal('Cadastro realizado com sucesso!')
    })

    cy.url().should('include', '/login')
  })

})
