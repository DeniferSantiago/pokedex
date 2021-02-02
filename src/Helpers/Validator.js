/**
 * @param {Number} val
 * @param {Number} max
 * @param {String} msg
 */
export const Max = (val, max, msg) => {
    if (Number(val))
        return val < max || msg || `El valor debe ser menor a ${max}`;
    else throw new Error(`El valor ${val} no es un numero. En MaxValidator`);
};
/**
 * @param {Number} val
 * @param {Number} max
 * @param {String} msg
 */
export const Min = (val, min, msg) => {
    if (Number(val))
        return val > min || msg || `El valor debe ser mayor a ${min}`;
    else throw new Error(`El valor ${val} no es un numero. En MinValidator`);
};
export const Range = (val, min, max, msg) =>
    (Max(val, max, msg) === true && Min(val, min, msg) === true) ||
    msg ||
    `El valor debe ser mayor a ${min} y menor a ${max}.`;
/**
 * @param {String} val
 * @param {String} msg
 */
export const NoSpaces = (val, msg) => {
    if (val && typeof val === "string")
        return val.indexOf(" ") === -1
            ? true
            : msg || "No se permiten los espacios";
    else throw new Error(`El valor ${val} no es un String. En NoSpaces`);
};
/**
 * @param {String} val;
 * @param {Boolean} spaces;
 * @param {Boolean} numbers;
 */
const AlphaNumericValidator = (val, spaces, numbers) => {
    if (val && typeof val === "string") {
        var regex;
        if (spaces)
            regex = RegExp(numbers ? /^[A-Za-z 0-9]+$/ : /^[A-Za-z ]+$/);
        else if (numbers) regex = RegExp(/^[A-Za-z0-9]+$/);
        else regex = RegExp(/^[A-Za-z]+$/);
        return regex.test(val);
    } else
        throw new Error(
            `El valor ${val} no es un String. En AlphaNumericValidator.`
        );
};
/**
 * @param {String} val
 * @param {String} msg
 */
export const OnlyAlphabet = (val, msg) =>
    AlphaNumericValidator(val, false, false) ||
    msg ||
    "Solo se permiten valores con carácteres del alfabeto.";
/**
 * @param {String} val
 * @param {String} msg
 */
export const OnlyAlphabetSpaces = (val, msg) =>
    AlphaNumericValidator(val, true, false) ||
    msg ||
    "Solo se permiten valores con carácteres del alfabeto y espacios.";
/**
 * @param {String} val
 * @param {String} msg
 */
export const OnlyAlphaNumeric = (val, msg) =>
    AlphaNumericValidator(val, false, true) ||
    msg ||
    "Solo se permiten valores alfanumericos(letras y numeros).";
/**
 * @param {String} val
 * @param {String} msg
 */
export const OnlyAlphaNumericSpaces = (val, msg) =>
    AlphaNumericValidator(val, true, true) ||
    msg ||
    "Solo se permiten valores alfanumericos(letras y numeros) y espacios.";
/**
 * @param {String} val
 * @param {Number} cant
 * @param {String} msg
 */
export const MinRequiredNumbers = (val, cant, msg) => {
    if (val && typeof val === "string") {
        let isValid = (val.match(/\d/g) || []).length >= (cant ?? 1);
        return (
            isValid ||
            msg ||
            `El valor debe contener por lo menos ${cant} numeros.`
        );
    } else
        throw new Error(
            `El valor ${val} no es un String. En MinRequiredNumbers.`
        );
};
/**
 * @param {String} val
 * @param {Number} length
 * @param {Boolean} min
 */
const MaxOrMinLength = (val, length, min) => {
    if (val && typeof val === "string")
        return min ? val.length >= length : val.length <= length;
    else throw new Error(`El valor ${val} no es un String. En MaxOrMinLength.`);
};
/**
 * @param {String} val
 * @param {Number} maxLength
 * @param {String} msg
 */
export const MaxLength = (val, maxLength, msg) =>
    MaxOrMinLength(val, maxLength, false) ||
    msg ||
    `El valor debe contener menos de ${maxLength} carácteres.`;
/**
 * @param {String} val
 * @param {Number} maxLength
 * @param {String} msg
 */
export const MinLength = (val, minLength, msg) =>
    MaxOrMinLength(val, minLength, true) ||
    msg ||
    `El valor debe contener mas de ${minLength} carácteres.`;
/**
 * @param {String} val
 * @param {Number} minLength
 * @param {Number} maxLength
 * @param {String} msg
 */
export const RangeLength = (val, minLength, maxLength, msg) =>
    (MaxOrMinLength(val, maxLength, false) &&
        MaxOrMinLength(val, minLength, true)) ||
    msg ||
    `El valor debe contener entre ${minLength} y ${maxLength} carácteres.`;
/**
 * @param {String} val
 * @param {String} msg
 */
