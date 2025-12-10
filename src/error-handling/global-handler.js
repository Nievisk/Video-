import multer from "multer";
import { ErrorHandler } from "./error-classes.js";

export const GlobalHandler = (error, req, res, next) => {
    let statusCode = 500
    let message = "The server responded with an error";

    if (error instanceof multer.MulterError) {
        if (error.name === "LIMIT_FILE_SIZE") {
            message = "The file excceeded maximum limits"
            statusCode = 400
        }
    }

    if (error instanceof ErrorHandler) {
        statusCode = error.status
        message = error.message
    }

    return res.status(statusCode).json({
        message,
        statusCode,
        timestamp: new Date().toISOString()
    })
}