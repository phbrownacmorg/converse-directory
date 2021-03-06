// Common functions for the directory pages

var colTitles = {'lastname': 'Last name', 'firstname': 'First name', 'preferred': 'Preferred name', 
                 'middlename': 'Middle name', 'classification': 'Class', 'email': 'Email', 'phone': 'Phone',
                 'building': 'Building', 'room': 'Room', 'jobtitle': 'Position', 'dept': 'Department', 
                 'homeaddress': 'Home address', 'homecity': 'Home city', 'homestate': 'Home state', 
                 'homezip': 'Home zip code', 'homephone': 'Home phone'};

$(document).ready(function() {
    // Function for displaying the data in a table
    var loadTable = function(data, filterFn) {
        //alert('Loading table');
        // Get rid of all the table rows
        //$('#results tr').remove();
        
        // Insert the rows from the given data object
        //   First, the header row
        $('#results table').append('<tr class="header"></tr>');
        var cols = ['lastname', 'firstname', 'preferred', 'middlename', 'classification', 'email', 'phone', 'building', 
                    'room', 'jobtitle', 'dept', 'homeaddress', 'homecity', 'homestate', 'homezip', 'homephone'];
        //alert(cols);
        //alert(colTitles);
        for (var i = 0; i < cols.length; i++) {
            //alert(cols[i] + ' ' + colTitles[cols[i]]);
            // There is only one tr at this point
            $('#results tr').append('<th></th>');
            $('#results tr > th:last').html(colTitles[cols[i]]);
        }
        //alert('Table done');
        
        // Fill the rows
        for (var j = 0; j < data.length; j++) {
            $('#results table').append('<tr></tr>');
            for (var i = 0; i < cols.length; i++) {
                $('#results tr:last').append('<td></td>');
                $('#results tr:last > td:last').html(data[j][cols[i]]);
            }
        }
    };
    
    // Get data
    var dirdata = $.getJSON('data/data-anyone.json', function(data) {
        //alert('reading...');
        loadTable(data, null);
        //alert('read.');
    });
    
    
});