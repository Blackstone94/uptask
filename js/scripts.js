eventsListeners();
//lista de proyectos
var listaProyectos=document.querySelector('ul#proyectos');
function eventsListeners(){
    //boton para crear proyectos
    document.querySelector('.crear-proyecto a').addEventListener('click',nuevoProyecto);

    document.querySelector('.nueva-tarea').addEventListener('click',agregarTarea);
    
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

  /*  var nuevoProyecto=document.createElement('li');
    nuevoProyecto.innerHTML=`
    <a href="#">
        ${nombreProyecto}
    </a>
    `;
    listaProyectos.appendChild(nuevoProyecto);*/
}
function agregarTarea(e){
    e.preventDefault();
    var nombreTarea=document.querySelector('.nombre-tarea').value;
    if(nombreTarea==''){
        swal({
            type:'error',
            title: 'Nombre en blacno',
            text: 'Debes de escribir el nombre de la tarea'})
    }
}