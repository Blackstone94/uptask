eventListeners();

function eventListeners() {
    document.querySelector('#formulario').addEventListener('submit',validarRegistro);
}

function validarRegistro(e){
    e.preventDefault();
    var usuario=document.querySelector('#usuario').value,
        password=document.querySelector('#password').value,
        tipo=document.querySelector('#tipo').value;
    if(usuario==='' || password===''){
        //campos vacios
        swal({
            type:'error',
            title: 'ooopss..',
            text: 'Los campos no deben estar vacios'            
        })
    }else{
        /*datos que se envian al servidor */
        var datos=new FormData();
        datos.append('usuario',usuario);
        datos.append('password',password);
        datos.append('accion',tipo);

        ///ajax
        var xhr = new XMLHttpRequest();

        //abir la conexion
        xhr.open('POST','includes/modelos/modelo-admin.php',true);

        //retorno de datos
        xhr.onload = function(){
            if(this.status===200){
                console.log(xhr.responseText);
            }
        }
        xhr.send(datos);
    }
}