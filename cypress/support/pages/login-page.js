export default class LoginPage {

    login(hostname, username, password) {
        cy.visit(hostname)
        cy.get('input[name=username]').clear().type(username)
        cy.get('input[name=password]').clear().type(password)
        cy.get('button[type=submit]').click()
    }

    navigateToExplorer() {
        cy.get('.icon-back').click({force: true});
    }

}