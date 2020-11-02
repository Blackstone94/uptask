eventsListeners();
//lista de proyectos
var listaProyectos=document.querySelector('ul#proyectos');
function eventsListeners(){
    //boton para crear proyectos
    document.querySelector('.crear-proyecto a').addEventListener('click',nuevoProyecto);
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
    xhr.open('POST','includes/modelos/modelo-proyecto.php');

    xhr.onload = function(){
        if(this.status === 200){
            console.log(xhr.responseText);
            var respuesta=JSON.parse(xhr.responseText);
        
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