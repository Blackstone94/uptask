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

        //incluir conexion bd
        include '../funciones/conexion.php';
        $stmt=$conn->prepare("INSERT INTO usuarios (usuario, password) values (?,?)");
        $stmt->bind_param("ss",$usuario,$hash_password);
        $stmt->execute();
        if($stmt->affected_rows==1){
            $respuesta=array(
                'respuesta'=>'correcto',
                'id_insertado'=>$stmt->insert_id,
                'tipo'=>'crear'
            );
        }else{
            $respuesta=array(
                'respuesta'=>'error'
            );
        }

        $stmt->close();
        $conn->close();
        echo json_encode($respuesta);
    }
    else if($accion=='login'){
        //codigo que loguee 
    }