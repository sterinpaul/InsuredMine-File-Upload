import express from 'express'
import http from 'http'
import cors from 'cors'
import startServer from './config/serverConnection.js'
import mongoDBConnect from './config/dbConnection.js'
import router from './routes/userRouter.js'


import pidusage from 'pidusage';
// import {exec} from 'child_process'

const app = express()

const server = http.createServer(app)

// Enabling CORS
const enableCors = {
    origin: '*',
    exposeHeaders: ['Cross-Origin-Opener-Policy', 'Cross-Origin-Resource-Policy']
}

// App middlewares
app.use(cors(enableCors))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// User router middleware
app.use(router)

// Connecting the Atlas database
mongoDBConnect()

// Starting the server
startServer(server)




// Function to check CPU utilization
async function checkCPU() {
    try {
        const stats = await pidusage(process.pid);
        console.log('CPU usage:', stats.cpu);
        
        // Check if CPU usage exceeds threshold
        if (stats.cpu > 70) {
            console.log('CPU usage exceeded threshold. Restarting server...');
            restartServer();
        }
    } catch (error) {
        console.error('Error checking CPU usage:', error);
    }
}

// Function to restart server
function restartServer() {
    // Restart server
    server.close(() => {
        startServer(server)
    });

    // exec('pm2 restart your_server_name', (error, stdout, stderr) => {
    //     if (error) {
    //         console.error('Error restarting server:', error);
    //         return;
    //     }
    //     console.log('Server restarted:', stdout);
    // });
}

// Schedule CPU check every 5 seconds
setInterval(checkCPU, 5000);