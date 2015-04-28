// Given data-all.json, create the JSON files for the restricted views of the data.
// The files created are these:
// data-facultyview.json:
//    - all faculty/staff data
//    - all student data except on-campus building and room
// data-staffview.json:
//    - all faculty/staff data
//    - all student data except on-campus building, room, and phone
// data-studentview.json:
//    - all faculty/staff data except home address, city, state, zip, and home phone
//    - all student data
// data-anyone.json:
//    - all faculty/staff data except home address, city, state, zip, and home phone
//    - all student data except home address, zip, home phone, on-campus building, room, and phone

var fs = require('fs');
// Read in all data
var allData = JSON.parse(fs.readFileSync('data-all.json', 'utf-8'));

function setFieldsBlank(record, fieldsList) {
    for (var i = 0; i < fieldsList.length; i++) {
        record[fieldsList[i]] = '';
    }
    return record;
}

function writeRestrictedView(filename, filterFn) {
    var newView = JSON.parse(JSON.stringify(allData));
    for (var i = 0; i < newView.length; i++) {
        newView[i] = filterFn(newView[i]);
    }
    fs.writeFileSync(filename, JSON.stringify(newView));
}

function blankInfo(studentFields, facStaffFields) {
    var fn = function(record) {
        //console.log(studentFields); 
        // if student
        if ((record.classification !== 'Faculty') && (record.classification !== 'Staff')) {
            if (studentFields) {
                record = setFieldsBlank(record, studentFields);
            }
        }
        // else faculty/staff
        else if (facStaffFields) {
            record = setFieldsBlank(record, facStaffFields);
        }
        return record;
    };
    return fn;
}

// Faculty view
writeRestrictedView('data-facultyview.json', blankInfo(['building', 'room'], null));
// Staff view
writeRestrictedView('data-staffview.json', blankInfo(['building', 'room', 'phone'], null));
// Student view
writeRestrictedView('data-studentview.json', 
    blankInfo(null, ['homeaddress', 'homecity', 'homestate', 'homezip', 'homephone']));

// Open view
writeRestrictedView('data-anyone.json',
    blankInfo(['building', 'room', 'phone', 'homeaddress', 'homezip', 'homephone'],
        ['homeaddress', 'homecity', 'homestate', 'homezip', 'homephone']));
