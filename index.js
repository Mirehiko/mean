const http = require('http');
const url = require('url');
const fs = require('fs');

var server = new http.Server;

// console.log('ASLDJLADJLASDJ')

server.listen(3000, '127.0.0.1'); //localhost

// var counter = 0;
console.log('Server is running')

server.on('request', function(req, res) {
    // res.end(`Hello world ${++counter}`);

    let parsedUrl = url.parse(req.url, true); //true означает что поле url нужно представить в виде объекта
    fs.readFile( `${getPageByPath(parsedUrl.pathname)}.html`, function(err, data) {
        if (err) {
            console.log(new Error(err), err);
        };
        res.end(data);
    });

    // res.end(parserUrl.query.q);
});

function getPageByPath(path) {
    switch(path) {
        case '/':
        case '/home': 
            return 'index';
        case '/about': 
            return 'about';
        case '/404': 
            return '404';
    }
}