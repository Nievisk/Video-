export class ErrorHandler extends Error {
    constructor(message, status) {
        super({ message })
        this.status = status
    }
}

export class BadRequestException extends ErrorHandler {
    constructor(message) {
        super(message, 400)
    }
}