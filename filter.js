const fs = require('fs');

//Not working because json2csv is putting eol markers where they shouldn't be.

// Check for version number in command line.
if (process.argv.length != 3) {
  const err = new Error('Wrong number of arguments.');
  console.error(err.message);
  process.exit(1);
}
let version = process.argv[2];

const featuresBuffer = fs.readFileSync('features.csv');
const features = featuresBuffer.toString();
const lines = features.split('###');
for (let line in lines) {
  // For some odd reason, line turns out to be the index in lines as a string.
  let cellsStr = lines[parseInt(line)];
  let cells = cellsStr.split('%');
  if (cells[4] == version) {
    fs.appendFile('filtered.csv', cellsStr, (err) => {
      if (err) throw err;
    })
  }
}
