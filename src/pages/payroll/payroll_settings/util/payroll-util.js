import { SETTING_TYPE, SETTING_MODE, SETTING_STATUS, PAYROLL_STANDARD_UNIT, PAYROLL_MONEY_TYPE } from "../constants/enum-payroll-setting";
import { STANDARD_UNIT_OPTION, TIME_UNIT_OPTION, MONEY_TYPE_OPTION } from "../constants/enum-payroll-option";
import moment from 'moment';

const payrollValidator = {
    invalidDecimal(min, max, epsilon, checkValue) {
        let greaterThanMin = (checkValue - min > epsilon) && (Math.abs(checkValue - min) > epsilon);
        let lessThanMax = (checkValue - max < epsilon) && (Math.abs(checkValue - max) > epsilon);
        return !greaterThanMin || !lessThanMax;
    },
    invalidString(str) {
        return typeof str === "undefined" || str === null || str === "";
    },
    invalidSettingStatus(value) {
        if (!Object.values(SETTING_STATUS).includes(value)) {
            alert("[SettingStatus] value is strange. Please contact support team for assistance.");
            console.log(Object.values(SETTING_STATUS));
            console.log(value);
            return true;
        }
        return false;
    },
    invalidSettingType(value) {
        if (!Object.values(SETTING_TYPE).includes(value)) {
            alert("[SettingType] value is strange. Please contact support team for assistance.");
            console.log(Object.values(SETTING_TYPE));
            console.log(value);
            return true;
        }
        return false;
    },
    invalidStandardUnitOption(value) {
        for (let i = 0; i < STANDARD_UNIT_OPTION.length; ++i) {
            if (STANDARD_UNIT_OPTION[i].value === value) {
                return false;
            }
        }

        alert("[STANDARD_UNIT_OPTION] value is strange. Please select correct unit option");
        console.log(Object.values(STANDARD_UNIT_OPTION));
        console.log(value);
        return true;
    },
    invalidTimeUnitOption(value) {
        for (let i = 0; i < TIME_UNIT_OPTION.length; ++i) {
            if (TIME_UNIT_OPTION[i].value === value) {
                return false;
            }
        }
        alert("[TIME_UNIT_OPTION] value is strange. Please select correct time unit option");
        console.log(Object.values(TIME_UNIT_OPTION));
        console.log(value);
        return true;
    },
    invalidMoneyTypeOption(value) {
        for (let i = 0; i < MONEY_TYPE_OPTION.length; ++i) {
            if (MONEY_TYPE_OPTION[i].value === value) {
                return false;
            }
        }
        alert("[MONEY_TYPE_OPTION] value is strange. Please select correct money type option");
        console.log(Object.values(MONEY_TYPE_OPTION));
        console.log(value);
        return true;
    },
    invalidStartDateTime(startDateTime, startDateTimeLowerLimit) {
        if (moment(startDateTimeLowerLimit, "YYYY-MM-DD HH:mm:ss").isAfter(moment(startDateTime, "YYYY-MM-DD HH:mm:ss"), 'day')) {
            console.log("startDate must be after toDay!");
            return true;
        }
        return false;
    },
    isEmpty(value){
        return value == "" || value == null || value == undefined || (value != null && typeof value == "object" && !Object.keys(value).length);
    },
    isReadMode(value) {
        return SETTING_MODE.READ === value;
    },
    isInsertMode(value) {
        return SETTING_MODE.INSERT === value;
    },
    isDetailMode(value) {
        return SETTING_MODE.DETAIL === value;
    },
    isEditMode(value) {
        return SETTING_MODE.EDIT === value;
    },
    isPremiumRate(value) {
        return SETTING_TYPE.PREMIUM_RATE === value;
    },
    isDeMinimisBenefits(value) {
        return SETTING_TYPE.DE_MINIMIS_BENEFITS === value;
    },
    isSSS(value) {
        return SETTING_TYPE.SSS === value;
    },
    isPhilHealth(value) {
        return SETTING_TYPE.PHIL_HEALTH === value;
    },
    isPagIBig(value) {
        return SETTING_TYPE.PAG_IBIG === value;
    },
    isWTAX(value) {
        return SETTING_TYPE.WTAX === value;
    },
    isAnnualTaxTable(value) {
        return SETTING_TYPE.ANNUAL_TAX_TABLE === value;
    },
    isMinimumWage(value) {
        return SETTING_TYPE.MINIMUM_WAGE === value;
    }
};

const payrollDateTimeConverter = {
    convertToDateTimeForViewFormat(date, format = "MM/DD/yyyy[\r\n]hh:mm:ss"){
        if(!date) {
            return;
        }
        return moment(date).format(format);
    },
    convertToDateForInputFormat(date, format= "MM/DD/yyyy") {
        if(!date) {
            return;
        }
        return moment(date).format(format);
    },
    convertToDateTimeForServerFormat(date) {
        if (!date) {
            return;
        }
        return moment(date).hours(0).minutes(0).seconds(0).format('YYYY-MM-DD HH:mm:ss');
    }
};

const payrollStringMaker = {
    getSettingStatus(startDateTime, endDateTime) {
        // 종료 날짜가 null일 때
        if (endDateTime == null) {
            // 시작날짜가 오늘 이후일 때
            if (moment(startDateTime).isAfter(moment())) {
                return SETTING_STATUS.SCHEDULED;
            }
            return SETTING_STATUS.APPLIED;
        }

        // console.log("now : " + moment().format());
        // console.log("startDateTime : " + moment(startDateTime).format());
        // console.log("endDateTime : " + moment(endDateTime).format());
        // 종료 날짜가 null이 아닐 때
        // 종료 날짜가 오늘이거나 오늘 이후일 때
        if (moment(endDateTime).isSame(moment(), 'day') || moment(endDateTime).isAfter(moment(), 'day')) {
            return SETTING_STATUS.APPLIED;
        }

        return SETTING_STATUS.EXPIRED;
    },
    makeStandardUnitString(value) {
        let result = "";
        switch(value) {
            case PAYROLL_STANDARD_UNIT.AMOUNT:
                result = " PHP";
                break;
            case PAYROLL_STANDARD_UNIT.PERCENT:
                result = "%";
                break;
            default:
                break;
        }

        return result;
    },
    makeMoneyTypeString(value) {
        let result = "";
        switch(value) {
            case PAYROLL_MONEY_TYPE.PERCENT:
                result = "%";
                break;
            default:
                break;
        }
        return result;
    },
    fitDecimalFormatWithComma(value, fraction = 2) {
        if (value == null || Number.isNaN(value)) {
            return value;
        }
        var regexp = /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g;
        return Number.parseFloat(value).toFixed(fraction).toString().replace(regexp, ',')
    }
};


export {
    payrollValidator,
    payrollDateTimeConverter,
    payrollStringMaker
};