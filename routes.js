const { s3_controller: s3Controller } = require('./controllers')
const { file_upload_validator: fileUploadValidator,
  file_update_validator: fileUpdateValidator } = require('./middlewares')

module.exports = (app) => {
  app.post('/file', fileUploadValidator.validateFilePayload, s3Controller.upload)
  app.get('/file', s3Controller.find)
  app.put('/file', fileUpdateValidator.validateFilePayload, s3Controller.update)
}
