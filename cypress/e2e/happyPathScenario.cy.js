/// <reference types="cypress" />
import polygonTestData from '../fixtures/polygonTestData.json';
import mapPage from './pages/mapPage';
import polygonPage from './pages/polygonPage';


describe('Happy Path Test Add Polygon', () => {
  before(() => {
    cy.performLogin();
    cy.visitMap();
  });

  // it("") signifies a test step
  it('Enter and verify desired geographical region', () => {
    const { region, mapCenter } = polygonTestData;
    mapPage.enterRegion(region);
    cy.wait(2000);
    expect(mapPage.getActualMapCenter()).to.eq(mapCenter.lat, mapCenter.lng)
  });

  it('Draw a polygon', () => {
    const { polygonCoordinates } = polygonTestData;
    polygonPage.clickDrawPolygonBtn();
    mapPage.drawPolygonOnTheMap(polygonCoordinates);
    polygonPage.clickSaveDrawnPolygonBtn();
  });

  it('Verify the polygon is displayed on the map', () => {
    const { polygonCoordinates } = polygonTestData;
    expect(mapPage.getAllPolygonsFromTheMap[0].lat).to.eq(polygonCoordinates.lat)
    expect(mapPage.getAllPolygonsFromTheMap[0].lng).to.eq(polygonCoordinates.lng)
  });

  it('Verify the polygon is present in the polygon management', () => {
    const { polygonName, polygonCoordinates } = polygonTestData; 
    expect(polygonPage.fetchPolygonFromPolygonManagement(polygonName)).to.eq(polygonCoordinates)
  });

  // the polygon is added and deleted, clean up after the test
  after(() => {
    const { polygonName } = polygonTestData;
    polygonPage.deletePolygon(polygonName); 
  });
});
