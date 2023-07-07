const initMenuCodes = [
    {
        permissionName: 'Summary',
        checked: null,
        basicCode: 'SUMMARY',
        viewCode: 'SUMMARY_VIEW',
        editCode: 'SUMMARY_EDIT',
    },
    {
        permissionName: 'Activate Process',
        checked: null,
        basicCode: 'ACTIVATE_PROCESS',
        viewCode: 'ACTIVATE_PROCESS_VIEW',
        editCode: 'ACTIVATE_PROCESS_EDIT',
    },
    {
        permissionName: 'Company - Setting',
        checked: null,
        basicCode: 'COMPANY_SETTING',
        viewCode: 'COMPANY_SETTING_VIEW',
        editCode: 'COMPANY_SETTING_EDIT',
    },
    {
        permissionName: 'Company - Suspended',
        checked: null,
        basicCode: 'COMPANY_SUSPENDED',
        viewCode: 'COMPANY_SUSPENDED_VIEW',
        editCode: 'COMPANY_SUSPENDED_EDIT',
        parentBasicCode: 'COMPANY_SETTING'
    },
    {
        permissionName: 'Report',
        disableCode: 'VIEW',
        checked: null,
        basicCode: 'REPORT',
        viewCode: '',
        editCode: 'FLEXBEN_REPORT_EDIT',
    },
    {
        permissionName: 'FlexBen Summary',
        disableCode: 'VIEW',
        checked: null,
        basicCode: 'FLEXBEN_SUMMARY',
        viewCode: '',
        editCode: 'FLEXBEN_SUMMARY_EDIT',
    },
    {
        permissionName: 'FlexBen Top up',
        checked: null,
        basicCode: 'FLEXBEN_EXECUTE',
        viewCode: 'FLEXBEN_EXECUTE_VIEW',
        editCode: 'FLEXBEN_EXECUTE_EDIT',
    },
    {
        permissionName: 'FlexBen Settings',
        checked: null,
        basicCode: 'FLEXBEN_SETTING',
        viewCode: 'FLEXBEN_SETTING_VIEW',
        editCode: 'FLEXBEN_SETTING_EDIT',
    },
    {
        permissionName: 'Notice Settings',
        checked: null,
        basicCode: 'NOTICE',
        viewCode: 'NOTICE_VIEW',
        editCode: 'NOTICE_EDIT',
    },
    {
        permissionName: 'Holiday Settings',
        checked: null,
        basicCode: 'HOLIDAY',
        viewCode: 'HOLIDAY_VIEW',
        editCode: 'HOLIDAY_EDIT',
    },
    {
        permissionName: 'Account Settings',
        checked: null,
        basicCode: 'ACCOUNT',
        viewCode: 'ACCOUNT_VIEW',
        editCode: 'ACCOUNT_EDIT',
    },
    {
        permissionName: 'System Maintenance Settings',
        checked: null,
        basicCode: 'SYSTEM_MAINTENANCE',
        viewCode: 'SYSTEM_MAINTENANCE_VIEW',
        editCode: 'SYSTEM_MAINTENANCE_EDIT',
    },
    {
        permissionName: 'Admin Settings',
        checked: null,
        basicCode: 'ADMIN',
        viewCode: 'ADMIN_VIEW',
        editCode: 'ADMIN_EDIT',
    },
];

const getInitMenuCodes = () => initMenuCodes.map( c => Object.assign({}, c) ); // map( c=> {...c})

export {
    getInitMenuCodes
}