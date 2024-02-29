import Message from "../model/messageModel.js"

const messageHelpers = {
  addMessage:async(message,scheduledAt)=>{
    return await Message.create({ message, scheduledAt })
  }
}
export default messageHelpers