export const Email = (val, msg) => {
    if (val && typeof val === "string")
        return (
            RegExp(/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/).test(
                val
            ) ||
            msg ||
            "El valor debe ser un correo electrónico válido."
        );
    else throw new Error(`El valor ${val} no es un String. En Email.`);
};
/**
 * @param {String} val
 * @param {String} msg
 */
export const PhoneNumber = (val, msg) => {
    if (val && typeof val === "string")
        return (
            RegExp(/^(\+1 )?8(0|2|4)9(-| )[0-9]{3}(-| )[0-9]{4}$/).test(val) ||
            msg ||
            "El valor debe ser un numero telefónico válido."
        );
    else throw new Error(`El valor ${val} no es un String. En PhoneNumber.`);
};
export const Url = (val, msg) => {
    if (val && typeof val === "string")
        return (
            RegExp(
                /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gm
            ).test(val) ||
            msg ||
            "El valor debe ser una url(link) válido."
        );
    else throw new Error(`El valor ${val} no es un String. En PhoneNumber.`);
};
export const allRules = {
    Email,
    RangeLength,
    MinLength,
    MaxLength,
    Min,
    Max,
    MinRequiredNumbers,
    NoSpaces,
    OnlyAlphabet,
    OnlyAlphabetSpaces,
    OnlyAlphaNumeric,
    OnlyAlphaNumericSpaces,
    PhoneNumber,
    Range,
    Url
};
export const allRulesName = {
    Email: "Email",
    RangeLength: "RangeLength",
    MinLength: "MinLength",
    MaxLength: "MaxLength",
    Min: "Min",
    Max: "Max",
    MinRequiredNumbers: "MinRequiredNumbers",
    NoSpaces: "NoSpaces",
    OnlyAlphabet: "OnlyAlphabet",
    OnlyAlphabetSpaces: "OnlyAlphabetSpaces",
    OnlyAlphaNumeric: "OnlyAlphaNumeric",
    OnlyAlphaNumericSpaces: "OnlyAlphaNumericSpaces",
    PhoneNumber: "PhoneNumber",
    Range: "Range",
    Url: "Url"
};
/**
 * @param {Object} values
 * @param {Constraint[]} constraints
 * @param {Boolean} multipleErrors
 */
export const ValidateAll = (values, constraints, multipleErrors = false) => {
    var errorsMap = {};
    constraints.forEach(c => {
        const val = values[c.name];
        let errors = errorsMap[c.name];
        errors = errors ?? [];
        if (c.isRequired && !val) {
            errors.push(
                new ValidateError(
                    c.name,
                    "Este campo es obligatorio",
                    "Required"
                )
            );
        } else if (val) {
            const result = Validate(val, c, multipleErrors);
            if (result !== true) {
                errors.push(...result);
            }
        }
        errorsMap[c.name] = errors;
    });
    const errorKeys = Object.keys(errorsMap);
    const noHasError = !errorKeys.some(key => errorsMap[key]?.length);
    return noHasError || errorsMap;
};
/**
 * @param {any} val;
 * @param {Constraint} constraint;
 * @param {Boolean} multipleErrors;
 */
export const Validate = (val, constraint, multipleErrors = false) => {
    /**@type {ValidateError[]} */
    var errors = [];
    if (typeof val === "undefined")
        throw Error("El parametro val no pude ser undefined. En Validate.");
    else {
        var hasError = false;
        constraint.rules.forEach(r => {
            if (!multipleErrors && hasError) return;
            const rule = allRules[r.name];
            if (typeof rule === "undefined")
                throw Error(`No se encontró la regla ${r.name}. En Validate.`);
            else {
                const result = rule(val, ...r.params, r.message);
                if (result !== true) {
                    hasError = true;
                    errors.push(
                        new ValidateError(constraint.name, result, r.name)
                    );
                }
            }
        });
    }
    return errors.length === 0 || errors;
};
export class Constraint {
    /** @type {String} */
    name;
    /** @type {Rule[]} */
    rules;
    isRequired;
    /**
     * @param {String} name
     * @param {Rule[]} rules
     */
    constructor(name, rules, isRequired = false) {
        this.name = name;
        this.rules = rules;
        this.isRequired = isRequired;
    }
}
export class Rule {
    /** @type {String} */
    name;
    /** @type {String} */
    message;
    /** @type {Array} */
    params;
    constructor(name, message, params = []) {
        this.name = name;
        this.message = message;
        this.params = params;
    }
}
export class ValidateError {
    /** @type {String} */
    name;
    /** @type {String} */
    message;
    /** @type {String} */
    ruleName;
    /**
     * @param {String} name
     * @param {String} message
     * @param {String} ruleName
     */
    constructor(name, message, ruleName) {
        this.name = name;
        this.message = message;
        this.ruleName = ruleName;
    }
}
