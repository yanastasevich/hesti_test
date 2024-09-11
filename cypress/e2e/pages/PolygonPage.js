class PolygonPage {
    elements = {
      drawPolygonBtn: () => cy.getVisibleElement('#drawPolygonBtn'),
      saveDrawnPolygonBtn: () => cy.getVisibleElement('#saveDrawnPolygonBtn'),
      addFirstPolygonBtn: () => cy.getVisibleElement('#addFirstPolygonBtn'),
      saveCoordinatesPolygonBtn: () => cy.getVisibleElement('#saveCoordinatesPolygonBtn'),
      polygonManagementTable: () => cy.ensureElementVisible('#polygonsManagementTable')
    };
  
    clickDrawPolygonBtn() {
      this.elements.drawPolygonBtn().click();
    }
  
    clickSaveDrawnPolygonBtn() {
      this.elements.saveDrawnPolygonBtn().click();
    }
  
    clickAddFirstPolygonBtn() {
      this.elements.addFirstPolygonBtn().click();
    }
  
    clickSaveCoordinatesPolygonBtn() {
      this.elements.saveCoordinatesPolygonBtn().click();
    }
  
    getRowWithSpecificMarker(polygonName) {
      cy.ensureElementVisible('#polygonsManagementTable');
      return cy.get('#polygonsManagementTable')
        .contains('td', polygonName)
        .should('exist')
        .parent('tr');
    }
  
    deletePolygon(polygonName) {
      cy.get('#polygon-table')
        .contains('td', polygonName)
        .parent('tr')
        .find('td')
        .eq(2)
        .find('.action-button')
        .click();
  
      cy.get('.dropdown-menu')
        .contains('Delete')
        .click();
    }
  
    fetchPolygonFromPolygonManagement(polygonName) {
      return this.elements.polygonManagementTable()
        .contains('td', polygonName)
        .should('exist')
        .parent('tr')
        .within(() => {
          cy.get('td').eq(1);
        });
    }
  
    addNewPolygonCoordinates(polygonCoordinates) {
      cy.get('#coordinatesTable').within(() => {
        polygonCoordinates.forEach((coordinate, index) => {
          const row = cy.get('tr').eq(index);
  
          row.find('input').eq(0).clear().type(coordinate.lat);
          row.find('input').eq(1).clear().type(coordinate.lng);
        });
      });
    }
  
    getTheCoordinatesInputFields(polygonCoordinates) {
        polygonCoordinates.forEach((coordinate, index) => {
           const row = cy.get('#coordinatesTable tr').eq(index); 
           return row.find('input');
        });
      }
  }
  
  export default new PolygonPage();
  
