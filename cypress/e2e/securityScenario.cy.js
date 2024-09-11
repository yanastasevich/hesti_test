//stub
describe('Check for XSS attack in a name field', () => {

    before(() => {
      // Run before all tests
      cy.performLogin();
      cy.visitMap();
    });

    it('Add a polygon with a valid name and points', () => { 
         
    });
  
    it('Add a  XSS payload in polygon name', () => {
        
    });
      

    it('Ensure there is no alert for XSS triggered', () => { 
       
    });

    it('Ensure polygon name has not changed', () => { 
    });

});
