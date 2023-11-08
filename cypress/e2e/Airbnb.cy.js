/// <reference types="Cypress" />
const currentDate = new Date();
const checkInDate = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000); // One week later
const checkOutDate = new Date(checkInDate.getTime() + 7 * 24 * 60 * 60 * 1000); // One week after Check-In
describe('Airbnb Automation Tests', () => {
  beforeEach(() => {
    cy.visit('https://www.airbnb.com', { failOnStatusCode: false });
  });

  describe('Test 1: Verify that the results match the search criteria', () => {
    it('should apply filters and verify results', () => {
      // Perform search with specified criteria

      cy.searchProperties('Rome, Italy', checkInDate, checkOutDate, 2, 1);

      // Verify applied filters
      cy.verifyAppliedFilters('2 guests, 1 child');

      // Verify properties on the first page can accommodate selected guests
      cy.verifyPropertiesAccommodateGuests(2);
    });
  });

  describe('Test 2: Verify that the results and details page match the extra filters', () => {
    it('should apply additional filters and verify results', () => {
      cy.wait(5000);
      // Perform search with specified criteria
      cy.searchProperties('Rome, Italy', checkInDate, checkOutDate, 2, 1);

      // Apply additional filters
      cy.applyExtraFilters(5, true);

      // Verify properties on the first page have at least the selected number of bedrooms
      cy.verifyPropertiesHaveBedrooms(5);

      // Open details of the first property and verify 'Pool' option
      cy.openDetailsAndVerifyPoolOption();
    });
  });
});