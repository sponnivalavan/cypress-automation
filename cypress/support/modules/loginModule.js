import LoginPage from '../pages/loginPage'

const loginPage = new LoginPage()
export default class LoginModule {
    login(hostname, username, password) {
        loginPage.visit(hostname)
        loginPage.getLoginUserName().type(username)
        loginPage.getLoginPassword().type(password)
        loginPage.getLoginSubmit().click()
    }

    logout() {
        loginPage.getAvatarButton().click()
        loginPage.getLogout().click()
    }
}