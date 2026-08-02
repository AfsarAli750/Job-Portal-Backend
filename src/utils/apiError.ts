export class ApiError extends Error{
    public  readonly  statusCode: number
    public readonly success: boolean
    constructor(status: number, message: string){
        super(message),
        this.statusCode=status
        this.success=false
    }
}


export class NotFoundError extends ApiError {
    constructor(message: string = "Resource not found") {
        super(404, message);
    }
}

export class BadRequestError extends ApiError {
    constructor(message: string = "Bad Request") {
        super(400, message);
    }
}

export class UnauthorizedError extends ApiError {
    constructor(message: string = "Unauthorized") {
        super(401, message);
    }
}

export class ForbiddenError extends ApiError {
    constructor(message: string = "Forbidden") {
        super(403, message);
    }
}

export class ConflictError extends ApiError {
    constructor(message: string = "Conflict") {
        super(409, message);
    }
}

export class ValidationError extends ApiError {
    constructor(message: string = "Validation failed") {
        super(422, message);
    }
}

export class ServerError extends ApiError{
    constructor(message: string = "Server error"){
        super(500, message)
    }
}

