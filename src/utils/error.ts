/******************/
/* OPEN AI ERRORS */
export class OpenAIServiceError extends Error {
    constructor(
        message: string,
        public context?: unknown,
    ) {
        super(message)
        this.name = "OpenAIServiceError"
    }
}

export function isOpenAIServiceError(
    error: unknown,
): error is OpenAIServiceError {
    return error instanceof OpenAIServiceError
}

export class OpenAIApiError extends OpenAIServiceError {
    constructor(
        message: string,
        public statusCode: number,
        public endpoint?: string,
        context?: unknown,
    ) {
        super(`Error ${statusCode} at ${endpoint}: ${message}`, context)
        this.name = "OpenAIApiError"
    }
}

export function isOpenAIApiError(error: unknown): error is OpenAIApiError {
    return error instanceof OpenAIApiError
}
