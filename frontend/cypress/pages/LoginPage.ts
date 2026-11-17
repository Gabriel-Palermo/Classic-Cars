class LoginPage {
  visitar() {
    cy.visit('/login')
  }

  preencherEmail(email: string) {
    cy.get('input[placeholder="Email"]').type(email)
  }

  preencherSenha(senha: string) {
    cy.get('input[placeholder="Senha"]').type(senha)
  }

  clicarEntrar() {
    cy.contains('button', 'Entrar').click()
  }

  verificarErro(mensagem: string) {
    cy.contains(mensagem).should('be.visible')
  }

  verificarPainel() {
    cy.contains('Painel Administrativo', { timeout: 10000 }).should('be.visible')
  }
}

export default new LoginPage()