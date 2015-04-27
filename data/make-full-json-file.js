// Read .csv files, and make the JSON file with a *complete* set of data.  More limited
// JSON files can be made from that.

var fs = require('fs');
var Baby = require('babyparse');

function readAndParseFile(fname) {
    var csvString = fs.readFileSync(fname, 'utf-8');
    var dataArray = Baby.parse(csvString, { header: true });
    return dataArray.data;
}

function fillInNames(record) {
    record.middlename = '';
    record.preferred = record.firstname;
    
    // Preferred specified explicitly
    matchdata = /([^()]+) \((\w+)\)/.exec(record.firstname);
    if (matchdata) {
        //console.log(matchdata);
        record.preferred = matchdata[2];
        record.firstname = matchdata[1];
    }

    // Folks with just a middle initial (or name)
    var matchdata = /(\w+) ([A-Za-z]+\.?)/.exec(record.firstname); 
    if (matchdata) {
        //console.log(matchdata);
        if (record.preferred === record.firstname) {
            record.preferred = matchdata[1];
        }
        record.middlename = matchdata[2];
        record.firstname = matchdata[1];
    }

    // First initial, middle name
    matchdata = /([A-Z]\.) (\w+)/.exec(record.firstname);
    if (matchdata) {
        //console.log(matchdata);
        if (record.preferred === record.firstname) {
            record.preferred = matchdata[2];
        }
        record.middlename = matchdata[2];
        record.firstname = matchdata[1];
    }
    
    return record;
}

function getFacStaffClass(jobtitle) {
    var classification = 'staff';
    if (/^((Associate )?Vice )?President/.test(jobtitle)) {
        //console.log(data[i].jobtitle);
        classification = 'Staff';
    }
    else if (/Professor/.test(jobtitle)) {
        //console.log(data[i].jobtitle);
        classification = 'Faculty';
    }    
    return classification;
}

function fillEmptyFields(record, fieldsList) {
    for (var i = 0; i < fieldsList.length; i++) {
        record[fieldsList[i]] = '';
    }
    return record;
}

function removeExtraFields(record, fieldsList) {
    for (var i = 0; i < fieldsList.length; i++) {
        delete record[fieldsList[i]];
    }
    return record;
}

function fixFacStaff(data) {
    var facEmptyFields = ['homeaddress', 'homecity', 'homestate', 'homezip', 'homephone', 
                          'degree', 'major1', 'major2'];
    
    for (var i = 0; i < data.length; i++) {
        // Fill in middle and preferred names
        data[i] = fillInNames(data[i]);
        data[i].classification = getFacStaffClass(data[i]);
        data[i].id = 101 + i;
        data[i] = fillEmptyFields(data[i], facEmptyFields);
    }
    
    return data;
}

function fixStudentClass(classification) {
    var fixes = {'Converse 1: non-degree': 'Non-degree',
                 'Converse 1: Freshman': '2018',
                 'Converse 1: Sophomore': '2017',
                 'Converse 1: Junior': '2016',
                 'Converse 1: Senior': '2015',
                 'Gradstudents': 'Graduate' };
    if (fixes.hasOwnProperty(classification)) {
        classification = fixes[classification];
    }
    else {
        classification = classification.replace('Converse 2: ', 'Converse II ');
    }
    return classification;
}

function pickFromList(list) {
    var idx = Math.floor(Math.random() * list.length);
    return list[idx];
}

function getDegree(classification) {
    var gradDegrees = ['EdS', 'MEd', 'MEd', 'MAT', 'MAT', 'MAT', 'MFA', 'MFT', 'MM'];
    var ugDegrees = ['BA', 'BA', 'BA', 'BA', 'BA', 'BA', 'BA', 'BA', 'BS', 'BS',
                    'BS', 'BS', 'BFA', 'BM'];

    var degree = '';
    if (/[Nn]on-degree/.test(classification)) {
        degree = '';
    }
    else if (classification === 'Graduate') {
        degree = pickFromList(gradDegrees);
    }
    else {
        degree = pickFromList(ugDegrees);
    }
    return degree;
}

