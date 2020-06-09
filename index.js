const http = require('http');
const path = require('path');
const fs = require('fs');

// Criando um servidor 
const server = http.createServer((req, res) => {
    // if(req.url === '/') {
    //     fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, content) => {
    //         if(err) throw err;
    //         res.writeHead(200, { 'Content-Type': 'text/html' });
    //         res.end(content);
    //     })
    // }

    // if(req.url === '/api/users') {
    //     const users = [
    //         { name: 'Peter Parker', age: 17 },
    //         { name: 'Steve Rogers', age: 30 },
    //         { name: 'Bruce Banner', age: 42 }
    //     ];
    //     res.writeHead(200, { 'Content-Type': 'application/json' });
    //     res.end(JSON.stringify(users));
    // }


    // Build file path
    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);

    // Extension of file
    let extname = path.extname(filePath);

    // Initial content type
    let contentType = 'text/html';

    // Check ext and set content type 
    switch(extname) {
        case ".js":
            contentType = 'text/javascript';
            break;
        case ".css":
            contentType = 'text/css';
            break;
        case ".json":
            contentType = 'application/json';
            break;
        case ".png":
            contentType = 'image/png';
            break;
        case ".jpg":
            contentType = 'image/jpg';
            break;
    }

      // Check if contentType is text/html but no .html file extension
    if (contentType == "text/html" && extname == "") filePath += ".html";

    // log the filePath
    console.log(filePath);
    
    // Read file
    fs.readFile(filePath, (err, content) => {
        if(err) {
            if(err.code == "ENOENT") {
                // Page not found
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end(content, 'utf8');
                })
            } else {
                // Some server error
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            // Success
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf8');
        }
    });
});


// Quando fazemos o deploy, a porta escolhida não será a 5000, mas aquela quer for escolhida pelo host
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));





// ====================================================== //

// Importar o objeto person nesta página
// Como estamos importando um arquivo (e não um módulo), é necessário indicar o path dele
// const person = require('./person')
// console.log(person);
// console.log(person.name);

// Importando a class Person 
// const Person = require('./person');

// Criando um novo objeto
// const person1 = new Person('Bruce Wayne', 40);

// person1.greeting();


// const Logger = require('./logger');

// const logger = new Logger();

// logger.on('message', (data) => console.log('Called Listener', data ));

// logger.log('Hello World!');
// logger.log('Hi!');
// logger.log('Hello!');
