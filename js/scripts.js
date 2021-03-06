eventsListeners();
//lista de proyectos
var listaProyectos=document.querySelector('ul#proyectos');
function eventsListeners(){
    document.addEventListener('DOMContentLoaded',function(){
        actualizarProgresoProyecto();
    });
    //boton para crear proyectos
    document.querySelector('.crear-proyecto a').addEventListener('click',nuevoProyecto);
    //boton para crear una nueva tarea
    document.querySelector('.nueva-tarea').addEventListener('click',agregarTarea);
    //acciones de las tareas
    document.querySelector('.listado-pendientes').addEventListener('click',accionesTareas);
}
function nuevoProyecto(e){
    e.preventDefault();
    var nuevoProyecto=document.createElement('li');
    nuevoProyecto.innerHTML ='<input type="text" id=nuevo-proyecto>';
    listaProyectos.appendChild(nuevoProyecto);

    var inputNuevoProyecto=document.querySelector('#nuevo-proyecto');
    inputNuevoProyecto.addEventListener('keypress',function(e){
        var tecla=e.which || e.keyCode;

        if(tecla==13){
            guardarProyectoDb(inputNuevoProyecto.value);
            listaProyectos.removeChild(nuevoProyecto);
        }
    });
}
function guardarProyectoDb(nombreProyecto){
    ///ajax
    var xhr=new XMLHttpRequest();
    var datos =new FormData();
    datos.append('proyecto',nombreProyecto);
    datos.append('accion','crear'); 
    //abrir conexion
    xhr.open('POST','includes/modelos/modelo-proyecto.php',true);

    xhr.onload = function(){
        if(this.status === 200){
            var respuesta=JSON.parse(xhr.responseText);
            if(respuesta.respuesta==='correcto'){
                if(respuesta.tipo==='crear'){
                    var nuevoProyecto=document.createElement('li');
                    nuevoProyecto.innerHTML=`
                    <a href="index.php?id_proyecto=${respuesta.id_insertado}" id=${respuesta.id_insertado}">
                        ${respuesta.nombre}
                    </a>
                      `;
                    listaProyectos.appendChild(nuevoProyecto);
                    swal({
                        type:'success',
                        title: 'Proyecto creado',
                        text: 'El proyecto: '+respuesta.nombre+ 'se creo correctamente'
                    }).then(resultado=>{
                        if(resultado.value){
                            window.location.href='index.php?id_proyecto='+respuesta.id_insertado;
                        }
                    });
                }
            }else{
                swal({
                    type: 'error',
                    title: 'Error',
                    text: respuesta.error
                });
            }
            console.log(xhr.responseText);
        
        }
    };
    xhr.send(datos);
}

