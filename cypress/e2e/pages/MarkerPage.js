// page to include all elements and methods related to performing actions with the markers
class MarkerPage {
    elements = {
      editMarkerBtn: () => cy.getVisibleElement('#editMarkerBtn'),
      addMarkerBtn: () => cy.getVisibleElement('#addMarkerBtn'),
      deleteMarkerBtn: () => cy.getVisibleElement('#deleteMarkerBtn'),
      markerManagementTable: () => cy.getVisibleElement('#markersManagementTable'),
    };
  
    clickAddMarkerBtn() {
      this.elements.addMarkerBtn().click();
    }

    clickEditMarkerBtn() {
        this.elements.editMarkerBtn().click();
    }

    deleteAddMarkerBtn() {
        this.elements.deleteMarkerBtn().click();
    }

    // here i get the marker from the marker management table 
    // to performm actions with it like deleting, editing it in the marker management table
    getRowWithSpecificMarker(markerName){
        return markerManagementTable
          .contains('td', markerName)
          .should('exist')
          .parent('tr')
      }
  }
  
  export default new MarkerPage();
