export default class reportsPage {
    listDeployments = '[data-testid="sideNav-item-1"] > .dot-list-item-link > .MuiTypography-root'
    searchDeployments = '.deployment-task-filter-types > span:nth-child(1) > span:nth-child(2)'
    checkInitialDeployment = 'div.xl-react-autocomplete-suggestion:nth-child(1) > div:nth-child(1) > span:nth-child(1) > div:nth-child(1) > i:nth-child(2)'
    checkRollbackDeployment = 'div.xl-react-autocomplete-suggestion:nth-child(2) > div:nth-child(1) > span:nth-child(1) > div:nth-child(1) > i:nth-child(2)'
    checkUndeployDeployment = 'div.xl-react-autocomplete-suggestion:nth-child(3) > div:nth-child(1) > span:nth-child(1) > div:nth-child(1) > i:nth-child(2)'
    checkUpgradeDeployment = 'div.xl-react-autocomplete-suggestion:nth-child(4) > div:nth-child(1) > span:nth-child(1) > div:nth-child(1) > i:nth-child(2)'
    inputSearchDeployment = '.react-tagsinput-tag'
    clickBackToPage = 'body'
    tblDeploymentStatus = ':nth-child(1) > .report-table-type > .with-popup-content'
}