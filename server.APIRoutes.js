import * as serverImports from "./server.Imports.js"
import express from "express";
import cors from "cors";
import filter from "content-filter";

// initiate express
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())


//filter content to prevent nosql injection
const blackList = ['$','{','&&','||']
const options = {
    urlBlackList: blackList,
    bodyBlackList: blackList
}

app.use(filter(options))

app.use('/api',serverImports.computePalindromePrime);


export default  app