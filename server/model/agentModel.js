import {Schema,model} from "mongoose";

// Agent schema
const agentSchema = new Schema(
    {
        agent:{
            type:String,
            required:true
        }
    },
    {
        timestamps:true
    }
)

const Agent = model('Agent',agentSchema)
export default Agent