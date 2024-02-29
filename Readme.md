### EasyValidator

EasyValidator is a lightweight and flexible Node.js library for data validation. It allows you to validate data objects against predefined rules with ease and customization.



### Installation

You can install EasyValidator via npm:

```bash
npm install easy-validator
```

### Usage

```javascript
const EasyValidator = require('easy-validator');

// Create an instance of EasyValidator
const validator = new EasyValidator();
```

### Adding Custom Validation Rules

You can add custom validation rules using the `addRule` method:

```javascript
validator.addRule('customRule', async (value, ruleValue) => {
    // Custom validation logic
    return value === ruleValue;
});
```

### Performing Validation

To perform validation, use the `validate` method:

```javascript
const validationRules = {
    username: 'required|string|minLength:3|maxLength:20',
    email: 'required|string|format:^\\S+@\\S+\\.\\S+$',
    age: 'required|integer|min:18|max:100',
    // Add more validation rules as needed
};

const userData = {
    username: 'john_doe123',
    email: 'john@example.com',
    age: 25,
    // Add more data as needed
};

validator.validate(userData, validationRules)
    .then(validationErrors => {
        if (validationErrors) {
            console.log('Validation errors:', validationErrors);
        } else {
            console.log('Data is valid!');
        }
    })
    .catch(error => {
        console.error('Error during validation:', error);
    });
```

### Validation Rules

EasyValidator supports various validation rules, including:

- `required`: Ensures that a field is not empty or null.
- `string`: Validates that the value is a string.
- `minLength`: Validates the minimum length of a string.
- `maxLength`: Validates the maximum length of a string.
- `alpha`: Validates if a string contains only alphabetic characters.
- `alphaNumeric`: Validates if a string contains only alphanumeric characters.
- `format`: Validates if a string matches a specific format using regular expressions.
- `number`: Validates if the value is a number.
- `min`: Validates if a number is greater than or equal to a specified minimum value.
- `max`: Validates if a number is less than or equal to a specified maximum value.
- `integer`: Validates if the value is an integer.
- `float`: Validates if the value is a floating-point number.
- `positive`: Validates if a number is positive.
- `negative`: Validates if a number is negative.
- `date`: Validates if the value is a date in the format YYYY-MM-DD.
- `past`: Validates if a date is in the past.
- `future`: Validates if a date is in the future.
- `minLetters`: Validates if a string contains at least 3 letters.
- Custom rules: Developers can define custom validation rules as needed.

### Custom Messages

You can provide custom error messages for validation rules using the `customMessages` parameter:

```javascript
const customMessages = {
    username: {
        required: 'Username is required!',
        minLength: 'Username must be at least 3 characters long!',
        // Add custom messages for other rules
    },
    // Add custom messages for other fields
};

validator.validate(userData, validationRules, customMessages)
    .then(validationErrors => {
        // Handle validation errors
    });
```

### Conclusion

EasyValidator simplifies the process of data validation in Node.js applications, offering flexibility, customization, and ease of use. With support for custom rules, various built-in validation functions, and customizable error messages, EasyValidator makes data validation straightforward and efficient.

