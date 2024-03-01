import User from "../model/userModel.js"
import Agent from "../model/agentModel.js"
import PolicyCarrier from "../model/policyCarrierModel.js"
import PolicyCategory from "../model/policyCategoryModel.js"
import PolicyInfo from "../model/policyInfoModel.js"
import UsersAccount from "../model/usersAccountModel.js"

const userHelpers = {
    addUser:async(data)=>{
        // const newUser = new User({
            // firstname:data?.firstname,
            // dob:data?.dob,
            // address:data?.address,
            // phone:data?.phone,
            // state:data?.state,
            // zip:data?.zip,
            // email:data?.email,
            // gender:data?.gender
        // })
        // const response = await newUser.save()
        const response = await User.findOneAndUpdate(
          {firstname:data?.firstname},
          {$setOnInsert:{
            firstname:data.firstname,
            dob:data?.dob,
            address:data?.address,
            phone:data?.phone,
            state:data?.state,
            zip:data?.zip,
            email:data?.email,
            gender:data?.gender
          }},
          {upsert:true,new:true}
        )
        if(response) return response._id
    },
    addAgent:async(agent)=>{
        const response = await Agent.findOneAndUpdate(
            {agent},
            {$setOnInsert:{agent}},
            {upsert:true,new:true}
        )
        if(response) return response._id
    },
    addCarrier:async(company_name)=>{
        const response = await PolicyCarrier.findOneAndUpdate(
            {company_name},
            {$setOnInsert:{company_name}},
            {upsert:true,new:true}
        )
        if(response) return response._id
    },
    addCategory:async(category_name)=>{
        const response = await PolicyCategory.findOneAndUpdate(
            {category_name},
            {$setOnInsert:{category_name}},
            {upsert:true,new:true}
        )
        if(response) return response._id
    },
    addAccountName:async(account_name)=>{
        const response = await UsersAccount.findOneAndUpdate(
            {account_name},
            {$setOnInsert:{account_name}},
            {upsert:true,new:true}
        )
        if(response) return response._id
    },
    addPolicy:async(data,ids)=>{
        // const newPolicy = new PolicyInfo({
        //     policy_number:data?.policy_number,
        //     policy_type:data?.policy_type,
        //     producer:data?.producer,
        //     csr:data?.csr,
        //     premium_amount:data?.premium_amount,
        //     policy_start_date:data?.policy_start_date,
        //     policy_end_date:data?.policy_end_date,
        //     userId:ids[0],
        //     agentId:ids[1],
        //     carrierId:ids[2],
        //     categoryId:ids[3],
        //     accountNameId:ids[4]
        // })
        // const response = await newPolicy.save()
      const response = await PolicyInfo.findOneAndUpdate(
        {policy_number:data?.policy_number},
        {$setOnInsert:{
          policy_number:data.policy_number,
          policy_type:data?.policy_type,
          producer:data?.producer,
          csr:data?.csr,
          premium_amount:data?.premium_amount,
          policy_start_date:data?.policy_start_date,
          policy_end_date:data?.policy_end_date,
          userId:ids[0],
          agentId:ids[1],
          carrierId:ids[2],
          categoryId:ids[3],
          accountNameId:ids[4]
        }},
        {upsert:true,new:true}
      )
      if(response) return response._id
    },
    getUserName:async(userName)=>{
      const regex = new RegExp(userName,'i')
      return await UsersAccount.find({account_name:{$regex:regex}},{account_name:1})
    },
    getUserPolicy:async(userName)=>{
        return await UsersAccount.aggregate([
          {
            $match: {
              account_name: userName
            }
          },
          {
            $lookup: {
              from: "policyinfos",
              localField: "_id",
              foreignField: "accountNameId",
              as: "policyResult",
            },
          },
          {
            $unwind: {
              path: "$policyResult",
            },
          },
          {
            $lookup: {
              from: "agents",
              localField: "policyResult.agentId",
              foreignField: "_id",
              as: "agentResult",
            },
          },
          {
            $lookup: {
              from: "policycarriers",
              localField: "policyResult.carrierId",
              foreignField: "_id",
              as: "carrierResult",
            },
          },
          {
            $lookup: {
              from: "policycategories",
              localField: "policyResult.categoryId",
              foreignField: "_id",
              as: "categoryResult",
            },
          },
          {
            $unwind: {
              path: "$categoryResult",
            },
          },
          {
            $unwind: {
              path: "$agentResult",
            },
          },
          {
            $unwind: {
              path: "$carrierResult",
            },
          },
          {
            $project: {
              _id: "$policyResult._id",
              account_name: 1,
              agent_name: "$agentResult.agent",
              company_name: "$carrierResult.company_name",
              category_name:
                "$categoryResult.category_name",
              policy_number:
                "$policyResult.policy_number",
              policy_type: "$policyResult.policy_type",
              producer: "$policyResult.producer",
              csr: "$policyResult.csr",
              premium_amount:
                "$policyResult.premium_amount",
              policy_start_date:
                "$policyResult.policy_start_date",
              policy_end_date:
                "$policyResult.policy_end_date",
              category_name:
                "$policyResult.category_name",
              createdAt: "$policyResult.createdAt",
              updatedAt: "$policyResult.updatedAt",
            },
          },
        ]
      )
    },
    getUserPolicies:async()=>{
        return await PolicyInfo.aggregate([
          {
            $lookup: {
              from: "users",
              localField: "userId",
              foreignField: "_id",
              as: "userResult",
            },
          },
          {
            $lookup: {
              from: "agents",
              localField: "agentId",
              foreignField: "_id",
              as: "agentResult",
            },
          },
          {
            $lookup: {
              from: "policycarriers",
              localField: "carrierId",
              foreignField: "_id",
              as: "carrierResult",
            },
          },
          {
            $lookup: {
              from: "policycategories",
              localField: "categoryId",
              foreignField: "_id",
              as: "categoryResult",
            },
          },
          {
            $lookup: {
              from: "usersaccounts",
              localField: "accountNameId",
              foreignField: "_id",
              as: "accountNameResult",
            },
          },
          {
            $unwind: {
              path: "$userResult",
            },
          },
          {
            $unwind: {
              path: "$agentResult",
            },
          },
          {
            $unwind: {
              path: "$carrierResult",
            },
          },
          {
            $unwind: {
              path: "$categoryResult",
            },
          },
          {
            $unwind: {
              path: "$accountNameResult",
            },
          },
          {
            $project: {
              _id: "$accountNameResult._id",
              firstname: "$userResult.firstname",
              dob: "$userResult.dob",
              address: "$userResult.address",
              phone: "$userResult.phone",
              state: "$userResult.state",
              zip: "$userResult.zip",
              email: "$userResult.email",
              gender: "$userResult.gender",
              policy_number: 1,
              policy_type: 1,
              producer: 1,
              csr: 1,
              agent: "$agentResult.agent",
              company_name: "$carrierResult.company_name",
              category_name:
                "$categoryResult.category_name",
              premium_amount: 1,
              policy_start_date: 1,
              policy_end_date: 1,
              createdAt: 1,
              updatedAt: 1,
              account_name:
                "$accountNameResult.account_name",
            },
          },
          {
            $group: {
              _id: "$_id",
              account_name: {
                $first: "$account_name",
              },
              policies: {
                $push: {
                  _id: "$_id",
                  firstname: "$firstname",
                  dob: "$dob",
                  address: "$address",
                  phone: "$phone",
                  state: "$state",
                  zip: "$zip",
                  email: "$email",
                  gender: "$gender",
                  policy_number: "$policy_number",
                  policy_type: "$policy_type",
                  producer: "$producer",
                  csr: "$csr",
                  agent: "$agent",
                  company_name: "$company_name",
                  premium_amount: "$premium_amount",
                  policy_start_date: "$policy_start_date",
                  policy_end_date: "$policy_end_date",
                  category_name: "$category_name",
                  createdAt: "$createdAt",
                  updatedAt: "$updatedAt",
                },
              },
            },
          },
        ]
      )
    }
}
export default userHelpers