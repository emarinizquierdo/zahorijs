module.exports = {

    "development": {
        "OAUTH2_CLIENT_ID": process.env.OAUTH2_CLIENT_ID,
        "OAUTH2_CLIENT_SECRET": process.env.OAUTH2_CLIENT_SECRET,
        "OAUTH2_CALLBACK": process.env.OAUTH2_CALLBACK,
        "MERCHANT_SANDBOX_ID": process.env.MERCHANT_SANDBOX_ID,
        "PUBLIC_SANDBOX_KEY": process.env.PUBLIC_SANDBOX_KEY,
        "PRIVATE_SANDBOX_KEY": process.env.PRIVATE_SANDBOX_KEY
    },
    "production": {
        "OAUTH2_CLIENT_ID": process.env.OAUTH2_CLIENT_ID,
        "OAUTH2_CLIENT_SECRET": process.env.OAUTH2_CLIENT_SECRET,
        "OAUTH2_CALLBACK": process.env.OAUTH2_CALLBACK,
        "MERCHANT_SANDBOX_ID": process.env.MERCHANT_SANDBOX_ID,
        "PUBLIC_SANDBOX_KEY": process.env.PUBLIC_SANDBOX_KEY,
        "PRIVATE_SANDBOX_KEY": process.env.PRIVATE_SANDBOX_KEY
    }

}
