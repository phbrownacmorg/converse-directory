console.log("Running");
var fs = require('fs');

var inString = fs.readFileSync('fac-staff-directory.csv', 'utf-8');
console.log('Read');

// Do the actual filtering
var outString = inString;

// Remove the <a href=""> tags
var re = new RegExp('<a href="[^"]*">', 'g');
outString = outString.replace(re, "");
re = new RegExp('</a>', 'g');
outString = outString.replace(re, "");

// Remove the td tags
re = new RegExp('<td [^>]*>','g'); // Open tags
outString = outString.replace(re, "");
re = new RegExp('</td>', 'g');
outString = outString.replace(re, "");



fs.writeFileSync('fac-staff-filtered.csv', outString);
console.log('Wrote');
