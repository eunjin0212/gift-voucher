// checked : ['NONE', 'VIEW', 'EDIT']
// apiLevelValue: ['ALL', 'SUB_DEPT', 'ONLY_DEPT']
const initMenuCodes = [
    {
        permissionName: 'Summary',
        checked: 'NONE',
        basicCode: 'SUMMARY',
        viewCode: 'SUMMARY_VIEW',
        editCode: 'SUMMARY_EDIT',
        showApicode: false
    },
    {
        permissionName: 'Activate Process',
        checked: 'NONE',
        basicCode: 'ACTIVATE_PROCESS',
        viewCode: 'ACTIVATE_PROCESS_VIEW',
        editCode: 'ACTIVATE_PROCESS_EDIT',
        showApicode: false
    },
    {
        permissionName: 'Company - Setting',
        checked: 'NONE',
        basicCode: 'COMPANY_SETTING',
        viewCode: 'COMPANY_SETTING_VIEW',
        editCode: 'COMPANY_SETTING_EDIT',
        showApicode: false
    },
    {
        permissionName: 'Company - Suspended',
        checked: 'NONE',
        basicCode: 'COMPANY_SUSPENDED',
        viewCode: 'COMPANY_SUSPENDED_VIEW',
        editCode: 'COMPANY_SUSPENDED_EDIT',
        showApicode: false
    },
    {
        permissionName: 'Report',
        disableCode: 'VIEW',
        checked: 'NONE',
        basicCode: 'REPORT',
        viewCode: '',
        editCode: 'REPORT_EDIT',
        showApicode: false
    },
    {
        permissionName: 'FlexBen Summary',
        disableCode: 'VIEW',
        checked: 'NONE',
        basicCode: 'FLEXBEN_SUMMARY',
        viewCode: '',
        editCode: 'FLEXBEN_SUMMARY_EDIT',
        showApicode: false
    },
    {
        permissionName: 'FlexBen Top up',
        checked: 'NONE',
        basicCode: 'FLEXBEN_EXECUTE',
        viewCode: 'FLEXBEN_EXECUTE_VIEW',
        editCode: 'FLEXBEN_EXECUTE_EDIT',
        showApicode: false
    },
    {
        permissionName: 'FlexBen Top up',
        checked: 'NONE',
        basicCode: 'FLEXBEN_EXECUTE',
        viewCode: 'FLEXBEN_EXECUTE_VIEW',
        editCode: 'FLEXBEN_EXECUTE_EDIT',
        showApicode: false
    },

];


const getInitMenuCodes = () => initMenuCodes.map(c=>Object.assign({}, c)); // map( c=> {...c})
export {
    getInitMenuCodes
}