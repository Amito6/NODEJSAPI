const database = require("./db");
const bcrypt = require("bcrypt");



exports.demo = (request,response) =>{
    let formData = "";
    request.on("data",(chunks)=>{
        formData +=chunks;
    });
    request.on("end",()=>{
        const userInfo = JSON.parse(formData);
        const query = {
            email : userInfo.email
        }
        /* find data if user already exists */

        const findRes = database.find(query);
        findRes.then((successRes)=>{
            sendResponse(response,successRes.status_code,successRes)
        }).catch((errorRs)=>{
            console.log("ready to enter")
            bcrypt.hash(userInfo.password,10).then((encryptPass)=>{
                console.log("password encrypted")
                userInfo['password'] = encryptPass;
                userInfo["createdAt"] = new Date();
                userInfo["updatedAt"] = new Date();
                userInfo["emailVerified"] = false;
                userInfo["mobileVerified"] = false;
                createUser(response,userInfo);
            })
        })
    })
}


/* creating new User */
const createUser = (response,userInfo) =>{
    const insertRes = database.insertOne(userInfo);
    insertRes.then((successRes)=>{
        sendResponse(response,successRes.status_code,successRes)
    }).catch((error)=>{
        sendResponse(response,error.status_code,error)
    })
}


const sendResponse = (response,code,message) =>{
    response.writeHead(code,{
        "Content-Type" : "application/json"
    });
    const serverRes = JSON.stringify(message);
    response.write(serverRes);
    response.end();
}
