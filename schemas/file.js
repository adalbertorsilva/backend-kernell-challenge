const Joi = require('joi')
const { missing_field_error: MissingFieldError,
  invalid_type_error: InvalidTypeError } = require('../errors')

const checkErrors = (errors) => {
  switch (errors[0].type) {
    case 'any.required':
      throw new MissingFieldError(errors[0].path[0])
    case 'any.empty':
      throw new MissingFieldError(errors[0].path[0])
    case 'string.base':
      throw new InvalidTypeError(errors[0].path[0], 'string')
    case 'object.base':
      throw new InvalidTypeError(errors[0].path[0], 'buffer')
  }
}

const schema = Joi.object().keys({
  name: Joi.string().required().error((errors) => { checkErrors(errors) }),
  buffer: Joi.object().required().error((errors) => { checkErrors(errors) })
})

module.exports = schema
