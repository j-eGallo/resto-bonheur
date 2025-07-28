

describe('Resto Bonheur – Tests Cypress', () => {
  const baseUrl = 'http://localhost:3001';

  // 1. Réservation d’une table
  it('Effectue une réservation avec des données valides', () => {
    cy.visit(baseUrl);
    cy.get('input[name="nom"]').type('Jean Gallo');
    cy.get('input[name="email"]').type('gallojean.emmanuel@gmail.com');
    cy.get('input[name="date"]').type('2025-12-25');
    cy.get('input[name="heure"]').type('19:30');
    cy.get('input[name="personnes"]').type('2');
    cy.get('button[type="submit"]').click();
    cy.contains('Réservation confirmée').should('exist'); // Adapte si ton message est différent
  });

  // 2. Connexion admin réussie avec bon mot de passe
  it('Connexion admin réussie', () => {
    cy.visit(`${baseUrl}/login`);
    cy.get('input[name="email"]').type('jean.phocea13@gmail.com');
    cy.get('input[name="password"]').type('aaa');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
    cy.contains('Nos réservations', { timeout: 100000000000 }).should('exist');
  });

  // 3. Connexion admin échouée
  it('Connexion admin échoue avec mauvais mot de passe', () => {
    cy.visit(`${baseUrl}/login`);
    cy.get('input[name="email"]').type('jean.phocea13@gmail.com');
    cy.get('input[name="password"]').type('mauvaismotdepasse');
    cy.get('button[type="submit"]').click();
    cy.contains('Mot de passe incorrect').should('exist'); // Adapte selon ton message d’erreur
  });


  // 5. Suppression d’une réservation
  it('Supprime une réservation depuis le dashboard', () => {
    cy.visit(`${baseUrl}/login`);
    cy.get('input[name="email"]').type('jean.phocea13@gmail.com');
    cy.get('input[name="password"]').type('aaa');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');

    // ⚠️ Suppose que le bouton "Supprimer" existe
    cy.get('button.delete-btn').first().click();
    cy.contains('Réservation supprimée').should('exist'); // Adapte selon ton message
  });
});
