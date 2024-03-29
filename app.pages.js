
const HRnFLEX_SETTING = [ 'NOTICE_VIEW','NOTICE_EDIT'
                        ,'ACCOUNT_VIEW','ACCOUNT_EDIT'
                        ,'SYSTEM_MAINTENANCE_VIEW','SYSTEM_MAINTENANCE_EDIT'
                        ,'HOLIDAY_VIEW','HOLIDAY_EDIT'];

const ADMIN_SETTING = [ 'ADMIN_EDIT','ADMIN_VIEW'];

const COMPANY_SETTINGS = ['COMPANY_SETTING_VIEW', 'COMPANY_SETTING_EDIT'
                            , 'COMPANY_SUSPENDED_VIEW', 'COMPANY_SUSPENDED_EDIT']

const PAYROLL_SETTING = ['PAYROLL_VIEW', 'PAYROLL_EDIT'];

const SCHEDULE_SETTING = ['SCHEDULE_VIEW', 'SCHEDULE_EDIT'];

const pages = {
    index: {
        template: 'public/landing.html',
        title: 'HR Project',
    },
    'test_tools/message_q': {
        template: 'public/default.html',
        title: '[TEST] Message queue sender',
    },
    login: {
        template: 'public/default.html',
        title: 'Login',
    },
    'company/company_list': {
        template: 'public/default.html',
        title: 'Company',
        permission : COMPANY_SETTINGS
    },
    'company/company_registration': {
        template: 'public/default.html',
        title: 'Company',
        permission : ['ACTIVATE_PROCESS_EDIT']
    },
    'company/company_information': {
        template: 'public/default.html',
        title: 'Company information',
        permission : COMPANY_SETTINGS
    },
    'flexben/topup_deduct' : {
        template: 'public/default.html',
        title: 'Topup/Deduct History',
        permission :['FLEXBEN_EXECUTE_VIEW', 'FLEXBEN_EXECUTE_EDIT']
    },
    'flexben/topup_deduct/registering' : {
        template: 'public/default.html',
        title: 'Register Topup/Deduct',
        permission : ['FLEXBEN_EXECUTE_EDIT']
    },
    'flexben/topup_deduct/editRegistering' : {
        template: 'public/default.html',
        title: 'Edit Topup/Deduct',
        permission : ['FLEXBEN_EXECUTE_EDIT']
    },
    'flexben/settings' : {
        template: 'public/default.html',
        title: 'FlexBen Settings',
        permission : ['FLEXBEN_SETTING_VIEW', 'FLEXBEN_SETTING_EDIT']
    },
    'flexben/settings/product_setting/detail' : {
        template: 'public/default.html',
        title: 'Product Setting',
        permission : ['FLEXBEN_SETTING_VIEW', 'FLEXBEN_SETTING_EDIT']
    },
    'flexben/summary' : {
        template: 'public/default.html',
        title: 'FlexBen Summary',
        permission : ['FLEXBEN_SUMMARY_EDIT']
    },
    'inquiry' : {
        template: 'public/default.html',
        title: 'Inquiry',
        permission : ['ACTIVATE_PROCESS_VIEW', 'ACTIVATE_PROCESS_EDIT']
    },
    'payroll/payroll_settings' : {
        template: 'public/default.html',
        title: 'Payroll Settings',
        permission : PAYROLL_SETTING
    },
    'schedule' : {
        template: 'public/default.html',
        title: 'Schedule Settings',
        permission : SCHEDULE_SETTING
    },
    report : {
        template: 'public/default.html',
        title: 'Report',
        permission : ['FLEXBEN_REPORT_EDIT']
    },
    'settings/HRnFLEX_settings' : {
        template: 'public/default.html',
        title: 'HRnFLEX Settings',
        permission : HRnFLEX_SETTING
    },
    'settings/admin_setting' : {
        template: 'public/default.html',
        title: 'HRnFLEX Settings',
        permission : ADMIN_SETTING
    },
     admin_dashboard : {
        template: 'public/default.html',
        title: 'Summary',
        permission : []
	}
}


module.exports = pages;