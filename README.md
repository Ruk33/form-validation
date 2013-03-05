form-validation
===============

A super-light, flexible, easy-to-use form validation in javascript (requires [jQuery](http://jquery.com/)).

##How to use it?
Firs, we need to set some validation rules:

```javascript
var rules = {
	'idOfTheField': {
		minLength: {
			value: 2,
			message: 'This field must have at least 2 characters'
		},
		maxLength: {
			value: 7,
			message: 'This field can contain maximum 7 characters'
		}
	}
};
```

As you can see, we set that the field must have at least 2 characters and a maximum of 7.
Then, we need to set up this rules into the form:

```javascript
$('#form-to-validate').setValidationRules(
	rules,
	function() {
		console.log('Form sucessfully validated :D');
	}
);
```

And we are done!. When the user submits the form, it will be validated.

##Suported validations
* ###Equal
	####Example
		```javascript
		var rules = {
			'idOfTheField': {
				equal: {
					value: 2,
					message: 'This field must be 2'
				}
			}
		};
		```

		Also, we can assign an element to check for the values:

		```javascript
		var rules = {
			'idOfTheField': {
				equal: {
					value: $('#anotherField'),
					message: 'This field must be equal to #anotherField'
				}
			}
		};
		```

* ###LessThan
	For numbers (not number of characters).

	####Example
		```javascript
		var rules = {
			'idOfTheField': {
				lessThan: {
					value: 2,
					message: 'This field must less than 2'
				}
			}
		};
		```

* ###GreaterThan
	For numbers (not number of characters).

	####Example
		```javascript
		var rules = {
			'idOfTheField': {
				greaterThan: {
					value: 2,
					message: 'This field must greater than 2'
				}
			}
		};
		```

* ###minLength/maxLength
	This will look for the number of characters in the field.

	####Example
		```javascript
		var rules = {
			'idOfTheField': {
				minLength: {
					value: 2,
					message: 'This field must have at least 2 characters'
				},

				maxLength: {
					value: 4,
					message: 'This field can contain maximum 4 characters'
				}
			}
		};
		```

* ###RegularExpression
	This will compare a regular expresion with `test`.

	####Example
		```javascript
		var rules = {
			'idOfTheField': {
				regularExpression: {
					value: /\d/,
					message: 'Only numbers (0-9)'
				}
			}
		};
		```

* ###Email
	This uses RegularExpression (see above) to check for valid emails.

	Regular expression: `/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/`

	####Example
		```javascript
		var rules = {
			'idOfTheField': {
				email: {
					message: 'Invalid email'
				}
			}
		};
		```

##How to add my custom validation?
You can use the `addCustomFormValidation` function:

```
addCustomFormValidation('catLanguage', function(input, data) {
	// field that we are validating
	input = __formValidation.inputs[input].input;
	return input.val() == 'Miau';
});
```

In this example, the field must be 'Miau'.

##Want to see a full example?
Please check the **examples** folder ;).

##LICENCE
Nothing, it's free :D! 