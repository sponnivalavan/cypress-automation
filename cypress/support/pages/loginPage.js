export default class LoginPage {
    login(hostname, username, password) {
        cy.visit(hostname)
        cy.get('input[name=username]').should('be.visible').type(username)
        cy.get('input[name=password]').should('be.visible').type(password)
        cy.get('button[type=submit]').click({force: true});
    }

    logout() {
        cy.get('button[color="default"]').click()
        cy.get('.logOut > span:nth-child(2)').click()
    }
}