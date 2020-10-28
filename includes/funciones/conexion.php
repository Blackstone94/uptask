<?php 
    $conn=new mysqli('localhost:8889','root','root','uptask');
    if($conn->connect_error){
        echo $conn->connect_error;
    }
    $conn->set_charset('utf-8');//aparezcan los caracteres    
?> 