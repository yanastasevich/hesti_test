/// <reference types="cypress" />
import polygonTestData from '../fixtures/polygonTestData.json';

const polygonCoordinatesEdgeCases = [
  {
    edgeCaseName: 'polygonCoordinatesOutOfRange',
    coordinates: polygonTestData.polygonCoordinatesOutOfRange
  },
  {
    edgeCaseName: 'polygonCoordinatesNonNumeric',
    coordinates: polygonTestData.polygonCoordinatesNonNumeric
  },
  {
    edgeCaseName: 'polygonCoordinatesNullOrEmpty',
    coordinates: polygonTestData.polygonCoordinatesNullOrEmpty
  }
];

describe('Verify how the system acts with incorrect polygons', () => {
  before(() => {
    cy.performLogin();
    cy.visitMap();
  });

  it('Click add polygon button', () => {
    cy.ensureElementVisibleAndInteract('#addFirstPolygon', $el => {
      cy.wrap($el).click();
    });
  });

  it('Click points dropdown', () => {
    cy.ensureElementVisibleAndInteract('#pointsDropDown', $el => {
      cy.wrap($el).click();
    });
  });

  polygonCoordinatesEdgeCases.forEach(({ edgeCaseName, coordinates }) => {
    it(`should handle ${edgeCaseName}`, () => {
      cy.get('#coordinatesTable').within(() => {
        coordinates.forEach((coordinate, index) => {
          const row = cy.get('tr').eq(index); // Assuming table rows correspond to coordinates

          // Clear existing values and input new coordinates
          row.find('input').eq(0).clear().type(coordinate.lat);  // Latitude input
          row.find('input').eq(1).clear().type(coordinate.lng);  // Longitude input
        });
      });

      cy.ensureElementVisibleAndInteract('#saveAndApplyBtn', $el => {
        cy.wrap($el).click();
      });

      // Check for red highlighting in the input fields
      coordinates.forEach((coordinate, index) => {
        const row = cy.get('#coordinatesTable tr').eq(index); // Row for the current coordinate

        // Check for red highlighting on latitude and longitude inputs
        row.find('input').eq(0).then($input => {
          if (coordinate.lat === null || coordinate.lat === '' || isNaN(coordinate.lat)) {
            cy.wrap($input).should('have.class', 'error'); // Adjust the class name as needed
          } else {
            cy.wrap($input).should('not.have.class', 'error');
          }
        });

        row.find('input').eq(1).then($input => {
          if (coordinate.lng === null || coordinate.lng === '' || isNaN(coordinate.lng)) {
            cy.wrap($input).should('have.class', 'error'); // Adjust the class name as needed
          } else {
            cy.wrap($input).should('not.have.class', 'error');
          }
        });
      });
    });
  });

  after(() => {
    cy.deletePolygon();
  });
});
