export default class LoginPage {
    visit(hostname) {
        return cy.visit(hostname)
    }

    getAuthMessage() {
        return cy.get('.auth-message')
    }

    getLoginUserName() {
        return cy.get("input[name=username]")
    }

    getLoginPassword() {
        return cy.get("input[name=password]")
    }

    getLoginSubmit() {
        return cy.get('button[type=submit]')
    }

    getAvatarButton() {
        return cy.get('span.dot-typography')
    }

    getLogout() {
        return cy.get('.logOut > span:nth-child(2)')
    }
}