/// <reference types="cypress" />
import polygonTestData from '../fixtures/polygonTestData.json';
import polygonPage from './pages/polygonPage';


// create page object model with my data, refactor
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

  it('Add the coordinates for the polygon', () => {
    cy.ensureElementVisibleAndInteract('#addFirstPolygon', $el => {
      cy.wrap($el).click();
    });
  });

  


  polygonCoordinatesEdgeCases.forEach(({ edgeCaseName, polygonCoordinatesEdgeCases }) => {
    it(`Add polygon coordinates based on ${edgeCaseName}`, () => {
      polygonPage.addNewPolygonCoordinates(polygonCoordinatesEdgeCases);
      polygonPage.clickSaveCoordinatesPolygonBtn();
    });

    polygonCoordinatesEdgeCases.forEach(({ polygonCoordinatesEdgeCases }) => {
      it('Verify the fields with wrong inputs highlight red', () => {
        const coordinateInput = polygonPage.getTheCoordinatesInputFields(polygonCoordinatesEdgeCases);
        if(coordinateInput.value === null || coordinateInput.value === '' || isNaN(coordinateInput.value)) {
          cy.get(coordinateInput).should('have.class', 'error'); 
        } else {
          cy.get(coordinateInput).should('not.have.class', 'error'); 
        }
      });

  });

  after(() => {
    polygonPage.deletePolygon();
  });
});
