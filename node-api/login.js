const database = require("./db");
const bcrypt = require("bcrypt")

exports.result = (request,response) =>{
    let formData =  "";
    request.on("data",(chunks)=>{
        formData += chunks.toString();
    });
    request.on("end",async ()=>{
        let data = JSON.parse(formData);
        const query = {
            email : data.username
        };
        try {
            const successRes = await database.find(query);
            const realPassword = successRes.data[0].password;
            bcrypt.compare(data.password,realPassword).then((isMatched)=>{
                console.log("loginSuccess")
            }).catch((error)=>{
                /* if by anyreason unable to compare */
            })
        } catch (errorRes) {
            console.log(errorRes);
        }
    })
}

