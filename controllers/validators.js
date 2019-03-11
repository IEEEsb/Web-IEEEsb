const { Joi, celebrate } = require('celebrate');
const { multiple } = require('../common/utils');

const customNumber = Joi.extend(joi => ({
	base: joi.number(),
	name: 'number',
	language: {
		multiple: 'needs to be a multiple of {{multiple}}',
	},
	rules: [
		{
			name: 'multiple',
			params: {
				multiple: joi.alternatives([joi.number().required().greater(0), joi.func().ref()]),
			},
			validate(params, value, state, options) {
				console.log(value, params);
				if (multiple(value, params.multiple)) {
					// Generate an error, state and options need to be passed, q is used in the language
					return this.createError('number.multiple', { v: value, multiple: params.multiple }, state, options);
				}

				return value; // Everything is OK
			},
		},
	],
}));

// Customize the default settings for Joi's validator, in a way that properties
// not defined in the validation schema don't produce any error, but are
// removed from the request
module.exports.validate = (validator, options) => (
	celebrate(validator, { stripUnknown: true, allowUnknown: true, ...options })
);
// A version of the validator that doesn't remove undefined properties from the
// response. Useful for validations that only forbid certain keys (like for
// updates)
module.exports.validateWithoutStripping = (validator, options) => (
	celebrate(validator, { allowUnknown: true, ...options })
);

module.exports.validators = {
	login: {
		body: {
			token: Joi.string().required().label('Token'),
		},
	},
	post: {
		body: {
			title: Joi.string().required().label('Título'),
			content: Joi.string().required().label('Contenido'),
			excerpt: Joi.string().required().label('Resumen'),
		},
	},
	addRole: {
		body: {
			role: Joi.string().regex(/[a-zA-Z]+/).required().label('Rol'),
		},
	},
};
