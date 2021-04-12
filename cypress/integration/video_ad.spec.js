describe('Video AD', function () {
  beforeEach(() => {
    cy.viewport(360, 640); // galaxy s5
  });
  it('front page can be opened', function () {
    cy.visit('http://localhost:3000');
    cy.contains('VIS.X');
  });
  it('Video not playing when it is not in the viewport', function () {
    cy.visit('http://localhost:3000', {
      onBeforeLoad(win) {
        cy.stub(win.console, 'log').as('consoleLog');
      },
    });
    cy.get('@consoleLog').should('not.be.calledWith', 'The video has started');
  });
  it('When video is in viewport the output should show the video ad messages', function () {
    cy.visit('http://localhost:3000', {
      onBeforeLoad(win) {
        cy.stub(win.console, 'log').as('consoleLog');
      },
    });
    cy.get('.video').scrollIntoView().should('be.visible');
    cy.get('@consoleLog').should('be.calledWith', 'The video has started');
    cy.wait(2000);
    cy.get('@consoleLog').should('be.calledWith', "According to e IAB/MRC viewability standards, the video ad is viewable");
    cy.wait(5500);
    cy.get('@consoleLog').should('be.calledWith', "The video has played this percentage of the full length: ", 25, "%");
    cy.wait(7500);
    cy.get('@consoleLog').should('be.calledWith', "The video has played this percentage of the full length: ", 50, "%");
    cy.wait(7500);
    cy.get('@consoleLog').should('be.calledWith', "The video has played this percentage of the full length: ", 75, "%");
    cy.wait(7500);
    cy.get('@consoleLog').should('be.calledWith', "The video has played this percentage of the full length: ", 100, "%");
  });
})