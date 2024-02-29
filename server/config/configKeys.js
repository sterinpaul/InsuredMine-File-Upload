import dotENV from 'dotenv'
dotENV.config()

const configKeys = {
    PORT:process.env.PORT,
    MONGODB_ATLAS_URL:process.env.MONGODB_ATLAS_URL
}

export default configKeys