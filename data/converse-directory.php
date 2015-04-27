<?php
if ($student-dir){
    if ($privileged){
        echo data-all.json;
    }/* everything */
    
    elseif ($student) {
        echo data-studentview.json;
     }/* all student data */
     
    elseif ($faculty){
        echo data-facultyview.json;
    }/* student data *except* room, building */
    
    elseif ($staff){
        echo data-staffview.json;
    }/* student data *except* room, building, and phone */
    
    else() {
        echo data-anyone.json;
    }/* student data *except* room, building, phone, homeaddress, homezip, homephone */
}    
else ($fac-staff-dir) {
    if ($privileged){
        echo data-all.json;
    }/* everything */
    
    elseif ($student) {
        echo data-studentview.json;
    }/* faculty/staff data *except* homeaddress, homecity, homestate, homezip, homephone */
     
    elseif ($faculty){
        echo data-facultyview.json;
    }/* all info on faculty and staff */
    
    elseif ($staff){
        echo data-staffview.json;
    }/* all info on faculty and staff */
    
    else() {
        echo data-anyone.json;
    }/* faculty/staff data *except* homeaddress, homecity, homestate, homezip, homephone */
}
?>