function getMajor(classification, degree, major1) {
    //console.log(classification + ' "' + degree + '" ' + major1);
    var allMajors = {'BA': ['Economics', 'Accounting', 'Business Administration', 
                         'Psychology', 'History', 'Politics', 'Philosophy', 
                         'Religion', 'English', 'German Studies', 'Spanish', 
                         'Biology', 'Chemistry', 'Mathematics', 'Early Childhood Education',
                         'Elementary Education', 'Special Education', 'Art Education',
                         'Art Therapy', 'Studio Art', 'Theatre', 'Musical Theatre', 
                         'Music'],
        'BS': ['Economics', 'Accounting', 'Business Administration', 'Biology', 
               'Chemistry'],
        'BFA': ['Creative and Professional Writing', 'Studio Art', 'Interior Design'],
        'BM': ['Music Education', 'Music Therapy', 'Music History', 'Music Theory',
               'Performance'],
        'EdS': ['Literacy', 'Administration and Supervision'],
        'MEd': ['Art Education', 'Gifted Education', 'Administration and Supervision', 
                'Elementary Education', 'Advanced Studies', 'Special Education'],
        'MAT': ['Art Education', 'Early Childhood Education', 'Special Education', 
                'Secondary Education', 'Middle-level Education'],
        'MFA': ['Creative Writing'],
        'MFT': ['Marriage and Family Therapy'],
        'MM': ['Performance', 'Music Education']};
    
    var major = '';
    if (degree.length > 0) {
        if (classification === '2018' || classification === 'Converse II Freshman') {
            major = 'Undeclared';
        }
        else {
            var majorsList = allMajors[degree];
            while (major.length === 0 || major === major1) {
                major = pickFromList(majorsList);
            }
        }
    }
    return major;
}

function fixStudents(data) {
    var emptyFields = ['phone', 'jobtitle', 'dept'];
    var extraFields = ['major3', 'org1', 'org2', 'org3'];
    // var valList = {};
    
    for (var i = 0; i < data.length; i++) {
        data[i] = fillEmptyFields(data[i], emptyFields);
        data[i] = removeExtraFields(data[i], extraFields);
        data[i].classification = fixStudentClass(data[i].classification);
        data[i].degree = getDegree(data[i].classification);
        data[i].major1 = getMajor(data[i].classification, data[i].degree, '');
        if ((data[i].degree === 'BA' || data[i].degree === 'BS') 
                && (data[i].major1 !== 'Undeclared') && (data[i].major1 !== '')
                && (Math.random() < 0.3)) {
            data[i].major2 = getMajor(data[i].classification, data[i].degree,
                                      data[i].major1);
        }
        else {
            data[i].major2 = '';
        }
        
        // var val = data[i].degree;
        // if (valList.hasOwnProperty(val)) {
        //     valList[val] = valList[val] + 1;
        // }
        // else {
        //     valList[val] = 1;
        // }
    }
    // console.log(valList);
    return data;
}


console.log('make-full-json-file started');
//var allColumns = ['lastname', 'firstname', 'middlename', 'preferred', 'classification',
//                  'email', 'phone', 'building', 'room', 'homeaddress', 'homecity', 'homestate',
//                  'homezip', 'degree', 'major1', 'major2', 'jobtitle', 'dept'];
                  
// Read and write the faculty and staff
var facData = readAndParseFile('fac-staff-filtered.csv');
console.log('Parsed fac/staff');

// Process the faculty and staff
facData = fixFacStaff(facData);
//console.log(data);

// Do the students
var studentData = readAndParseFile('converse-directorystu-filtered.csv');
studentData = fixStudents(studentData);
//csvString = fs.readFileSync(, 'utf-8');
//console.log("read students");
//var facDataArray = Baby.parse(csvString, { header: true });
//console.log('Parsed fac/staff');

var data = studentData.concat(facData);

//console.log(data);
fs.writeFileSync('data-all.csv', Baby.unparse(data), { quotes: true });
fs.writeFileSync('data-all.json', JSON.stringify(data));

console.log('make-full-json-file done');