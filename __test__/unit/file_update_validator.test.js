const { file_update_validator: fileUpdateValidator } = require('../../middlewares')
const { missing_field_error: MissingFieldError,
  invalid_type_error: InvalidTypeError } = require('../../errors')

describe('FILE UPDATE VALIDATION UNIT TEST', () => {
  describe('When name attribute is not present', () => {
    it('Should throw an error', () => {
      const file = {
      }

      expect(() => { fileUpdateValidator.validateFile(file) }).toThrow(MissingFieldError)
    })
  })

  describe('When name attribute is empty', () => {
    it('Should throw an error', () => {
      const file = {
        name: ''
      }

      expect(() => { fileUpdateValidator.validateFile(file) }).toThrow(MissingFieldError)
    })
  })

  describe('When name attribute is not a string', () => {
    it('Should throw an error', () => {
      const file = {
        name: 123
      }

      expect(() => { fileUpdateValidator.validateFile(file) }).toThrow(InvalidTypeError)
    })
  })
})
