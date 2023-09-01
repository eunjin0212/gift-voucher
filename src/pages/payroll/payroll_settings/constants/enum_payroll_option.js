import {PAYROLL_STANDARD_UNIT, PAYROLL_MONEY_TYPE, PAYROLL_TIME_UNIT} from "./enum_payroll_setting";

export const STANDARD_UNIT_OPTION = Object.freeze([
    {
        text: "Amount",
        value: PAYROLL_STANDARD_UNIT.AMOUNT
    },
    {
        text: "Percent",
        value: PAYROLL_STANDARD_UNIT.PERCENT
    },
    {
        text: "Day",
        value: PAYROLL_STANDARD_UNIT.DAY
    }
]);

export const TIME_UNIT_OPTION = Object.freeze([
    {
        text: "Per Year",
        value: PAYROLL_TIME_UNIT.PER_YEAR
    },
    {
        text: "Per Month",
        value: PAYROLL_TIME_UNIT.PER_MONTH
    },
    {
        text: "Per Day",
        value: PAYROLL_TIME_UNIT.PER_DAY
    }
]);

export const MONEY_TYPE_OPTION = Object.freeze([
    {
        text: "₱",
        value: PAYROLL_MONEY_TYPE.PESO
    },
    {
        text: "%",
        value: PAYROLL_MONEY_TYPE.PERCENT
    }
]);

export const TAX_CODE = Object.freeze({
    M : "M",
    M1 : "M1",
    M2 : "M2",
    M3 : "M3",
    M4 : "M4",
    S : "S",
    S1 : "S1",
    S2 : "S2",
    S3 : "S3",
    S4 : "S4",
    Z : "Z"
});