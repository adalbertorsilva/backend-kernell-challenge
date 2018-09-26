const { s3_controller: s3Controller } = require('./controllers')
const { file_validator: fileValidator } = require('./middlewares')

module.exports = (app) => {
  app.post('/file', fileValidator.validateFilePayload, s3Controller.upload)
  app.get('/file', s3Controller.find)
}
