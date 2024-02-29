import userHelpers from "../helpers/userHelpers.js"
import {Worker, isMainThread} from 'worker_threads'
import { fileURLToPath } from 'url';
import path,{dirname} from 'path'

const userControllers = {
    uploadData:(req,res)=>{
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        const workerPath = path.join(__dirname,'../workerThreads/workerThreads.js')
        
        if(isMainThread){
            const worker = new Worker(workerPath)
            worker.on('message',async(data)=>{
                for(let single of data){
                    const promiseArray = [
                        userHelpers.addUser(single),
                        userHelpers.addAgent(single.agent),
                        userHelpers.addCarrier(single.company_name),
                        userHelpers.addCategory(single.category_name),
                        userHelpers.addAccountName(single.account_name)
                    ]
                    const result = await Promise.allSettled(promiseArray)
                    const response = result.every(singleResult=>singleResult.status === 'fulfilled')
                    
                    if(response){
                        const ids = result.map(singleId=>singleId.value)
                        await userHelpers.addPolicy(single,ids)
                    }
                }
                
                res.status(200).json(data)
            })
            worker.on('error',(msg)=>{
                res.status(404).send(`Result is ${msg}`)
            })
            
            worker.on('exit',(code)=>{
                if(code !== 0) console.log(`Stopped with ${code} exit code`)
            })
            
            worker.postMessage(req.file.path)
        }
    },
    getUser:async(req,res)=>{
        const {username} = req.query
        const response = await userHelpers.getUserName(username)
        if(response) res.status(200).json(response)
    },
    getPolicyInfo:async(req,res)=>{
        const {username} = req.query
        const response = await userHelpers.getUserPolicy(username)
        if(response) res.status(200).json(response)
    },
    getAllPoliciesInfo:async(req,res)=>{
        const response = await userHelpers.getUserPolicies()
        if(response) res.status(200).json(response)
    }
}

export default userControllers