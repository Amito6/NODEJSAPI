const http = require("http");
const fs = require("fs");
const signup = require("./node-api/signup");
const { result } = require("./node-api/login");



const route = (response,path,statusCode,type) =>{
    fs.readFile(path,(error,dataRes)=>{
        if(error){
            throw error;
        }
        else{
            response.writeHead(statusCode,{
                "Content-Type" : type
            });
            response.write(dataRes);
            response.end();
        }
    })
}


const server = http.createServer((request,response)=>{
 if(request.url == "/"  || request.url == "/home"){
    let path = "html/homepage.html";
    let code = 200;
    let type = "text/html";
    route(response,path,code,type);
 }
 else if(request.url == "/about"){
    let path = "html/about.html";
    let code = 200;
    let type = "text/html";
    route(response,path,code,type);
 }

 /* code for css */
 else if(request.url == "/css/homepage.css"){
    let path = "css/homepage.css";
    let code = 200;
    let type = "text/css";
    route(response,path,code,type);
 }

 /* code for js */
 else if(request.url == "/js/homepage.js"){
    let path = "js/homepage.js";
    let code = 200;
    let type = "text/javascript";
    route(response,path,code,type);
 }

 /* node-api routing */

 else if(request.url == "/api/signup"){
    signup.demo(request,response)
 }
 else if(request.url == "/api/login"){
    result(request,response);
 }
 else{
    let path = "html/not-found.html";
    let code = 404;
    let type = "text/html";
    route(response,path,code,type)
 }
 
});


server.listen(8080);