function agregarTarea(e){
    e.preventDefault();
    var nombreTarea=document.querySelector('.nombre-tarea').value;
    if(nombreTarea==''){
        swal({
            type:'error',
            title: 'Nombre en blanco',
            text: 'Debes de escribir el nombre de la tarea'})
    }else{
        var datos=new FormData();
        datos.append('accion','crear');
        datos.append('tarea',nombreTarea);
        datos.append('idProyecto',document.querySelector('#id_proyecto').value);

        //crear ajax
        var xhr=new XMLHttpRequest();
        //abir conexion
        xhr.open('POST','includes/modelos/modelo-tareas.php',true);
        //respuesta
        xhr.onload=function(){
            if(this.status===200){
                //todo correcto
                var respuesta=JSON.parse(xhr.responseText);

                var resultado=respuesta.respuesta,
                tarea=respuesta.tarea,
                id_insertado=respuesta.id_insertado,
                tipo=respuesta.tipo;
               
                if(resultado==='correcto'){
                    if(tipo==='crear'){
                        swal({
                            type:'success',
                            title: 'Tarea creada',
                            text: 'La tarea: '+tarea+' se creo correctamente'
                        });
                        //quitar letrero de no hay tareas
                    
                        var listaVacia=document.querySelectorAll('.lista-vacia');
                        if(listaVacia.length > 0){
                            document.querySelector('.lista-vacia').remove();
                        }

                        var nuevaTarea=document.createElement('li');
                        nuevaTarea.id='tarea'+id_insertado;
                        nuevaTarea.classList.add('tarea');
                        nuevaTarea.innerHTML=`
                            <p>${tarea}</p>
                            <div class="acciones">
                            <i class="far fa-check-circle"></i>
                            <i class="fas fa-trash"></i>
                        `;
                        var listaTareas=document.querySelector('.listado-pendientes ul');
                        listaTareas.appendChild(nuevaTarea);
                        document.querySelector('.agregar-tarea').reset();
                        actualizarProgresoProyecto();
                    }
                }else{
                    swal({
                        type:'error',
                        title: 'Error',
                        text: respuesta.error
                    });
                }

            }
        }
        //ejecutar
        xhr.send(datos);
    }

}
function accionesTareas(e){
    e.preventDefault();
    if(e.target.classList.contains('fa-check-circle')){
        if(e.target.classList.contains('completo')){
            e.target.classList.remove('completo')
            cambiarEstadoTareas(e.target,0);
        }else{
            e.target.classList.add('completo');
            cambiarEstadoTareas(e.target,1);
        }
        console.log('tareas');
    }else if(e.target.classList.contains('fa-trash')){
        swal({
            title: "Estas seguro(a)?",
            text: "Esta accion no se puede deshacer",
            type: 'warning',
            showCancelButton:true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor:'#d33',
            confirmButtonText:'Si, borrar!',
            cancelButtonText:'Cancelar'
          })
          .then((willDelete) => {
            if (willDelete) {
                //Eliminar de HTML
                var tareaEliminar=e.target.parentElement.parentElement;
                tareaEliminar.remove();
                //Eliminar de base de datos
                eliminarTarea(e.target);

                swal({
                    type:'success',
                    title: 'Tarea eliminada',
                    text: 'La tarea:  se elimino correctamente'
                });
            } else {
              swal("Your imaginary file is safe!");
            }
          });
    }
    actualizarProgresoProyecto();
}
function cambiarEstadoTareas(tarea,estado){
   // console.log();
    var idTarea=tarea.parentElement.parentElement.id.split(':');
    var datos=new FormData();
    datos.append('idTarea',idTarea[1]);
    datos.append('accion','modificar');
    datos.append('estado',estado);
    //ajax
    var xhr=new XMLHttpRequest();
    //abrir conexio
    xhr.open('POST','includes/modelos/modelo-tareas.php',true);
    //respuesta
    xhr.onload=function(){
        if(this.status===200){//ejecutado correctamente
            console.log(xhr.responseText);
            var respuesta=JSON.parse(xhr.responseText);
            if(respuesta.respuesta==='correcto'){

            }else{
                swal({
                    type:'error',
                    title: 'Error',
                    text: respuesta.error
                });
            }
        }
    }
    xhr.send(datos);
   // tarea.parentElement.parentElement.id.split(':')
}

function eliminarTarea(tarea){
    // console.log();
     var idTarea=tarea.parentElement.parentElement.id.split(':');
     var datos=new FormData();
     datos.append('idTarea',idTarea[1]);
     datos.append('accion','eliminar');
     //ajax
     var xhr=new XMLHttpRequest();
     //abrir conexio
     xhr.open('POST','includes/modelos/modelo-tareas.php',true);
     //respuesta
     xhr.onload=function(){
         if(this.status===200){//ejecutado correctamente
             console.log(xhr.responseText);
             var respuesta=JSON.parse(xhr.responseText);
             if(respuesta.respuesta==='correcto'){
                var tareas=document.querySelectorAll('li.tarea');
                if(tareas.length===0){
                    document.querySelector('.listado-pendientes').innerHTML=`
                    <p class="lista-vacia"> No hay tareas en este proyecto </p>
                    `;
                }
             }else{
                 swal({
                     type:'error',
                     title: 'Error',
                     text: respuesta.error
                 });
             }
         }
     }
     xhr.send(datos);
     actualizarProgresoProyecto();
    // tarea.parentElement.parentElement.id.split(':')
 }
 function actualizarProgresoProyecto(){
    //optener todas las tareas 
    const tareas=document.querySelectorAll('li.tarea');
    //obtener las tareas copletas
    const tareasCompletadas=document.querySelectorAll('i.completo');
    //determinar el abacne
    const avance=Math.round(( tareasCompletadas.length / tareas.length)*100);
    const porcentaje = document.querySelector('#porcentaje');
    porcentaje.style.width=avance+"%";
    if(avance===100){
        swal({
            type:'success',
            title: 'Finalizado',
            text: 'Haz terminado este proyecto'
        });
    }
 }