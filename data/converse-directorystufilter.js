console.log("Running");
var fs = require('fs');
var pp = require('./papaparse.min.js');


var inString = fs.readFileSync('converse-directorystu.csv', 'utf-8');
console.log('Read');

// Do the actual filtering
var outString = inString;

// Fix phone format
outString = outString.replace(/\d-\((\d\d\d)\)(\d\d\d)-(\d\d\d\d)/g, '$1.$2.$3');

Papa.parse('converse-directorystu.csv', { //Papa undefined no matter what, even in source file. Where do I use "pp?"
	delimiter: "",	// auto-detect
	newline: "",	// auto-detect
	header: true,
	complete: function(results) {
		console.log("Finished:", results.data);
	}
});




fs.writeFileSync('converse-directorystu-filtered.csv', outString);
console.log('Wrote');
