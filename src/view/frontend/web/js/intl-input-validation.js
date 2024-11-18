/**
 * Error messages for intl-tel-input
 * @type {string[]}
 */
export const errorMap = [
    'Invalid telephone number',
    'Invalid country code',
    'Telephone number is too short',
    'Telephone number is too long',
    'Invalid telephone number'
];

/**
 * Validate phone number
 *
 * @param value
 * @param options
 * @param field
 * @param context
 * @returns {string|boolean|boolean}
 */
export const validationRule = function (value, options, field, context) {
    const intlTelInput = window.intlTelInputGlobals.getInstance(field.element);

    if(value === '') return true;
    if(intlTelInput === undefined) return true;

    const isValid = intlTelInput.isValidNumber();

    if (isValid) return true;
    return errorMap[intlTelInput.getValidationError()] ?? errorMap[0];
};

/**
 * Append validation rules
 *
 * @param element
 * @param validationRules
 */
export const appendValidationRules = function(element, validationRules) {
    const validationDataset = element.dataset.validate;
    if (validationDataset) {
        const validationData = JSON.parse(validationDataset);
        validationRules.forEach(rule => validationData[rule] = validationData[rule] || true);
        element.dataset.validate = JSON.stringify(validationData);
    }
}

/**
 * Initialize intl-tel-input
 *
 * @param selector
 * @param config
 * @param additionalRules
 * @param withRules
 */
export const intlInput = function (selector, config, additionalRules = [], withRules = true) {
    document
        .querySelectorAll(selector)
        .forEach(element=> {

            if(window.intlTelInputGlobals.getInstance(element)) return;

            element.addEventListener('change', (event) => {
                const intlTelInput = window.intlTelInputGlobals.getInstance(element);
                const formattedNumber = intlTelInput.getNumber();
                if (formattedNumber) {
                    intlTelInput.setNumber(formattedNumber);
                }
            });

            window.intlTelInput(element, config)

            if(withRules){
                appendValidationRules(element, [
                    ...['validate-phone-number-with-checkbox'],
                    ...additionalRules
                ])
            }

        });
}

/**
 * Include intl-tel-input css
 *
 * @param src
 */
export const includeStyle = function (src) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = src;
    document.head.appendChild(link);
}

