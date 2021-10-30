import { Anuncio } from "./anuncio.js";
import { crearTabla } from "./tabla.js";

const $divTabla = document.getElementById("divTabla");

const anuncios =  JSON.parse( localStorage.getItem( 'anuncios' )) || [] ;

const $formulario = document.forms[0];

actualizarTabla();

localStorage.setItem('anuncios', JSON.stringify(anuncios));

///RECUPERACION DE ID POR DELEGACION DE EVENTOS
///MANEJO DEL BOTON DELETE
window.addEventListener("click", (e)=>{

    if(e.target.matches("td")){
        
        let id = e.target.parentElement.id;

        cargarFormulario(anuncios.find((anuncio)=> anuncio.id == id));
    }
    else if(e.target.matches("#btnDelete")){
        handlerDelete(parseInt($formulario.txtId.value));
        $formulario.reset();
    }
});

$formulario.addEventListener("submit", (e) => {
    
    //PREVIENE EL ENVIO DEL SUBMIT POR DEFECTO
    e.preventDefault();

    ///MODIFICAR DE ACUERDO A LA CONSIGNA (CAMPOS DEL FORMULARIO)
    const {txtId, txtTitulo, txtTransaccion, txtDescripcion, txtPrecio, txtBanos, txtAutos, txtDormitorios} = $formulario;
    
    ///MODIFICAR DE ACUERDO A LA CONSIGNA (CAMPOS DEL OBJETO)
    const formAnuncio = new Anuncio(txtId.value, txtTitulo.value, txtTransaccion.value, txtDescripcion.value, txtPrecio.value, txtBanos.value, txtAutos.value, txtDormitorios.value);
    
    if(formAnuncio.txtId === ''){
        //ALTA
        formAnuncio.id = Date.now();
        console.log(formAnuncio);
        handlerCreate(formAnuncio);
    }
    else{
        //UPDATE
        handlerUpdate(formAnuncio);
    }

    $formulario.reset();
});

///CREACION DE ANUNCIO NUEVO
const handlerCreate = (nuevoAnuncio)=>{
    
    anuncios.push(nuevoAnuncio);
    actualizarStorage(anuncios);
    actualizarTabla();
};

///ACTUALIZACION DE ANUNCIO
const handlerUpdate = (anuncioEditado)=>{

    let indice = anuncios.findIndex((anuncios)=>{
        return anuncios.id == anuncioEditado.id;
    })

    anuncios.splice(indice, 1);
    anuncios.push(anuncioEditado);

    actualizarStorage(anuncioEditado);
    actualizarTabla();
};


//ELIMINAR ANUNCIO POR ID
const handlerDelete = (id) => {

    let indice = anuncios.findIndex((anuncio)=>{
        return anuncio.id == id;
    })

    anuncios.splice(indice, 1);

    actualizarStorage(anuncios);
    actualizarTabla();
};

///ACTUALIZAR EL LOCALSTORAGE
const actualizarStorage = (data)=>{
    localStorage.setItem('anuncios', JSON.stringify(data));
};

///ACTUALIZAR LA TABLA
function actualizarTabla() {

    ///ANIMACION SPINNER
    if (localStorage.length !== 0) {

        while ($divTabla.hasChildNodes()) {
            $divTabla.removeChild($divTabla.firstElementChild);
        }
        const data = JSON.parse(localStorage.getItem("personas"));
        $divTabla.appendChild(crearSpinner());

        setTimeout(() => {
            while ($divTabla.hasChildNodes()) {
                $divTabla.removeChild($divTabla.firstElementChild)
            }
            const data = JSON.parse(localStorage.getItem('anuncios'));
            if (data) {
                $divTabla.appendChild(crearTabla(anuncios));
            }
        }, 4000);
    }
};

///CREACION DEL SPINNER
function crearSpinner() {
    const spinner = document.createElement("img");
  
    spinner.width = 300;
    
    spinner.src = "./assets/spin2.gif";
    spinner.alt = "Progressbar";
  
    return spinner;
};

///CARGAR FORMULARIO A PARTIR DEL ID DADO POR EL CLICK EN LA TABLA
function cargarFormulario(anuncio){

    ///MODIFICAR DE ACUERDO A LA CONSIGNA
    const {txtId, txtTitulo, txtTransaccion, txtDescripcion, txtPrecio, txtBanos, txtAutos, txtDormitorios} = $formulario;

    txtId.value = anuncio.id;
    txtTitulo.value= anuncio.titulo;
    txtTransaccion.value = anuncio.transaccion;
    txtDescripcion.value = anuncio.descripcion;
    txtPrecio.value = anuncio.precio;
    txtBanos.value= anuncio.num_banos;
    txtAutos.value= anuncio.num_autos;
    txtDormitorios.value= anuncio.num_dormitorios;

};