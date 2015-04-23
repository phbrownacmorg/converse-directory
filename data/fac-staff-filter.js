console.log("Running");
var fs = require('fs');

var inString = fs.readFileSync('fac-staff-directory.csv', 'utf-8');
console.log('Read');

// Do the actual filtering
var outString = inString;

// Typo correction
outString = outString.replace(/ and and /g, ' and ');
var re = new RegExp('/ ', 'g');
outString = outString.replace(re, '/');

// Remove the extra white space
outString = outString.replace(/\n/g, "");  // Newlines
outString = outString.replace(/\t/g, "");  // Tabs
outString = outString.replace(/ [ \t]+/g, ''); // Sequences of more than one space

// Remove ' Room '
outString = outString.replace(/ Room /g,' ');
outString = outString.replace(/ Suite /g,' ');

// Special cases
outString = outString.replace(/Wilson Hall/g,'Wilson');
outString = outString.replace(/Carmichael Hall/g,'Carmichael');
outString = outString.replace(/Kuhn Hall/g,'Kuhn');
outString = outString.replace(/Kuhn 3rd Floor/g,'Kuhn');

// Ensure that the folks without contact info have the <br /> tags to end up with the right fields
re = new RegExp('<td class="views-field views-field-field-facstaff-phone-value">\s*</td>', 'g');
outString = outString.replace(re, '<td class="views-field views-field-field-facstaff-phone-value">","","","</td>');

// Remove the <a href=""> tags
re = new RegExp('<a href="[^"]*">', 'g');
outString = outString.replace(re, "");
re = new RegExp('</a>', 'g');
outString = outString.replace(re, "");

// Remove the td tags
outString = outString.replace(/<td [^>]*>/,'\r\n"');  // First open td gets a newline
re = new RegExp('<td [^>]*>','g'); // Open tags
outString = outString.replace(re, '"');
re = new RegExp('</td>', 'g');
outString = outString.replace(re, '",');

//Remove the tr tags
re = new RegExp('<tr [^>]*>','g'); // Open tags
outString = outString.replace(re, "");
re = new RegExp('</tr>', 'g'); //Closed tags
outString = outString.replace(re, "\r\n");

//Remove br tags
re = new RegExp('<br />864\.', 'g');  // <br /> before phone number
outString = outString.replace(re, '","864.');
re = new RegExp(', ([^",]+)<br />', 'g'); // When the office has a room number
outString = outString.replace(re, '","$1","'); 
re = new RegExp('<br />', 'g'); // When the office has no room number (must come after the ones with room numbers have been changed)
outString = outString.replace(re, '",,"'); 

// Strip off the comma after the phone number
outString = outString.replace(/,\r\n/g,'\r\n');


fs.writeFileSync('fac-staff-filtered.csv', outString);
console.log('Wrote');
