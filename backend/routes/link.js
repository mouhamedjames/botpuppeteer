import express from  "express"
import{navigate} from '../controller/link.js'
const  router = express.Router()
router.post("/createlink",navigate)
export default  router