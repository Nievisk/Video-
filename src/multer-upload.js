import multer from "multer"
import { BadRequestException } from "./error-handling/error-classes"
import path from "node:path"

const multerUploads = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 1024 * 1024 * 200 },
    fileFilter: (ruq, file, cb) => {
        if (!file) return cb(new BadRequestException("A file is needed to use this feature"))

        const formats = [".mp4", ".mov", ".m4v", ".mkv", ".avi", ".wmv", ".flv", ".webm"]

        if (!file.mimetype.include(formats)) {
            const ext = path.extname(file.originalname).toUpperCase();
            return cb(new BadRequestException(`${ext} extension is not accepted`))
        }

        return cb(null, true)
    }
})