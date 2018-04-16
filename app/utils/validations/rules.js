import * as ErrorMessages from './errorMessages.js';

export const required = (text) => {
  if (text) {
    return null;
  } else {
    return ErrorMessages.isRequired;
  }
};

export const mustMatch = (field, fieldName) => {
  return (text, state) => {
    return state[field] === text ? null : ErrorMessages.mustMatch(fieldName);
  };
};

export const minLength = (length) => {
  return (text) => {
    return text.length >= length ? null : ErrorMessages.minLength(length);
  };
};

export const requiredFieldWithErrorMessage = (errorType = 'isRequired') => {
  return (text) => {
    if (text) return null;
    return ErrorMessages[errorType];
  };
};

export const validateContactNumber = (text) => {
    const isnum = /^\d+$/.test(text) && text.toString().length >= 10;
    if (isnum) return null;
    return ErrorMessages.contactNumber;
};

export const validateForm = (val, field, form) => {
  if (field === 'primaryContactNo') {
    if (isNaN(Number(val)) || val.length < 10) {
      return ErrorMessages.validVontactNumber;
    }
  } else if (val === '') {
      return ErrorMessages[field] || ErrorMessages.required;
  } else if (field === 'confirmEmail') {
    if (val !== form.email) {
      return ErrorMessages.emailsmustMatch;//'Emails do not match.';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val)) {
      return ErrorMessages.validEmailNumber
    }
  } else if (field === 'confirmPassword') {
    if (val !== form.password) {
      return ErrorMessages.passwordsmustMatch;//'Passwords do not match.';
    }
  }
  return ErrorMessages.empty;
}
