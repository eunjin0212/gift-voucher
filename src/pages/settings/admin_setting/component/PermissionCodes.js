// checked : ['NONE', 'VIEW', 'EDIT']
// apiLevelValue: ['ALL', 'SUB_DEPT', 'ONLY_DEPT']
const initMenuCodes = [
    {
        permissionName: 'Summary',
        checked: 'NONE',
        basicCode: 'SUMMARY',
        viewCode: 'SUMMARY_VIEW',
        editCode: 'SUMMARY_EDIT',
    },
    {
        permissionName: 'Activate Process',
        checked: 'NONE',
        basicCode: 'ACTIVATE_PROCESS',
        viewCode: 'ACTIVATE_PROCESS_VIEW',
        editCode: 'ACTIVATE_PROCESS_EDIT',
    },
    {
        permissionName: 'Company - Setting',
        checked: 'NONE',
        basicCode: 'COMPANY_SETTING',
        viewCode: 'COMPANY_SETTING_VIEW',
        editCode: 'COMPANY_SETTING_EDIT',
    },
    {
        permissionName: 'Company - Suspended',
        checked: 'NONE',
        basicCode: 'COMPANY_SUSPENDED',
        viewCode: 'COMPANY_SUSPENDED_VIEW',
        editCode: 'COMPANY_SUSPENDED_EDIT',
    },
    {
        permissionName: 'Report',
        disableCode: 'VIEW',
        checked: 'NONE',
        basicCode: 'REPORT',
        viewCode: '',
        editCode: 'REPORT_EDIT',
    },
    {
        permissionName: 'FlexBen Summary',
        disableCode: 'VIEW',
        checked: 'NONE',
        basicCode: 'FLEXBEN_SUMMARY',
        viewCode: '',
        editCode: 'FLEXBEN_SUMMARY_EDIT',
    },
    {
        permissionName: 'FlexBen Top up',
        checked: 'NONE',
        basicCode: 'FLEXBEN_EXECUTE',
        viewCode: 'FLEXBEN_EXECUTE_VIEW',
        editCode: 'FLEXBEN_EXECUTE_EDIT',
    },
    {
        permissionName: 'FlexBen Settings',
        checked: 'NONE',
        basicCode: 'FLEXBEN_SETTING',
        viewCode: 'FLEXBEN_SETTING_VIEW',
        editCode: 'FLEXBEN_SETTING_EDIT',
    },
    {
        permissionName: 'Notice Settings',
        checked: 'NONE',
        basicCode: 'NOTICE',
        viewCode: 'NOTICE_VIEW',
        editCode: 'NOTICE_EDIT',
    },
    {
        permissionName: 'Holiday Settings',
        checked: 'NONE',
        basicCode: 'HOLIDAY',
        viewCode: 'HOLIDAY_VIEW',
        editCode: 'HOLIDAY_EDIT',
    },
    {
        permissionName: 'Account Settings',
        checked: 'NONE',
        basicCode: 'ACCOUNT',
        viewCode: 'ACCOUNT_VIEW',
        editCode: 'ACCOUNT_EDIT',
    },
    {
        permissionName: 'System Maintenance Settings',
        checked: 'NONE',
        basicCode: 'SYSTEM_MAINTENANCE',
        viewCode: 'SYSTEM_MAINTENANCE_VIEW',
        editCode: 'SYSTEM_MAINTENANCE_EDIT',
    },
    {
        permissionName: 'Admin Settings',
        checked: 'NONE',
        basicCode: 'ADMIN',
        viewCode: 'ADMIN_VIEW',
        editCode: 'ADMIN_EDIT',
    },
];

const getInitMenuCodes = () => initMenuCodes.map( c => Object.assign({}, c) ); // map( c=> {...c})

export {
    getInitMenuCodes
}