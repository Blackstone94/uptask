<?php
//echo json_encode($_POST);
        $accion = $_POST['accion'];
        $tarea = $_POST['tarea'];
        $idProyecto=(int) $_POST['idProyecto'];
        if($accion==='crear'){
            try{
                $estado=0;
                //incluir conexion bd
                include '../funciones/conexion.php';
                $stmt=$conn->prepare("INSERT INTO tareas (nombre, id_proyecto, estado) values (?,?,?)");
                $stmt->bind_param("sii",$tarea,$idProyecto,$estado) ;
                $stmt->execute();
                if($stmt->affected_rows==1){
                    $respuesta=array(
                        'respuesta'=>'correcto',
                        'id_insertado'=>$stmt->insert_id,
                        'tipo'=>$accion,
                        'tarea'=>$tarea
                    );
                }else{
                    $respuesta=array(
                        'error'=>'Error al registrar',
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