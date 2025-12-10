import "express-async-error"
import { GlobalHandler } from "./error-handling/global-handler.js"
import express from "express"

const app = express()

app.use(GlobalHandler)

const PORT = process.env.PORT ?? 8080

app.listen(PORT)