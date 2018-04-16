// import translate from 'utils/i18n';

const validators = {
    firstName: {
        rules: [
            {
                test: /^[a-z0-9_]+$/,
                message: 'Username must contain only alphabets-numeric lowercase characters',
            },
            {
                test: (value) => {
                    return value.length > 2;
                },
                message: 'Username must be longer than two characters',
            },
        ],
        errors: [],
        valid: false,
        state: '',
    },
    lastName: {
        rules: [
            {
                test: /^[a-z0-9_]+$/,
                message: 'Lastname must contain only alphabets-numeric lowercase characters',
            },
            {
                test: (value) => {
                    return value.length > 2;
                },
                message: 'Lastbame must be longer than two characters',
            },
        ],
        errors: [],
        valid: false,
        state: '',
    },
    email: {
        rules: {
            type: 'string',
            required: true,
            maxLength: 50,
            format: 'email',
        },
        messages: {
            format: null, // translate('validation.email.format'),
        },
    },
    phoneNumber: {
        rules: {
            type: 'string',
            required: true,
            maxLength: 50,
            format: 'phone',
        },
        messages: {
            format: null, // translate('validation.phone.format'),
        },
    }

};

export default validators;
