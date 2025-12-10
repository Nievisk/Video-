import z from "zod"
import { BadRequestException } from "../error-handling/error-classes.js";

const languages = [
    "English", "Español", "中文", "हिन्दी", "Français", "العربية",
    "বাংলা", "Português", "Русский", "日本語", "Deutsch", "Javanese",
    "Lahnda", "Telugu", "Vietnamese", "Korean", "Marathi", "Tamil",
    "Urdu", "Turkish", "Italiano", "Thai", "Gujarati", "Kannada", "Persian",
    "Polski", "Ukrainian", "Malay", "Sundanese", "Punjabi"
];

const languageEnum = z.enum(languages)


const schema = z.object({
    spoken_language: languageEnum,
    translate: languageEnum.optional()
}).refine((obj) => obj.spoken_language !== obj.translate, {
    path: ["translate"],
    error: "Cannot translate the already spoken language"
})

export const handleData = async (req, res, next) => {
    if (!req.file) throw new BadRequestException("A file is needed to use this feature")

    const parse = z.safeParse(schema, req.body);

    if (parse.success) return next();

    const msgs = parse.error.issues.map(issue => { return issue.message })
    res.status(400).json({ message: msgs[0] })
}