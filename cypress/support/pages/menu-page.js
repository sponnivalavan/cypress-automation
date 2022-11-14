export default class MenuPage {
    navigateToExplorer() {
        cy.get('.icon-back').click({force: true});
    }

    navigateToReports() {
        cy.contains('Reports').click({force: true});
    }

    navigateToPlugins() {
        cy.contains('Plugins').click({force: true});
    }

    navigateToUserManagement() {
        cy.contains('User management').click({force: true});
    }

}