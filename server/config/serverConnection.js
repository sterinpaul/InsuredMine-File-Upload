import configKeys from "./configKeys.js"

const startServer = (app)=>{
    try{
        app.listen(configKeys.PORT,'0.0.0.0',()=>{
            console.log(`Server started on http://localhost:${configKeys.PORT}`);
        })
    }catch(error){
        console.log('Error starting server',error);
    }
}

export default startServer