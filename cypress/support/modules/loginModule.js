import LoginPage from '../pages/loginPage'

const loginPage = new LoginPage()
export default class LoginModule {

    login(hostname, username, password) {
        cy.visit(hostname)
        cy.get(loginPage.inputBoxUserName).should('be.visible').type(username)
        cy.get(loginPage.inputBoxPassword).should('be.visible').type(password)
        cy.get(loginPage.buttonSubmit).click({force: true})
    }

    logout() {
        cy.get(loginPage.buttonAvatar).click()
        cy.get(loginPage.linklogout).click()
    }
}