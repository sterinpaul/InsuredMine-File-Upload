import {Schema,model} from "mongoose";

// Agent schema
const messageSchema = new Schema(
    {
        message:{
            type:String,
            required:true
        },
        scheduledAt:{
            type:String,
            required:true
        }
    },
    {
        timestamps:true
    }
)

const Message = model('Message',messageSchema)
export default Message