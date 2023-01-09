import UserManagementPage from "../pages/userManagementPage";

const userManagementPage = new UserManagementPage()
export default class UserManagementPageModule {
    navigateToRoles() {
        cy.contains(userManagementPage.linkRoles).click({force: true});
    }

    navigateToPermissions() {
        cy.contains(userManagementPage.linkGlobalPermissions).click({force: true});
    }

    addUser() {
        cy.contains(userManagementPage.buttonAddUser).click({force: true});
        var userName = this.generate_random_string(8)
        cy.get(userManagementPage.inputUserName).clear().type(userName)
        var password = userName + "U1"
        cy.get(userManagementPage.inputPassword).clear().type(password)
        cy.get(userManagementPage.inputConfirmPassword).clear().type(password)
        cy.get(userManagementPage.buttonSave).should('be.visible')
        cy.get(userManagementPage.buttonSave).trigger('mouseover').click();
        return userName
    }

    addRole() {
        cy.contains(userManagementPage.buttonAddRole).click({force: true});
        var roleName = this.generate_random_string(5)
        cy.get(userManagementPage.inputUserName).clear().type(roleName)
        cy.get(userManagementPage.buttonSave).should('be.visible')
        cy.get(userManagementPage.buttonSave).trigger('mouseover').click();
        return roleName
    }

    addRoleToUser(userName) {
        cy.contains(userManagementPage.buttonAddRole).click({force: true});
        var roleName = this.generate_random_string(5)
        cy.get(userManagementPage.inputRoleName).clear().type(roleName)
        cy.get(userManagementPage.inputUsertoRole).clear().type(userName)
        cy.get(userManagementPage.buttonSave).should('be.visible')
        cy.get(userManagementPage.buttonSave).trigger('mouseover').click();
        return roleName
    }

    assigndeployAdminReadRoleToUser(userName) {
        cy.wait(3000)
        cy.contains('td', 'deploy_admin_read_only').siblings().contains('div', 'Edit').click()
        cy.wait(3000)
        cy.get(userManagementPage.inputUsertoRole).clear().type(userName)
        cy.get('.dialog-buttons > button:nth-child(1)').click({force: true});
        cy.viewport(1400, 700)
        cy.wait(10000)
    }

    unassigndeployAdminReadRoleToUser() {
        cy.wait(3000)
        cy.contains('td', 'deploy_admin_read_only').siblings().contains('div', 'Edit').click()
        cy.wait(3000)
        cy.get('.react-tagsinput-remove').click({force: true});
        cy.get('.dialog-buttons > button:nth-child(1)').click({force: true});
        cy.viewport(1400, 700)
        cy.wait(10000)
    }

    assignPermissionsToRole(roleName) {
        cy.get(`.permissions-pagination-table-component-${roleName}-2 > input:nth-child(1)`).click()
        cy.get(`.permissions-pagination-table-component-${roleName}-4 > input:nth-child(1)`).click()
        cy.get(`.permissions-pagination-table-component-${roleName}-5 > input:nth-child(1)`).click()
        cy.get(`.permissions-pagination-table-component-${roleName}-9 > input:nth-child(1)`).click()
        cy.get(`.permissions-pagination-table-component-${roleName}-10 > input:nth-child(1)`).click()
        cy.get(`.permissions-pagination-table-component-${roleName}-11 > input:nth-child(1)`).click()
        cy.get(`.permissions-pagination-table-component-${roleName}-12 > input:nth-child(1)`).click()
        cy.get(`.permissions-pagination-table-component-${roleName}-13 > input:nth-child(1)`).click()
        cy.get(`.permissions-pagination-table-component-${roleName}-14 > input:nth-child(1)`).click()
        cy.get(userManagementPage.buttonSavePermissions, {timeout: 10000}).should('be.visible')
        cy.get(userManagementPage.buttonSavePermissions).click({force: true});
    }

    assignLoginAndReportPermissionsToRole(roleName) {
        cy.get(`.permissions-pagination-table-component-${roleName}-4 > input:nth-child(1)`).click()
        cy.get(`.permissions-pagination-table-component-${roleName}-5 > input:nth-child(1)`).click()
        cy.get('.save', {timeout: 10000}).should('be.visible')
        cy.get('.save').click({force: true});
    }

    assignInfraDirPerToRole(roleName) {
        cy.get(`.permissions-pagination-table-component-${roleName}-1 > input:nth-child(1)`).click()
        cy.get(`.permissions-pagination-table-component-${roleName}-2 > input:nth-child(1)`).click()
        cy.get(`.permissions-pagination-table-component-${roleName}-3 > input:nth-child(1)`).click()
        cy.contains('Save').click({force: true});
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