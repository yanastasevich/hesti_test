// a stub 
describe('Verify how application works with 1000 polygons on the map', () => {

    before(() => {
      // Run before all tests
      cy.performLogin();
      cy.visitMap();
    });

    it('Load 1000 polygonson the map', () => { 
      // add polygons data to a separate file
      // iterate over the dataset and add each polygon to the map
       
    });

    it('Check the loading time', () => { 
       // check that loading time is not more than 10000ms for example
    });
});
