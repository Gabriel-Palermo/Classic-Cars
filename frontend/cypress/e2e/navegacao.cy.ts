
describe('Testes de Navegação - Classic Cars', () => {

  it('CT-16 - Deve carregar os elementos principais da página inicial', () => {
    cy.visit('/')

    cy.get('img[alt="Logo"]').should('be.visible')
    cy.get('input[placeholder="Busque aqui..."]').should('be.visible')
    cy.get('nav a[href="/"]').should('be.visible')
    cy.contains('a', 'Login').should('be.visible')
  })

  it('CT-17 - Deve filtrar veículos pela busca', () => {
    cy.visit('/')

    cy.get('input[placeholder="Busque aqui..."]')
      .type('veiculoqueinexiste999')

    cy.contains('Nenhum carro encontrado').should('be.visible')
  })

  it('CT-18 - Deve direcionar usuário não autenticado ao login ao tentar anunciar', () => {
    cy.visit('/')

    cy.get('nav a[href="/login"]').contains('Anunciar').click()

    cy.url().should('include', '/login')
  })

  it('CT-19 - Deve exibir o menu administrativo após login', () => {
    cy.fixture('example').then((dados) => {
      cy.login(dados.admin.email, dados.admin.senha)
    })

    cy.get('nav a[href="/admin/anuncios"]').should('be.visible')
    cy.get('nav a[href="/admin/insights"]').should('be.visible')
    cy.get('nav a[href="/admin/pedidos"]').should('be.visible')
  })

  it('CT-20 - Deve realizar logout corretamente', () => {
    cy.fixture('example').then((dados) => {
      cy.login(dados.admin.email, dados.admin.senha)
    })

    cy.contains('button', 'Sair').should('be.visible').click()

    cy.url().should('eq', 'http://localhost:3000/')
    cy.contains('a', 'Login').should('be.visible')

    cy.window().then((win) => {
      expect(win.localStorage.getItem('tipo')).to.be.null
      expect(win.localStorage.getItem('usuario')).to.be.null
    })
  })

})
