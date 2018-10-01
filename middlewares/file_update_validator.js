const autoBind = require('auto-bind')
const { validate } = require('joi')
const { file_update: fileUploadSchema } = require('../schemas')

class FileValidator {
  constructor () {
    autoBind(this)
  }

  validateFilePayload (req, res, next) {
    try {
      this.validateFile(req.body)
      next()
    } catch (error) {
      res.status(error.status).send({ errorMessage: error.message })
    }
  }

  validateFile (file) {
    validate(file, fileUploadSchema)
  }
}

module.exports = new FileValidator()
