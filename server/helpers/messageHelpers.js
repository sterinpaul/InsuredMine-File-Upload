import Message from "../model/messageModel.js"
import schedule from 'node-schedule'

const messageHelpers = {
  addMessage:async(message,scheduledAt)=>{
    try{
      const job = schedule.scheduleJob(scheduledAt, async()=>{
        try{
          await Message.create({ message, scheduledAt }).then(()=>{
            console.log('task executed')
          })
        }catch(error){
          console.error(`Error inserting message : ${error}`)
        }
      })
      
      return { message: 'Task scheduled successfully'}
    }catch(error){
      console.error(`Error scheduling the task: ${error}`)
    }
  }
}
export default messageHelpers