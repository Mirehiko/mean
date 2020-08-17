// const chalk = require('chalk');

// console.log(chalk.blue('Hello'))

const http = require('http');
const fs = require('fs');
const path = require('path');
const { dirname } = require('path');


const server = http.createServer((req, res) => {

    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);
    const ext = path.extname(filePath);
    let contentType = 'text/html';

    switch(ext) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascipt';
            break;
        default:
            contentType = 'text/html';
    }

    if(!ext) {
        filePath += '.html';
    }

    console.log(filePath, contentType, ext);

    fs.readFile(filePath, (err, content) => {
        if (err) {
            fs.readFile(path.join(__dirname, 'public', '404.html'), (err, data) => {
                if (err) {
                    res.writeHead(500);
                    res.end('Error');
                }
                
                res.writeHead(200, {
                 'Content-Type': contentType
                });

                res.end(data);
            });
        } else {
            res.writeHead(200, {
                'Content-Type': contentType
            });

            res.end(content);
        }
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server has been started on ${PORT}...`);
});