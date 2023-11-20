export const SETTING_MODE = Object.freeze({
    READ : "read",
    INSERT : "insert",
    DETAIL : "detail",
    EDIT : "edit"
});

export const SETTING_STATUS = Object.freeze({
    EXPIRED : "Expired",
    APPLIED : "Applied",
    SCHEDULED : "Scheduled"
});

export const SETTING_TYPE = Object.freeze({
    PREMIUM_RATE : "PREMIUM_RATE",
    DE_MINIMIS_BENEFITS : "DE_MINIMIS_BENEFITS",
    SSS : "SSS",
    PHIL_HEALTH : "PHIL_HEALTH",
    PAG_IBIG : "PAG_IBIG",
    WTAX : "WTAX"
});

export const PAYROLL_HOUR_TYPE = Object.freeze({
    BASIC_WORK_HRS : "BASIC_WORK_HRS",
    OVERTIME : "OVERTIME",
    NIGHT_SHIFT : "NIGHT_SHIFT",
    NIGHT_SHIFT_AND_OVERTIME : "NIGHT_SHIFT_AND_OVERTIME"
});

export const PAYROLL_STANDARD_UNIT = Object.freeze({
    AMOUNT : "AMOUNT",
    PERCENT : "PERCENT",
    DAY : "DAY"
});

export const PAYROLL_TIME_UNIT = Object.freeze({
    PER_YEAR : "PER_YEAR",
    PER_MONTH : "PER_MONTH",
    PER_DAY : "PER_DAY"
});

export const PAYROLL_MONEY_TYPE = Object.freeze({
    PESO : "PESO",
    PERCENT : "PERCENT"
});

export const TAX_FREQUENCY = Object.freeze({
    DAILY : "DAILY",
    WEEKLY : "WEEKLY",
    SEMI_MONTHLY : "SEMI_MONTHLY",
    MONTHLY : "MONTHLY"
});