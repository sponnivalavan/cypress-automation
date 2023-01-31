import UserManagementPage from "../pages/userManagementPage";

const userManagementPage = new UserManagementPage()
export default class UserManagementPageModule {
    navigateToRoles() {
        userManagementPage.getLinkRoles().click()
    }

    navigateToPermissions() {
        userManagementPage.getLinkGlobalPermissions().click()
    }

    addUser() {
        userManagementPage.getButtonAddUser().click()
        userManagementPage.getButtonSave().should('be.disabled')
        var userName = this.generate_random_string(8)
        userManagementPage.getInputUserName().clear().type(userName)
        var password = userName + "U1"
        userManagementPage.getInputPassword().clear().type(password)
        userManagementPage.getInputConfirmPassword().clear().type(password)
        userManagementPage.getButtonSave().should('be.enabled')
        userManagementPage.getButtonSave().trigger('mouseover').click()
        console.log("password:" + password)
        return userName
    }

    addRole() {
        userManagementPage.getButtonAddRole().click()
        var roleName = this.generate_random_string(5)
        userManagementPage.getInputUserName().clear().type(roleName)
        userManagementPage.getButtonSave().should('be.visible')
        userManagementPage.getButtonSave().trigger('mouseover').click()
        return roleName
    }

    addRoleToUser(userName) {
        userManagementPage.getButtonAddRole().click()
        var roleName = this.generate_random_string(5)
        userManagementPage.getInputRoleName().clear().type(roleName)
        userManagementPage.getInputUserToRole().clear().type(userName)
        userManagementPage.getButtonSave().should('be.visible')
        userManagementPage.getButtonSave().trigger('mouseover').click()
        return roleName
    }

    assigndeployAdminReadRoleToUser(userName) {
        cy.wait(3000)
        userManagementPage.getLinkDeployAdminReadOnlyEdit().click()
        cy.wait(3000)
        userManagementPage.getInputUserToRole().clear().type(userName)
        userManagementPage.getButtonSaveDiaglogBox().click({force: true})
        cy.viewport(1400, 700)
        cy.wait(10000)
    }

    unassigndeployAdminReadRoleToUser() {
        cy.wait(3000)
        userManagementPage.getLinkDeployAdminReadOnlyEdit().click()
        cy.wait(3000)
        userManagementPage.getInputUnassignDeployAdminReadOnly().click({force: true})
        userManagementPage.getButtonSaveDiaglogBox().click({force: true})
        cy.viewport(1400, 700)
        cy.wait(10000)
    }

    assignPermissionsToRole(roleName) {
        for (let i = 2; i <= 14; i++) {
            if (i === 3 || i === 6 || i === 7 || i === 8) {
                continue;
            }
            cy.get(`.permissions-pagination-table-component-${roleName}-${i} > input:nth-child(1)`).click()
        }
        cy.wait(5000)
        userManagementPage.getButtonSavePermissions().should('be.visible')
        userManagementPage.getButtonSavePermissions().click({force: true});
    }

    assignLoginAndReportPermissionsToRole(roleName) {
        for (let i = 4; i <= 5; i++) {
            cy.get(`.permissions-pagination-table-component-${roleName}-${i} > input:nth-child(1)`).click()
        }
        cy.get('.save', {timeout: 10000}).should('be.visible')
        cy.get('.save').click({force: true});
    }

    assignInfraDirPerToRole(roleName) {
        for (let i = 1; i <= 3; i++) {
            cy.get(`.permissions-pagination-table-component-${roleName}-${i} > input:nth-child(1)`).click()
        }
        cy.contains('Save').click({force: true});
    }

    changePassword(userName) {
        cy.wait(3000)
        userManagementPage.getUserDetails(userName).click()
        cy.wait(3000)
        var password = userName + "P2"
        userManagementPage.getInputPassword().clear().type(password)
        userManagementPage.getInputConfirmPassword().clear().type(password)
        userManagementPage.getButtonSave().should('be.enabled')
        userManagementPage.getButtonSave().trigger('mouseover').click()
    }

    generate_random_string(string_length) {
        let random_string = '';
        let random_ascii;
        for (let i = 0; i < string_length; i++) {
            random_ascii = Math.floor((Math.random() * 25) + 97);
            random_string += String.fromCharCode(random_ascii)
        }
        return random_string
    }
}