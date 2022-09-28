import express from 'express'

const router = express.Router()


import {

    computePalindromePrime

} from "../controllers/controllers.primepalindrome.js";


router.route('/primepalindrome').post(computePalindromePrime)

export default router
