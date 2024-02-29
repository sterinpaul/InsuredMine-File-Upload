import {Schema,model} from "mongoose";

// Policy Carrier Schema
const policyCarrierSchema = new Schema(
    {
        company_name:{
            type:String,
            required:true
        }
    },
    {
        timestamps:true
    }
)

const PolicyCarrier = model('PolicyCarrier',policyCarrierSchema)
export default PolicyCarrier