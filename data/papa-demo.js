// Demo of basic PapaParse usage on cloud9 from the command line
// Before this will work, you need to type "npm install babyparse" at your command line

console.log("Running");
var fs = require('fs');
var Baby = require('babyparse');

var csvString = fs.readFileSync('fac-staff-filtered.csv', 'utf-8');
console.log("read file");
var jsonData = Baby.parse(csvString, { header: true });
console.log('Parsed');
console.log(jsonData);