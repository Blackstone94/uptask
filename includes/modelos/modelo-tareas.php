<?php
//echo json_encode($_POST);
        $accion = $_POST['accion'];
        if($accion==='crear'){
            try{
                $tarea = $_POST['tarea'];
                $idProyecto=(int) $_POST['idProyecto'];
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
        }else if($accion==='modificar'){
            try{
                $estado=(int)$_POST['estado'];
                $idTarea=(int)$_POST['idTarea'];

                //incluir conexion bd
                include '../funciones/conexion.php';
                $stmt=$conn->prepare("UPDATE tareas SET estado=? WHERE id=?");
                $stmt->bind_param("ii",$estado,$idTarea);
                $stmt->execute();

                if($stmt->affected_rows==1){
                    $respuesta=array(
                        'respuesta'=>'correcto'
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
        }else if($accion=='eliminar'){
            try{
                $idTarea=(int)$_POST['idTarea'];

                //incluir conexion bd
                include '../funciones/conexion.php';
                $stmt=$conn->prepare("DELETE FROM tareas  WHERE id=?");
                $stmt->bind_param("i",$idTarea);
                $stmt->execute();

                if($stmt->affected_rows==1){
                    $respuesta=array(
                        'respuesta'=>'correcto'
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