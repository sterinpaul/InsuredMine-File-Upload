import express from 'express'
import userControllers from '../controllers/userControllers.js'
import messageControllers from '../controllers/messageControllers.js'
import { uploads } from '../middlewares/multer.js'
const router = express.Router()

router.post('/api/user/upload-data',uploads,userControllers.uploadData)
router.get('/api/user/get-username/',userControllers.getUser)
router.get('/api/user/get-userpolicyinfo/',userControllers.getPolicyInfo)
router.get('/api/user/get-all-user-policies/',userControllers.getAllPoliciesInfo)

router.post('/api/message/add-message',messageControllers.addMessage)

export default router