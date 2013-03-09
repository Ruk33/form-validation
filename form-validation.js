var __formValidation = {
	/*
	 * "Cache"
	 */
	forms: {},
	inputs: {},

	validations: {
		equal: function(input, data) {
			if (typeof data.value === 'object') {
				return __formValidation.inputs[input].input.val() == data.value.val();
			} else {
				return __formValidation.inputs[input].input.val() == data.value;
			}
		},
		lessThan: function(input, data) {
			return __formValidation.inputs[input].input.val().parseInt() < data.value;
		},
		greaterThan: function(input, data) {
			return __formValidation.inputs[input].input.val().parseInt() > data.value;
		},
		minLength: function(input, data) {
			return __formValidation.inputs[input].input.val().length >= data.value;
		},
		maxLength: function(input, data) {
			return __formValidation.inputs[input].input.val().length <= data.value;
		},
		regularExpression: function(input, data) {
			return data.value.test(__formValidation.inputs[input].input.val());
		},
		email: function(input, data) {
			var emailExpression = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			return __formValidation.validations.regularExpression(input, { value: emailExpression });
		}
	},

	/**
	 * @param input <String> Id of the input to validate
	 * @param rules <Object> Validation rules
	 */
	validate: function(input, rules) {
		var ok = true;
		var errorDiv;

		/*
		 * Check if the object is in the "cache",
		 * if is not, then add it
		 */
		if (!__formValidation.inputs[input]) {
			__formValidation.inputs[input] = {
				input: $('#' + input),
				errorDiv: $('#error-' + input)
			};
		}

		errorDiv = __formValidation.inputs[input].errorDiv;

		/*
		 * Removing old errores from the
		 * error div (only if exists)
		 */
		if (errorDiv) {
			errorDiv.hide();
			errorDiv.children().remove();
		}

		for (var rule in rules) {
			/*
			 * Check if the rule is satisfied
			 */
			if (!__formValidation.validations[rule](input, rules[rule])) {
				/*
				 * If not, then add the error message
				 * (only if the error div exists)
				 */
				if (errorDiv) {
					if (rules[rule].message) {
						errorDiv.append('<div>' + rules[rule].message + '</div>');
					}
					errorDiv.show();
				}
				ok = false;
			}
		}

		return ok;
	},

	/**
	 * @param inputs <Object> Inputs to validate
	 * @return <Boolean> True if everything is sucessfully validated
	 */
	validateAllInputs: function(inputs) {
		var ok = true;

		for (var input in inputs) {
			if (!__formValidation.validate(input, inputs[input])) {
				ok = false;
			}
		}

		return ok;
	}
};

/**
 * @param name <String> Name of the new validation
 * @param fn <Function> Function to call when the validation is needed
 */
var addCustomFormValidation = function(name, fn) {
	__formValidation.validations[name] = function(input, data) {
		return fn(__formValidation.inputs[input].input, data);
	};
};

/**
 * @param rules <Object> Inputs and validations rules
 * @param callback <Function> If all fields are sucessfully validated
 * then this function will be called
 */
jQuery.prototype.setValidationRules = function(rules, callback) {
	var id = this.attr('id');

	if (!__formValidation.forms[id]) {
		__formValidation.forms[id] = {
			form: this,
			data: rules,
			fn: callback
		};

		this.on('submit', function(e) {
			var _this = __formValidation.forms[$(this).attr('id')];

			if (__formValidation.validateAllInputs(_this.data)) {
				_this.fn(e);
			} else {
				e.preventDefault();
			}
		});
	}
};