<?php  
    include 'includes/funciones/sesiones.php';
    include 'includes/funciones/funciones.php';
    include 'includes/templates/header.php';
    include 'includes/funciones/conexion.php';
    include 'includes/templates/barra.php';
    
    if(isset($_GET['id_proyecto'])){
        $idProyecto=$_GET['id_proyecto'];
    }
    ?>


<div class="contenedor">
    <?php include 'includes/templates/sidebar.php' ?>

    <main class="contenido-principal">
    <?php $proyecto=obtenerNombreProyecto($idProyecto);
        if($proyecto):?>
            <h1>Proyecto actual:  
                <span><?php foreach($proyecto as $nombre):
                        echo $nombre['nombre'];
                        endforeach;
                ?></span>
            </h1>

            <form action="#" class="agregar-tarea">
                <div class="campo">
                    <label for="tarea">Tarea:</label>
                    <input type="text" placeholder="Nombre Tarea" class="nombre-tarea"> 
                </div>
                <div class="campo enviar">
                    <input type="hidden" id="id_proyecto" value="id_proyecto">
                    <input type="submit" class="boton nueva-tarea" value="Agregar">
                </div>
            </form>
        <?php else: ?>
            <p>Elige un proyecto de la izquierda</p>
        <?php endif?>                
        <h2>Listado de tareas:</h2>

        <div class="listado-pendientes">
            <ul>

                <li id="tarea:<?php echo $tarea['id'] ?>" class="tarea">
                <p>Cambiar el Logotipo</p>
                    <div class="acciones">
                        <i class="far fa-check-circle"></i>
                        <i class="fas fa-trash"></i>
                    </div>
                </li>  
            </ul>
        </div>
    </main>
</div><!--.contenedor-->
<?php  include 'includes/templates/footer.php'; ?>
