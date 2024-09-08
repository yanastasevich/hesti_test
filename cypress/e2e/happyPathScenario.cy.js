/// <reference types="cypress" />
import polygonTestData from '../fixtures/polygonTestData.json';

// Define helper functions outside of `it` blocks

describe('Happy Path Test Add Polygon', () => {
  before(() => {
    // Run before all tests
    cy.performLogin();
    cy.visitMap();
  });

  it('Enter and verify desired geographical region', () => {
    const { region, mapCenter } = polygonTestData;
    cy.enterRegion(region);
    cy.wait(2000);
    cy.verifyMapCenter(mapCenter.lat, mapCenter.lng);
  });

  it('Enable polygon drawing mode', () => {
    cy.enableDrawingMode(); // Fixed the method name
  });

  it('Draw a polygon', () => {
    const { region, mapCenter } = polygonTestData;
    cy.enterRegion(region);
    cy.wait(2000);
    cy.verifyMapCenter(mapCenter.lat, mapCenter.lng);
  });

  it('Save the polygon', () => {
    cy.clickSavePolygon();
  });

  it('Verify the polygon is displayed on the map', () => {
    const { polygonCoordinates } = polygonTestData;
    cy.verifyPolygonOnMap(polygonCoordinates);
    // Optionally, add code to verify a small sign at the center of the polygon coordinates
  });

  it('Verify the polygon is present in the polygon management', () => {
    const { polygonName } = polygonTestData; // Ensure `polygonName` is available in your test data
    cy.verifyPolygonInManagement(polygonName, polygonCoordinates);
  });

  after(() => {
    cy.deletePolygon(polygonTestData.polygonName); // Ensure `polygonName` is available in your test data
  });
});
