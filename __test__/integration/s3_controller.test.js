const request = require('supertest')
const util = require('util')
const fs = require('fs')
const path = require('path')
const { app } = require('../../config')
const readFileAsync = util.promisify(fs.readFile)

describe('S3 CONTROLLER', () => {
  describe('POST', () => {
    describe('When posting with a full payload', () => {
      it('should return an 200 status', async () => {
        const payload = {
          name: 'Uploaded Dockerfile',
          buffer: await readFileAsync(path.resolve(__dirname, '../../Dockerfile'))
        }

        const response = await request(app).post('/file').send(payload)
        expect(response.status).toBe(200)
      })
    })
  })
  describe('GET', () => {
    describe('When posting with a full payload', () => {
      it('should return an 200 status', async () => {
        const response = await request(app).get('/file')
        expect(response.status).toBe(200)
        expect(response.body.length).toEqual(1)
      })
    })
  })
})
