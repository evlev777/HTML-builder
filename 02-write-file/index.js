const { stdout, stdin, exit } = process;
const fs = require('fs');
const path = require('path');
const file = fs.createWriteStream(path.join(__dirname, 'text.txt'));

stdout.write('Enter your text\n');
stdin.on('data', (text) => {
  if (text.toString().trim() === 'exit') {
    exit();
  }

  file.write(text);
});

const onExitMessage = () => stdout.write('Goodbye');

process.on('exit', onExitMessage);
process.on('SIGINT', exit);