import LoginPage from '../support/pages/login-page'
import MenuPage from '../support/pages/menu-page'
import UserManagementPage from '../support/pages/user-management'

const loginPage = new LoginPage()
const menuPage = new MenuPage()
const userManagementPage = new UserManagementPage()

describe('Maintenance Release Suite', () => {
    it('Login to Deploy application', () => {
        loginPage.login('http://localhost:4516/', 'admin', 'admin')
        menuPage.navigateToExplorer()
        menuPage.navigateToUserManagement()
        var userName = userManagementPage.addUser()
        userManagementPage.navigateToRoles()
        var roleName = userManagementPage.addRoleToUser(userName)
        userManagementPage.navigateToPermissions()
        userManagementPage.assignPermissionsToRole(roleName)
    })
})