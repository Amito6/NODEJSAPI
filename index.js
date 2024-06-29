const http = require("http");
const server = http.createServer((request,response)=>{
 response.write("success");
 response.end();
});
server.listen(8080);
