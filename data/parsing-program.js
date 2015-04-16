console.log("Running");
var fs = require('fs');
var pp = require('./papaparse.min.js')

var inString = fs.readFileSync('fac-staff-filtered.csv', 'utf-8');
console.log('Read');
function handleRequestOnCompletion(fn, urlStr) {
            var handlerFn = function handler(req) {
                if (req.readyState === 4) { // Response is complete (number is from the standard)
                    if (req.status === 200) {  // HTTP OK (code number is from the HTTP standard)
                        fn(req);
                    }
                }
            };
            handleRequestOnCompletion(handlerFn, urlStr);
        } 
 function handleInsertingStuff(eltID, urlStr) {
            // Use a closure to make the actual handler function, filling
            //    in the element name from the eltID argument.
            var handlerFn = function insertStuff(req) {
                var elt = document.getElementById(eltID);
                elt.innerHTML = req.responseText;
            };
            
            handleRequestOnCompletion(handlerFn, urlStr);
        }
    
function headerinsert(req) {
    var parseString = '"lastname","firstname","jobtitle","dept","building","room","email","phone",\r\n' + req.responseText;
    var data = Papa.parse(parseString, {header: true})
    };
    
function updateStationsTableCSV() {
            handleRequestOnCompletion(headerinsert, 'fac-staff-filtered.csv');
        }
    
fs.writeFileSync('fac-staff-parsed.csv', inString);
console.log('Wrote');