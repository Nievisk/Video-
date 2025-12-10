import express from "express"
import { multerUploads } from "./multer-upload.js"
import { handleData } from "./schema/schema.js"

const router = express.Router()

router.post("/uploads", multerUploads.single("video"), handleData, async (req, res) => {
    console.log(req.file)
})

export { router }