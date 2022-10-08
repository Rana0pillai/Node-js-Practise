const http = require('http');
const server = http.createServer((req,res)=>{
    // console.log(req.url, req.method, req.headers);
    const url = req.url;
    if(url === "/"){
    res.setHeader('Content-Type','text/html');
    res.write('<html><head><title>Js Page</title><body><form action="/message" method="POST"><button type="submit">Go to NEXT Page</button></form></body></head></html>');
    return res.end();
    }

    res.setHeader('Content-Type','text/html');
    res.write('<html><head><title>Js Page</title><body><h1>Welcome to node.js Mr.Rana Pillai</h1></body></head></html>');
    res.end();

    
    // process.exit();
})
server.listen('2000')