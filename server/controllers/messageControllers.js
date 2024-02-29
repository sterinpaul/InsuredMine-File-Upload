import messageHelpers from "../helpers/messageHelpers.js"
import moment from 'moment'

const messageControllers = {
    addMessage:async(req,res)=>{
        const { message, day, time } = req.body
        // Validate input parameters
        if (!message || !day || !time) {
          return res.status(400).json({ error: 'Missing required parameters' });
        }
        // Convert day and time to a Date object
        const scheduledAt = moment(`${day}T${time}`).format()
        const response = await messageHelpers.addMessage(message,scheduledAt)
        if(response) res.status(200).json({message:'Message scheduled successfully'})
    }
}

export default messageControllers