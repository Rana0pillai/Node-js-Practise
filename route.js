const fs = require('fs');

const requestHandler = (req,res) => {

const url = req.url;
const method = req.method;

if (url === "/") {

    res.setHeader('Content-Type','text/html');

    res.write(`<html>
                 <head>
                   <title>Js Page</title>
                     <body>
                       <form action="/message" method="POST">
                         <input type="text" name="name-message">
                         <input type="number" name="phone-message">
                         <button type="submit">Submit Input</button>
                       </form>
                     </body>
                 </head>
               </html>`);

    return res.end();
}

if (url === "/message" && method === 'POST') {

const body = [];
req.on('data',(chunk)=>{
    body.push(chunk)
});

req.on('end',()=>{
    const parcedBody = Buffer.concat(body).toString();
    fs.writeFile('message', parcedBody, err => {
        res.statusCode = 302;
        res.write(`<html>
                    <head>
                    <title>Js Page</title>
                        <body>
                        <h1> Welcome Mr.Rana Pillai </h1>
                        <h2> Error has been occured Sir </h2>
                        </body>
                    </head>
                </html>`);
        return res.end();
    })
 })
}

res.setHeader('Content-Type','text/html');
res.write(`<html>
             <head>
               <title>Js Page</title>
                 <body>
                   <h1>Welcome to node.js Mr.Rana Pillai</h1>
                 </body>
             </head>
           </html>`);
res.end();
};

module.exports = requestHandler;