Cypress.Commands.add('searchProperties', (location, checkInDate, checkOutDate, adults, children) => {
    cy.get('#location').type(location);
    cy.get('#checkin-date').type(checkInDate);
    cy.get('#checkout-date').type(checkOutDate);
    cy.get('#guests').click();
    cy.get('#adults').type(adults);
    cy.get('#children').type(children);
    cy.get('#close').click();
    cy.get('#search-button').click();
  });
  
  Cypress.Commands.add('verifyAppliedFilters', (expectedFilters) => {
    cy.get('#filters-area').should('include.text', expectedFilters);
  });
  
  Cypress.Commands.add('verifyPropertiesAccommodateGuests', (guestsCount) => {
    cy.get('.property-guests-count').each(($el) => {
      const count = parseInt($el.text().split(' ')[0]);
      expect(count).to.be.gte(guestsCount);
    });
  });
  
  Cypress.Commands.add('applyExtraFilters', (bedrooms, hasPool) => {
    cy.get('#more-filters').click();
    cy.get('#bedrooms').type(bedrooms);
    if (hasPool) {
      cy.get('#pool-facility').click();
    }
    cy.get('#show-stays').click();
  });
  
  Cypress.Commands.add('verifyPropertiesHaveBedrooms', (bedrooms) => {
    cy.get('.property-bedroom-count').each(($el) => {
      const count = parseInt($el.text());
      expect(count).to.be.gte(bedrooms);
    });
  });
  
  Cypress.Commands.add('openDetailsAndVerifyPoolOption', () => {
    cy.get('.property-card').first().click();
    cy.get('#amenities-tab').click();
    cy.get('#amenities-popup').should('include.text', 'Pool');
  });
  