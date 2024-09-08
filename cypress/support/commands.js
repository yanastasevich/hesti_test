// cypress/support/commands.js

Cypress.Commands.add('performLogin', (username, password) => {
  cy.visit('https://example.com/login');
  cy.get('input[name="username"]').type(username);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
});

Cypress.Commands.add('visitMap', () => {
  cy.visit('maps_url');
  cy.ensureElementVisible('#map');
});

Cypress.Commands.add('enterRegion', (region) => {
  cy.ensureElementVisibleAndInteract('#searchBarId', $el => {
    cy.wrap($el).type(region);
  });
});

Cypress.Commands.add('drawPolygon', (coordinates) => {
  cy.window().then((win) => {
    const googleMapsApi = win.google.maps; // Access the Google Maps API

    // Access the map instance from the window object (assuming it is globally accessible)
    const map = win.map; // Replace with the actual way to access your map instance

    // Activate the Drawing Manager (if not already active)
    if (!win.drawingManager) {
      win.drawingManager = new googleMapsApi.drawing.DrawingManager({
        drawingMode: googleMapsApi.drawing.OverlayType.POLYGON,
        drawingControl: false, // Disable control if not needed
        polygonOptions: {
          editable: true,
          draggable: true,
        },
      });
      win.drawingManager.setMap(map);
    }

    // Simulate clicks to draw the polygon
    coordinates.forEach(({ lat, lng }) => {
      const latLng = new googleMapsApi.LatLng(lat, lng);
      const event = new googleMapsApi.MapMouseEvent({
        latLng: latLng,
        // Additional event properties if needed
      });

      // Simulate a click event on the map
      googleMapsApi.event.trigger(map, 'click', event);
    });

    // Optionally, finalize the polygon drawing if needed
    // This depends on how your application handles polygon completion
    // You might need to simulate a click on a "Save" button or similar
  });
});

Cypress.Commands.add('ensureElementVisible', (selector, message = 'Element not found or not visible') => {
  cy.get(selector).should('exist').and('be.visible'); // Combined check
});

Cypress.Commands.add('ensureElementVisibleAndInteract', (selector, action, message = 'Unable to perform action, element not found') => {
  cy.get(selector)
    .should('exist')    // Ensure the element exists in the DOM
    .and('be.visible')  // Ensure the element is visible
    .then($el => {
      action($el);      // Perform the provided action (e.g., type, click)
    });
});

Cypress.Commands.add('verifyMapCenter', (expectedLat, expectedLng, tolerance = 0.1) => {
  cy.window().then(win => {
    const map = win.google.maps.Map; // Access the Google Maps Map instance
    const center = map.getCenter(); // Get the current center of the map
    const lat = center.lat();
    const lng = center.lng();

    expect(lat).to.be.closeTo(expectedLat, tolerance);
    expect(lng).to.be.closeTo(expectedLng, tolerance);
  });
});

Cypress.Commands.add('enableDrawingMode', () => {
  cy.ensureElementVisibleAndInteract('#drawPolygonBtn', $el => {
    cy.wrap($el).click();
  });

  cy.ensureElementVisible('#pencil');
});

Cypress.Commands.add('clickSavePolygon', () => {
  cy.ensureElementVisibleAndInteract('#savePolygon', $el => {
    cy.wrap($el).click();
  });
});

Cypress.Commands.add('verifyPolygonInManagement', (polygonName, expectedCoordinates) => {
  cy.ensureElementVisible('#polygonsManagementTable');

  cy.get('#polygonsManagementTable')
    .contains('td', polygonName)
    .should('exist')
    .parent('tr')
    .within(() => {
      cy.get('td')
        .eq(1)
        .should('contain.text', formattedCoordinates(expectedCoordinates));
    });
});

Cypress.Commands.add('deletePolygon', (polygonName) => {
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
});

/**
 * Custom command to verify a polygon on the Google Map
 * @param {Array} expectedCoordinates - Array of latitude and longitude pairs representing the polygon's vertices
 * @param {string} [message='Polygon is not drawn correctly'] - Optional custom message if the polygon is not found or incorrect
 */
Cypress.Commands.add('verifyPolygonOnMap', (expectedCoordinates, message = 'Polygon is not drawn correctly') => {
  cy.window().then(win => {
    const googleMapsApi = win.google.maps; // Access the Google Maps API
    const map = win.map; // Access your map instance (ensure this is set correctly in your app)

    // Find the polygons on the map
    const polygons = win.googleMapsApi.Polygon; // Adjust this based on how polygons are managed in your app

    if (polygons.length === 0) {
      cy.log(message);
      throw new Error(message);
    }

    const polygon = polygons[0]; // Get the first polygon (adjust if you have multiple polygons)

    // Verify polygon properties
    const actualCoordinates = polygon.getPath().getArray().map(coord => ({
      lat: coord.lat(),
      lng: coord.lng()
    }));

    actualCoordinates.forEach((coord, index) => {
      const expected = expectedCoordinates[index];
      expect(coord.lat).to.be.closeTo(expected.lat, 0.0001); // Adjust tolerance as needed
      expect(coord.lng).to.be.closeTo(expected.lng, 0.0001); // Adjust tolerance as needed
    });
  });
});
