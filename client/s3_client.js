const autoBind = require('auto-bind')
const AWS = require('aws-sdk')
require('dotenv').config()

class S3Client {
  constructor () {
    autoBind(this)
    AWS.config.accessKeyId = process.env.AWS_ACCESS_KEY_ID
    AWS.config.secretAccessKey = process.env.AWS_SECRET_KEY
    AWS.config.region = process.env.AWS_REGION
    this.s3 = new AWS.S3()
  }

  async upload (file) {
    const uploadParams = {
      Key: file.name,
      Bucket: process.env.AWS_BUCKET,
      Body: Buffer.from(file.buffer)
    }

    await this.s3.upload(uploadParams).promise()
  }

  async find () {
    const listParams = {
      Bucket: process.env.AWS_BUCKET
    }

    return this.s3.listObjects(listParams).promise()
  }
}

module.exports = new S3Client()

// Bom dia, Listar arquivos do S3, alterar nome de arquivo no S3 e upload de arquivos no S3
