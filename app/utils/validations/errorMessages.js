
export const isRequired = fieldName => `${fieldName} is required`;

export const mustMatch = otherFieldName => {
  return (fieldName) => `${fieldName} must match ${otherFieldName}`;
};

export const minLength = length => {
  return (fieldName) => `${fieldName} must be at least ${length} characters`;
};

export const nickName = () => 'Please enter a nickname for this address';

export const nameAndSurname = () => 'Please enter name and surname';

export const addressLine1 = () => 'Please enter the street address line 1';

export const contactNumber = () => 'Please enter a valid contact number';

export const required = () => 'This is a required field';

export const validVontactNumber = () => 'Please enter a valid contact number with no spaces or special characters (local: 10 digits; international: 15 digits)';

export const validEmailNumber = () => 'Please enter a valid email address';

export const FormError = () => 'There were some errors in your form input. Please review your input below.';

export const empty = () => '';

export const firstName = () => 'Enter firstName';

export const lastName = () => 'Enter surName';

export const email = () => 'Please enter a valid email address';

export const termsAndConditions = () => 'You need to accept these terms and conditions to continue';

export const emailsmustMatch = () => 'Emails do not match.';

export const passwordsmustMatch = () => 'Passwords do not match.';

