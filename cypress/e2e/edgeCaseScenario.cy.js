/// <reference types="cypress" />
import polygonTestData from '../fixtures/polygonTestData.json';
import polygonPage from './pages/polygonPage';

// import my test coordinates from the test data json file
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


// filling the coordinates for all of the edge cases
  polygonCoordinatesEdgeCases.forEach(({ edgeCaseName, coordinates }) => {
    it(`Add polygon coordinates based on ${edgeCaseName}`, () => {
      polygonPage.addNewPolygonCoordinates(coordinates);
      polygonPage.clickSaveCoordinatesPolygonBtn();
    });

    // for each edge case name, making sure that the fields are highlighted with red
    it(`Verify the fields with wrong inputs highlight red for ${edgeCaseName}`, () => {
      coordinates.forEach(coordinate => {
        const coordinateInput = polygonPage.getTheCoordinatesInputField(coordinate);
        if(coordinate === null || coordinate === '' || isNaN(coordinate)) {
          cy.get(coordinateInput).should('have.class', 'error');
        } else {
          cy.get(coordinateInput).should('not.have.class', 'error');
        }
      });
    });
  });

  after(() => {
    polygonPage.deletePolygon();
  });
});
