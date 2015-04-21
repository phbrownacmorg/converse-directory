<<<<<<< HEAD
// Add your javascript here
console.log("Running")
var fs = require("fs")

var inString = fs.readFileSync('fac-staff-directory.csv', 'utf-8');
console.log('Read');    

var outString = inString;

outString = outString.replace(/\n/g, "");
outString = outString.replace(/\t/g, "");
outString = outString.replace(/ [ \t]+/g, "")

    
var re = new RegExp('<a href="[^"]*">', 'g');
outString = outString.replace(re, "");
re = new RegExp('</a>', 'g');
outString = outString.replace(re, "");    

var re = new RegExp('<a href="[^"]*">', 'g');
outString = outString.replace(re, "");
re = new RegExp('</td>', 'g');
outString = outString.replace(re, "");  

fs.writeFileSync('fac-staff-filtered.csv', outString);

console.log('Wrote');

=======
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
outString = outString.replace(re, ",");

//Remove the tr tags
re = new RegExp('<tr [^>]*>','g'); // Open tags
outString = outString.replace(re, "");
re = new RegExp('</tr>', 'g'); //Closed tags
outString = outString.replace(re, "");

//Remove br tags
re = new RegExp('<br />', 'g');
outString = outString.replace(re, "");

fs.writeFileSync('fac-staff-filtered.csv', outString);
console.log('Wrote');
>>>>>>> 34a11e7129e27f024bdc6e8d50782640e5541216
