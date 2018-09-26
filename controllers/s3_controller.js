const autoBind = require('auto-bind')
const { s3_client: s3Client } = require('../client')

class S3Controller {
  constructor () {
    autoBind(this)
  }

  async upload (req, res) {
    await s3Client.upload(req.body)
    return res.status(200).send()
  }

  async find (req, res) {
    const responseBody = await s3Client.find()
    return res.status(200).send(responseBody.Contents)
  }
}

module.exports = new S3Controller()
