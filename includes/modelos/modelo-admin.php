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
        try{
            //incluir conexion bd
            include '../funciones/conexion.php';
            $stmt=$conn->prepare("INSERT INTO usuarios (usuario, password) values (?,?)");
            $stmt->bind_param("ss",$usuario,$hash_password);
            $stmt->execute();
            if($stmt->affected_rows==1){
                $respuesta=array(
                    'respuesta'=>'correcto',
                    'id_insertado'=>$stmt->insert_id,
                    'tipo'=>$accion
                );
            }else{
                $respuesta=array(
                    'error'=>'Error al registrar'
                );
            }

            $stmt->close();
            $conn->close();
        }catch(Exception $e){
            $respuesta=array(
                'error' => $e->getMessage()
            );
        }
        echo json_encode($respuesta);
    }
    else if($accion=='login'){
        //codigo que loguee 
        include '../funciones/conexion.php';
        try{
            $stmt=$conn->prepare("SELECT id,usuario,password FROM usuarios WHERE usuario=?");
            $stmt->bind_param('s',$usuario);
            $stmt->execute();
            $stmt->bind_result($idUsuario,$nombreUsuario,$passwordUsuario);
            $stmt->fetch();
            if($nombreUsuario){
                //nombre usuario existe
                if(password_verify($password,$passwordUsuario)){
                    //password correcto
                    $respuesta=array(
                        'respuesta'=>'correcto',
                        'tipo'=>$accion
                    );
                    session_start();
                    $_SESSION['nombre']=$usuario;
                    $_SESSION['id']=$idUsuario;
                    $_SESSION['login']=true;
                }else{
                    $respuesta=array(
                        'error'=>'Password incorrecto'
                    );
                }

            }else{
                $respuesta=array(
                    'error'=> 'No existe el usuario'
                );
            }
            $stmt->close();
            $conn->close();
        }catch(Exception $e){
            $respuesta=array(
                'respuesta' => $e->getMessage()
            );
        }
        echo json_encode($respuesta);
    }