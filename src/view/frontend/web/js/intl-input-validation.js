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
    const isValid = intlTelInput.isValidNumber();
    if (isValid) return true;
    return errorMap[intlTelInput.getValidationError()] ?? errorMap[0];
};

/**
 * Initialize intl-tel-input
 *
 * @param selector
 * @param config
 */
export const intlInput = function (selector, config) {
    document
        .querySelectorAll(selector)
        .forEach(element=> {
            element.addEventListener('blur', (event) => {
                const intlTelInput = window.intlTelInputGlobals.getInstance(element);
                const formattedNumber = intlTelInput.getNumber();
                if (formattedNumber) {
                    intlTelInput.setNumber(formattedNumber);
                }
            });
            window.intlTelInput(element, config)
            const validationDataset = element.dataset.validate;
            if (validationDataset) {
                const validationData = JSON.parse(validationDataset);
                if (!validationData['validate-phone-number-with-checkbox']) {
                    validationData['validate-phone-number-with-checkbox'] = true;
                }
                element.dataset.validate = JSON.stringify(validationData);
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

