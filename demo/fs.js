const fs = require('fs');
const path = require('path');
const { connect } = require('http2');

// fs.mkdir(path.join(__dirname, 'test'), (err) => {
//     if (err) {
//         throw err;
//     }
//     console.log('Folder has been created');
// });


const filePath = path.join(__dirname, 'test', 'text.txt');

// // Создание нового файла (с заменой существующего)
// fs.writeFile(filePath, 'Hello nodeJS', err => {
//     if (err) {
//         throw err;
//     }

//     console.log('File has been created');
// });

// // Добавление содержимого в конец существующего файла
// fs.appendFile(filePath, '\nAppended text', err => {
//     if (err) {
//         throw err;
//     }

//     console.log('File has been updated');
// });

fs.readFile(filePath, 'utf-8', (err,content) => {
    if (err) { throw err; }

    console.log(content);

    // const data = Buffer.from(content);
    // console.log(`Content: ${data.toString()}`);
});