// This file loads all the environmental variables we need
import 'dotenv/config'

export const secrets = {
    "NODE_ENV":process.env.NODE_ENV,
    "PORT":process.env.PORT,

}


