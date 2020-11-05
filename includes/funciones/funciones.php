<?php
    function obtenerPaginaActual(){
        $archivo=basename($_SERVER['PHP_SELF']);
        $pagina=str_replace(".php","",$archivo);
        return $pagina;
    }

    function obtenerProyectos(){
        include 'conexion.php';
        try{
            return $conn->query("SELECT * FROM proyectos order by(id)");
        }catch(Exception $e){
            echo 'Error: '. $e->getMessage();
            return false;
        }
    }
    function obtenerNombreProyecto($id = null){
        include 'conexion.php';
        try{
           return $conn->query("SELECT nombre FROM proyectos where id = {$id}");
        }catch(Exception $e){
            echo 'Error: '. $e->getMessage();
            return false;
        }
    }
    function obtenerTareas($id = null){
        include 'conexion.php';
        try{
           return $conn->query("SELECT id,nombre,estado FROM tareas where id_proyecto = {$id} order by(id)");
        }catch(Exception $e){
            echo 'Error: '. $e->getMessage();
            return false;
        }
    }