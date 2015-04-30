// Demo of basic PapaParse usage on cloud9 from the command line
// Before this will work, you need to type "npm install babyparse" at your command line

console.log("Running");
var fs = require('fs');
var Baby = require('babyparse');

var csvString = fs.readFileSync('converse-directorystu.csv', 'utf-8');
console.log("read file");
var jsonData = Baby.parse(csvString, { header: true });
console.log('Parsed');
//console.log(jsonData);

fs.writeFileSync('converse-directorystu-filtered-try.csv', Baby.unparse(jsonData));
console.log('Wrote');

// var infile = process.argv[2];
// var data = JSON.parse(fs.readFileSync(infile));
// var outfile = infile.slice(0, -5) + '.csv';
// console.log(outfile);
// fs.writeFileSync(outfile, Baby.unparse(data));