// Convert JSON to CSV so I can see what is going on

var fs = require('fs');
var Baby = require('babyparse');

// Input file from the command line
var infile = process.argv[2];
var data = JSON.parse(fs.readFileSync(infile));
var outfile = infile.slice(0, -5) + '.csv';
console.log(outfile);
fs.writeFileSync(outfile, Baby.unparse(data));