export default class UserManagementPage {
    getButton() {
        return cy.get('button[type=button]')
    }

    getButtonAddUser() {
        return cy.contains('Add user')
    }

    getButtonSave() {
        return cy.get('.dialog-buttons > button:nth-child(1)')
    }

    getButtonSavePermissions() {
        return cy.get('button.save:nth-child(1)')
    }

    getButtonAddRole() {
        return cy.contains('Add role')
    }

    getInputUserName() {
        return cy.get('input[name=username]')
    }

    getInputPassword() {
        return cy.get('input[name=password]')
    }

    getInputConfirmPassword() {
        return cy.get('input[name=confirmPassword]')
    }

    getInputUserToRole() {
        return cy.get('div.xl-react-widget-tags:nth-child(2) > div:nth-child(2) > div:nth-child(1) > span:nth-child(1) > div:nth-child(2) > span:nth-child(1) > span:nth-child(2) > input:nth-child(1)')
    }

    getInputRoleName() {
        return cy.get('input[name=name]')
    }

    getLinkRoles() {
        return cy.contains('Roles')
    }

    getLinkGlobalPermissions() {
        return cy.contains('Global permissions')
    }

    getUserDetails(userName) {
        return cy.get('tr').filter(':contains(' + userName + ')').find('td').eq(1).find('button[class="edit table-action"]')
    }

    getLinkDeployAdminReadOnlyEdit() {
        return cy.contains('td', 'deploy_admin_read_only').siblings().contains('div', 'Edit')
    }

    getButtonSaveDiaglogBox() {
        return cy.get('.dialog-buttons > button:nth-child(1)')
    }

    getInputUnassignDeployAdminReadOnly() {
        return cy.get('.react-tagsinput-remove')
    }
}