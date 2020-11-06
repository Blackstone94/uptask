<?php
    $nombre=$_POST['proyecto'];
    $accion=$_POST['accion'];

    if($accion==='crear'){
        include '../funciones/conexion.php';
        try{
            $stmt=$conn->prepare("INSERT INTO proyectos (nombre) VALUES (?) ");
            $stmt->bind_param('s', $nombre);
            $stmt->execute();
            if($stmt->affected_rows == 1){
                $respuesta=array(
                    'respuesta'=>'correcto',
                    'id_insertado'=>$stmt->insert_id,
                    'nombre'=>$nombre,
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
?>