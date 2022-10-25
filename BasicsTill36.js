//? ---- node file_nmae.js to execute ----
//! ---- ctrl + c to stop the js running ----

const http = require('http');
//* data type const is used bcz the value of this variable is not going to change so
//* Used to create a http server

const fs = require('fs');
//* Used to create a file
  
const server = http.createServer((req, res) => {
//* A method which helps us to create a server  

    // console.log(req.url, req.method, req.headers);
    //? Printed the url, method and headers in terminal which we recieve as request while we hit the created link in a browser  

    const url = req.url;
    //* Variable used to store the url we hit 

    const method = req.method;
    //* Variable used to store the method used when we hit the url 

    if (url === "/") {
    //* condition used to check url 

        res.setHeader('Content-Type','text/html');
        //* Recognizing the type of content provided through setHeader() method 

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
        //* writing the html code in text format through write() method which will be executed when we hit the url

        return res.end();
        //* return statement which is mandatory to mention at the end other wise it execute further code written outside the if(){} statement
        //* end() method is used to end the code we written for response
    }

    if (url === "/message" && method === 'POST') {
    //* condition used to check url and method

    const body = [];
    req.on('data',(chunk)=>{
        console.log(chunk);
        //* (<Buffer 6e 61 6d 65 2d 6d 65 73 73 61 67 65 3d 52 61 6e 61 2b 50 69 6c 6c 61 69 26 70 68 6f 6e 65 2d 6d 65 73 73 61 67 65 3d 31 32 33 34 35 36>)
        body.push(chunk)
    });

    req.on('end',()=>{
    const parcedBody = Buffer.concat(body).toString();

     console.log("Data received >>>>>",body.toString())
     //* (Data received >>>>> name-message=Rana+Pillai&phone-message=8108337979)
     console.log("Buffer data received >>>>>",Buffer.concat(body).toString())
     //* Buffer is used as a bus-stop for all the data we recieve  
     //* (Buffer data received >>>>> name-message=Rana+Pillai&phone-message=8108337979)

    //// const recievedData = parcedBody.split('=')[1];

    //* There are two methods to create a file through js writeFileSync() and writeFile() 
    //  fs.writeFileSync('message', parcedBody);
    //? writeFileSync() is used bcz it don't allow the next line to be executed untill the file has been created
    //? writeFileSync() has a drawback if we are working on a big project then it is wrong to block the code execution in middle
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
    //* writeFile() is used bcz it allow the next line to be executed even if the file is not created 
    //* we have mentioned the condition to handle the error

    })
        // res.setHeader('Content-Type','text/html');
        //? setHeader() method has been commented bcz without using this too the html code can be executed

        // fs.writeFileSync('message.txt','Hello Rana Pillai');
        //? writeFileSync() method is used to create a file 
        //! --written for writeFileSync() STARTING FROM HERE
        // res.statusCode = 302;
        //? statusCode to set customized status which will displayed in network section of browser
        
        // res.setHeader('Location','/')
        //? setHeader() method is used to give path for the file created 

        // res.write(`<html>
        //              <head>
        //                <title>Js Page</title>
        //                  <body>
        //                    <h1>Welcome Mr.Rana Pillai</h1>
        //                    <h2>Entered inside the condition <h1>&</h1> Data stored successfully.</h2>
        //                  </body>
        //              </head>
        //            </html>`);

        // return res.end();
        //! --written for writeFileSync() ENDING HERE
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

    // process.exit();
    //? process.exit() method is used to end the running code in terminal after executing once in a browser   
})

server.listen('2000')