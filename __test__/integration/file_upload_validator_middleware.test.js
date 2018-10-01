const request = require('supertest')
const util = require('util')
const fs = require('fs')
const path = require('path')
const { app } = require('../../config')
const readFileAsync = util.promisify(fs.readFile)

describe('FILE VALIDATOR MIDDLEWARE', () => {
  describe('POST', () => {
    describe('When posting with a payload without name attribute', () => {
      it('should return an 422 status and an error message', async () => {
        const payload = {
          buffer: await readFileAsync(path.resolve(__dirname, '../../Dockerfile'))
        }

        const response = await request(app).post('/file').send(payload)
        expect(response.status).toBe(422)
        expect(response.body).toHaveProperty('errorMessage', 'The attribute name is required')
      })
    })

    describe('When posting with a payload with an empty name attribute', () => {
      it('should return an 422 status and an error message', async () => {
        const payload = {
          name: '',
          buffer: await readFileAsync(path.resolve(__dirname, '../../Dockerfile'))
        }

        const response = await request(app).post('/file').send(payload)
        expect(response.status).toBe(422)
        expect(response.body).toHaveProperty('errorMessage', 'The attribute name is required')
      })
    })

    describe('When posting with a payload with an non string name attribute', () => {
      it('should return an 422 status and an error message', async () => {
        const payload = {
          name: 234,
          buffer: await readFileAsync(path.resolve(__dirname, '../../Dockerfile'))
        }

        const response = await request(app).post('/file').send(payload)
        expect(response.status).toBe(422)
        expect(response.body).toHaveProperty('errorMessage', 'The attribute name must be a string')
      })
    })

    describe('When posting with a payload without buffer attribute', () => {
      it('should return an 422 status and an error message', async () => {
        const payload = {
          name: 'some cool name'
        }

        const response = await request(app).post('/file').send(payload)
        expect(response.status).toBe(422)
        expect(response.body).toHaveProperty('errorMessage', 'The attribute buffer is required')
      })
    })

    describe('When posting with a payload with a non object buffer attribute', () => {
      it('should return an 422 status and an error message', async () => {
        const payload = {
          name: 'some cool name',
          buffer: "i'm not a an objectpm test"
        }

        const response = await request(app).post('/file').send(payload)
        expect(response.status).toBe(422)
        expect(response.body).toHaveProperty('errorMessage', 'The attribute buffer must be a buffer')
      })
    })
  })
})
