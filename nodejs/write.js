const fs = require('fs');

const content = 'Hello, Node.js!';

fs.writeFile('sample.txt', content, (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('File written successfully!');
});