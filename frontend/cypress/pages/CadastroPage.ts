class CadastroPage {
  visitar() {
    cy.visit('/cadastrar')
  }

  preencherNome(nome: string) {
    cy.get('input[placeholder="Nome completo"]').type(nome)
  }

  preencherEmail(email: string) {
    cy.get('input[placeholder="Email"]').type(email)
  }

  preencherUsuario(usuario: string) {
    cy.get('input[placeholder="Usuário"]').type(usuario)
  }

  preencherSenha(senha: string) {
    cy.get('input[placeholder="Senha"]').type(senha)
  }

  confirmarSenha(senha: string) {
    cy.get('input[placeholder="Confirmar senha"]').type(senha)
  }

  clicarCadastrar() {
    cy.contains('button', 'Cadastrar').click()
  }

  verificarErro(mensagem: string) {
    cy.contains(mensagem).should('be.visible')
  }
}

export default new CadastroPage()