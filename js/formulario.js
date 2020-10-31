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
            console.log(this.status);
            if(this.status===200){
                var respuesta=JSON.parse(xhr.responseText);
                if(respuesta.respuesta==='correcto'){
                    if(respuesta.tipo==='crear'){
                        swal({
                            type:'success',
                            title: 'Correcto',
                            text: 'Registro guardado'
                        });
                    }else if(respuesta.tipo==='login'){
                        swal({
                            type:'success',
                            title: 'Login correcto',
                            text: 'Presiona ok para abrir el Dashboard'
                        }).then(resultado=>{
                            if(resultado.value){
                                window.location.href='index.php';
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
            }
        }
        xhr.send(datos);
    }
}