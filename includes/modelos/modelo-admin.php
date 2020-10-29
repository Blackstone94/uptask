<?php

    $usuario=$_POST['usuario'];
    $password=$_POST['password'];
    $accion = $_POST['accion'];
    if($accion==='crear'){

        //codigo para crear los administradores
        $opciones = array(
            'cost'=>12
        );
        $hash_password=password_hash($password,PASSWORD_BCRYPT,$opciones);

        $respuesta=array(
            'pass' => $hash_password
        );
        
        echo json_encode($respuesta);
    }
    else if($accion=='login'){
        //codigo que loguee 
    }