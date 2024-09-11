// Main page for the map, has map, search bar, polygons elements and methods
// Here I wanted to prioritise small functions that can be reused in more test suites
class MapPage {
    elements = {
      map: () => cy.window().its('map'), 
      searchBar: () => cy.getVisibleElement('#searchBar'),
      polygons: () => cy.window().its('google.maps.Polygon')
    };
  
    enterRegion(regionEntry) {
        this.elements.searchBar().type(regionEntry);
      }
    
      // getting actual map center is used to check whether the search bar displays entered location
      getActualMapCenter() {
          const map = win.map; 
          const center = map.getCenter(); 
          const actualLat = center.lat();
          const actualLng = center.lng();
    
          return { lat: actualLat, lng: actualLng }; 
        }
      
    // i included this method in the map page, because it has a lot of map elements involved
      drawPolygonOnTheMap(coordinates) {
        return cy.window().then(win => {
          const googleMapsApi = win.google.maps; 
          
          const map = win.map; 
    
          if (!win.drawingManager) {
            win.drawingManager = new googleMapsApi.drawing.DrawingManager({
              drawingMode: googleMapsApi.drawing.OverlayType.POLYGON,
              drawingControl: false, 
              polygonOptions: {
                editable: true,
                draggable: true,
              },
            });
            win.drawingManager.setMap(this.elements.map);
          }
    
          coordinates.forEach(({ lat, lng }) => {
            const latLng = new googleMapsApi.LatLng(lat, lng);
            googleMapsApi.event.trigger(this.elements.map, 'click', { latLng });
          });
    
        });
      }
    
      // get all polygons from the map
      // this method can be used to validate that the polygon was added
      getAllPolygonsFromTheMap() {
        return cy.window().then(win => {
          const polygons = win.google.maps.Polygon; 
    
          if (!polygons || polygons.length === 0) {
            cy.log('No polygons found on the map');
            throw new Error('No polygons found on the map');
          }
    
          return polygons; 
        });
      }
    }
  export default new MapPage();
  
