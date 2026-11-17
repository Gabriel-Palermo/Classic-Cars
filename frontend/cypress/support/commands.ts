
/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, senha: string): Chainable<void>
    }
  }
}

Cypress.Commands.add('login', (email: string, senha: string) => {
  cy.visit('/login')
  cy.get('input[placeholder="Email"]').type(email)
  cy.get('input[placeholder="Senha"]').type(senha)
  cy.contains('button', 'Entrar').click()
})

export {}
