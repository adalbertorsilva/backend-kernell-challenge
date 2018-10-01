const request = require('supertest')
const { app } = require('../../config')

describe('FILE UPDATE VALIDATOR MIDDLEWARE', () => {
  describe('PUT', () => {
    describe('When posting with a payload without name attribute', () => {
      it('should return an 422 status and an error message', async () => {
        const payload = {
        }

        const response = await request(app).put('/file').send(payload)
        expect(response.status).toBe(422)
        expect(response.body).toHaveProperty('errorMessage', 'The attribute name is required')
      })
    })

    describe('When putting with a payload with an empty name attribute', () => {
      it('should return an 422 status and an error message', async () => {
        const payload = {
          name: ''
        }

        const response = await request(app).put('/file').send(payload)
        expect(response.status).toBe(422)
        expect(response.body).toHaveProperty('errorMessage', 'The attribute name is required')
      })
    })

    describe('When putting with a payload with an non string name attribute', () => {
      it('should return an 422 status and an error message', async () => {
        const payload = {
          name: 234
        }

        const response = await request(app).put('/file').send(payload)
        expect(response.status).toBe(422)
        expect(response.body).toHaveProperty('errorMessage', 'The attribute name must be a string')
      })
    })
  })
})
