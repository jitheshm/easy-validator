// EasyValidator.js

class EasyValidator {

    constructor() {
        this.errors = [];
        this.customRules = {};
    }


    addRule(ruleName, validationFunction) {
        this.customRules[ruleName] = validationFunction;
    }

    async validate(data, rules, customMessages = {}) {
        this.errors = [];

        try {


            for (const field in rules) {
                const fieldRules = rules[field].split('|');

                for (const rule of fieldRules) {

                    // const [ruleName, ruleValue] = rule.split(':');
                    let ruleName, ruleValue;
                    if (rule.includes(':')) {
                        [ruleName, ruleValue] = rule.split(':');
                    } else {
                        ruleName = rule;
                    }
                    const value = data[field];

                    if (this.customRules.hasOwnProperty(ruleName)) {
                        const validationFunction = this.customRules[ruleName];
                        const isValid = await validationFunction(value, ruleValue);
                        if (!isValid) {
                            this.errors.push(`Field '${field}' failed custom validation '${ruleName}'.`);
                        }
                        continue;
                    }


                    switch (ruleName) {
                        case 'required':
                            if (!value || typeof value === 'string' && value.trim() === '') {
                                this.errors.push(customMessages[field]?.[ruleName] || `Field '${field}' is required.`);
                            }
                            break;
                        case 'string':
                            if (typeof value !== 'string') {
                                this.errors.push(customMessages[field]?.[ruleName] || `Field '${field}' must be a string.`);
                            }
                            break;
                        case 'minLength':
                            if (value.length < parseInt(ruleValue)) {
                                this.errors.push(customMessages[field]?.[ruleName] || `Field '${field}' must be at least ${ruleValue} characters long.`);
                            }
                            break;
                        case 'maxLength':
                            if (value.length > parseInt(ruleValue)) {
                                this.errors.push(customMessages[field]?.[ruleName] || `Field '${field}' must not exceed ${ruleValue} characters.`);
                            }
                            break;
                        case 'alpha':
                            if (!/^[a-zA-Z]+$/.test(value)) {
                                this.errors.push(customMessages[field]?.[ruleName] || `Field '${field}' must contain only alphabetic characters.`);
                            }
                            break;
                        case 'alphaNumeric':
                            if (!/^[a-zA-Z0-9]+$/.test(value)) {
                                this.errors.push(customMessages[field]?.[ruleName] || `Field '${field}' must contain only alphanumeric characters.`);
                            }
                            break;
                        case 'format':
                            if (!new RegExp(ruleValue).test(value)) {
                                this.errors.push(customMessages[field]?.[ruleName] || `Field '${field}' does not match the required format.`);
                            }
                            break;
                        case 'number':
                            if (isNaN(value)) {
                                this.errors.push(customMessages[field]?.[ruleName] || `Field '${field}' must be a number.`);
                            }
                            break;
                        case 'min':
                            if (parseFloat(value) < parseFloat(ruleValue)) {
                                this.errors.push(customMessages[field]?.[ruleName] || `Field '${field}' must be greater than or equal to ${ruleValue}.`);
                            }
                            break;
                        case 'max':
                            if (parseFloat(value) > parseFloat(ruleValue)) {
                                this.errors.push(customMessages[field]?.[ruleName] || `Field '${field}' must be less than or equal to ${ruleValue}.`);
                            }
                            break;
                        case 'integer':
                            if (!Number.isInteger(value)) {
                                this.errors.push(customMessages[field]?.[ruleName] || `Field '${field}' must be an integer.`);
                            }
                            break;
                        case 'float':
                            if (!Number.isFinite(value)) {
                                this.errors.push(customMessages[field]?.[ruleName] || `Field '${field}' must be a float.`);
                            }
                            break;
                        case 'positive':
                            if (value <= 0) {
                                this.errors.push(customMessages[field]?.[ruleName] || `Field '${field}' must be a positive number.`);
                            }
                            break;
                        case 'negative':
                            if (value >= 0) {
                                this.errors.push(customMessages[field]?.[ruleName] || `Field '${field}' must be a negative number.`);
                            }
                            break;
                        case 'date':
                            if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
                                this.errors.push(customMessages[field]?.[ruleName] || `Field '${field}' must be in the format YYYY-MM-DD.`);
                            }
                            break;
                        case 'past':
                            if (new Date(value) >= new Date()) {
                                this.errors.push(customMessages[field]?.[ruleName] || `Field '${field}' must be a date in the past.`);
                            }
                            break;
                        case 'future':
                            if (new Date(value) <= new Date()) {
                                this.errors.push(`Field '${field}' must be a date in the future.`);
                            }
                            break;
                        case 'minLetters':
                            if (!/^[a-zA-Z]{3,}$/.test(value)) {
                                this.errors.push(customMessages[field]?.[ruleName] || `Field '${field}' must contain at least 3 letters.`);
                            }
                            break;
                        // Add more validation rules as needed
                        default:
                            break;
                    }
                }
            }
        } catch (error) {
            console.error('Error occurred during validation:', error);
            this.errors.push('An error occurred during validation.');
        }

        return this.errors.length === 0 ? null : this.errors;
    }
}

module.exports = EasyValidator;
