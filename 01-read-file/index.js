const { stdout } = process;
const fs = require('fs');
const path = require('path');

const readable = fs.createReadStream(path.join(__dirname, 'text.txt'));
readable.on('data', (text) => stdout.write(text.toString()));


