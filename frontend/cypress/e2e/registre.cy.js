// https://on.cypress.io/api

describe('Registre component', () => {
  beforeEach(() => {
    cy.visit('/registre');
  })
  it('mostra el formulari de registre correctament', () => {
    cy.contains('h2', "Registra't").should('be.visible');

    cy.get('input[placeholder="Introdueix el teu correu"]').should('be.visible');
    cy.get('input[placeholder="Introdueix el teu nom"]').should('be.visible');
    cy.get('input[placeholder="Crea una contrasenya"]').should('be.visible');
    cy.get('input[placeholder="Repeteix la contrasenya"]').should('be.visible');
    cy.get('button').contains('Registra\'t').should('be.visible');
  });

  it('shows email tooltip message when is clicked', () => {
    cy.get('button.tooltip-btn').first().click();

    cy.get('.tooltip').should('be.visible')
      .contains('Escriviu el vostre correu electrònic vàlid (exemple@example.com)');
  });
  it('shows name tooltip message when is clicked', () => { 
    cy.get('button.tooltip-btn').eq(1).click();

    cy.get('.tooltip').should('be.visible')
      .contains('Escriviu el vostre nom complet');
  });
  it('shows password tooltip message when is clicked', () => {
    cy.get('button.tooltip-btn').eq(2).click();

    cy.get('.tooltip').should('be.visible')
      .contains('La contrasenya ha de tenir almenys 8 caràcters, incloent números, minúsucules i majúsucules.');
  });
  it('shows repeat password tooltip message when is clicked', () => {
    cy.get('button.tooltip-btn').eq(3).click();

    cy.get('.tooltip').should('be.visible')
      .contains('Confirmeu la mateixa contrasenya introduïda anteriorment.');
  });
  it('shows success toast when a user is created', () => {
  
    cy.get('input[placeholder="Introdueix el teu correu"]').type('test@test.com')
    cy.get('input[placeholder="Introdueix el teu nom"]').type('Test User')
    cy.get('input[placeholder="Crea una contrasenya"]').type('Testing123')
    cy.get('input[placeholder="Repeteix la contrasenya"]').type('Testing123')
  
    cy.get('button').contains("Registra't").click()
    cy.wait(5000) 
    cy.contains('Usuari creat correctament').should('be.visible')
  })
  
});