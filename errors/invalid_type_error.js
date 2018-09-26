class InvalidTypeError extends Error {
  constructor (attribute, type) {
    super()
    this.status = 422
    this.message = `The attribute ${attribute} must be a ${type}`
  }
}

module.exports = InvalidTypeError
