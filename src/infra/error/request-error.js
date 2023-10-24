export class BadRequestError extends Error {
    constructor(message) {
        super(message);
        this.name = 'BadRequestError';
    }
};

export class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotFoundError';
    }
};

export class ServerError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ServerError';
    }
};

export class UnauthorizedError extends Error {
    constructor(message) {
        super(message);
        this.name = 'UnsuthorizedError';
    }
};

export function errorHandler(res, error) {
    if (error instanceof NotFoundError) {
        res.status(404).json({ message: error.message });
    } else if (error instanceof BadRequestError) {
        res.status(400).json({ message: error.message });
    } else if (error instanceof UnauthorizedError) {
        res.status(401).json({ message: error.message });
    } else if (error instanceof ServerError) {
        res.status(500).json({ message: error.message });
    } else {
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};