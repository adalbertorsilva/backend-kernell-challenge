const { file_upload_validator: fileUploadValidator } = require('../../middlewares')
const { missing_field_error: MissingFieldError,
  invalid_type_error: InvalidTypeError } = require('../../errors')

describe('FILE UPLOAD VALIDATION UNIT TEST', () => {
  describe('When name attribute is not present', () => {
    it('Should throw an error', () => {
      const file = {
        buffer: {}
      }

      expect(() => { fileUploadValidator.validateFile(file) }).toThrow(MissingFieldError)
    })
  })

  describe('When name attribute is empty', () => {
    it('Should throw an error', () => {
      const file = {
        name: ''
      }

      expect(() => { fileUploadValidator.validateFile(file) }).toThrow(MissingFieldError)
    })
  })

  describe('When name attribute is not a string', () => {
    it('Should throw an error', () => {
      const file = {
        name: 123
      }

      expect(() => { fileUploadValidator.validateFile(file) }).toThrow(InvalidTypeError)
    })
  })

  describe('When buffer attribute is not present', () => {
    it('Should throw an error', () => {
      const file = {
        name: 'some cool name'
      }

      expect(() => { fileUploadValidator.validateFile(file) }).toThrow(MissingFieldError)
    })
  })

  describe('When buffer attribute is not an object', () => {
    it('Should throw an error', () => {
      const file = {
        name: 'some cool name',
        buffer: "i'm not an object !"
      }

      expect(() => { fileUploadValidator.validateFile(file) }).toThrow(InvalidTypeError)
    })
  })
})
