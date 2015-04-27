<?php
if ($student-dir)
    if ($student) {
        echo firstname, lastname, preferred, email, homestate;
     }
    elseif ($faculty){
        echo firstname, lastname, middlename, preferred, email, homestate, classification, degree, major1, major2, major3, org1, org2, org3;
    }
    else() {
        echo preferred, lastname, email;
    }
else ($fac-staff-dir) {
    echo lastname, firstname, jobtitle, dept, building, room, email, phone;
   } 

?>