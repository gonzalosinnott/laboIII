import { Anuncio } from "./anuncio.js";
import { crearTabla } from "./tabla.js";

const $divTabla = document.getElementById("divTabla");

const anuncios =  JSON.parse( localStorage.getItem( 'anuncios' )) || [] ;

const $formulario = document.forms[0];

actualizarTabla();

localStorage.setItem('anuncios', JSON.stringify(anuncios));

function resetForm(){
    $formulario.reset();
    $formulario.txtId.value = '';
    const tituloForm = document.getElementById("tituloForm");
    tituloForm.textContent = "CARGAR ANUNCIO";

    const botonEliminar = document.getElementById("btnDelete");
    botonEliminar.hidden = true;

    const botonCancelar = document.getElementById("btnCancel");
    botonCancelar.hidden = true;
}

///RECUPERACION DE ID POR DELEGACION DE EVENTOS
///MANEJO DEL BOTON DELETE
window.addEventListener("click", (e)=>{

    if(e.target.matches("td")){
        
        const id = e.target.parentElement.id;
        console.log(id);
        cargarFormulario(anuncios.find((anuncio)=> anuncio.id == id));

        const tituloForm = document.getElementById("tituloForm");
        tituloForm.textContent = "MODIFICAR / BORRAR ANUNCIO : " + id;

    }else if(e.target.matches("#btnDelete")){
        handlerDelete(parseInt($formulario.txtId.value));
        resetForm();        
    }
    else if(e.target.matches("#btnCancel")){
        resetForm();        
    }    
});

$formulario.addEventListener("submit", (e) => {
    
    //PREVIENE EL ENVIO DEL SUBMIT POR DEFECTO
    e.preventDefault();

    ///MODIFICAR DE ACUERDO A LA CONSIGNA (CAMPOS DEL FORMULARIO)
    const {txtId, txtTitulo, txtTransaccion, txtDescripcion, txtPrecio, txtBanos, txtAutos, txtDormitorios} = $formulario;
    
    ///MODIFICAR DE ACUERDO A LA CONSIGNA (CAMPOS DEL OBJETO)
    const formAnuncio = new Anuncio(parseInt(txtId.value), txtTitulo.value, txtTransaccion.value, txtDescripcion.value, txtPrecio.value, txtBanos.value, txtAutos.value, txtDormitorios.value);
    
    console.log("ANUNCIO:");
    console.log($formulario.txtId.value);

    if($formulario.txtId.value === ''){
        //ALTA
        formAnuncio.id = getMaxId() + 1;
        handlerCreate(formAnuncio);
        console.log(formAnuncio);
    }
    else{
        //UPDATE
        formAnuncio.id = parseInt(formAnuncio.id);
        handlerUpdate(formAnuncio);
    }
    resetForm();
});

///DEVUELVE EL ID MAXIMO DE LOS ANUNCIOS
function getMaxId() {
    if(anuncios.length == 0){
        return 0 ;
    }
    else{
    return anuncios.reduce((prev, current) => (+prev.id > +current.id) ? prev : current).id;
    }
}

///CREACION DE ANUNCIO NUEVO
const handlerCreate = (nuevoAnuncio)=>{
    
    anuncios.push(nuevoAnuncio);
    actualizarStorage(anuncios);
    actualizarTabla();
    console.log(anuncios);
};

///ACTUALIZACION DE ANUNCIO
const handlerUpdate = (anuncioEditado)=>{

    console.log(anuncioEditado);
    let indice = anuncios.findIndex((anuncio)=>{
        return anuncio.id == anuncioEditado.id;
    })

    anuncios.splice(indice, 1);
    anuncios.push(anuncioEditado);

    actualizarStorage(anuncios);
    actualizarTabla();
    console.log(anuncios);
};


//ELIMINAR ANUNCIO POR ID
const handlerDelete = (id) => {

    console.log("llego el delete");

    if (confirm("Quiere eliminar el anuncio ?")) {
        const indice = anuncios.findIndex((anuncio)=>{
            return anuncio.id == id;
        })

        anuncios.splice(indice, 1);

        actualizarStorage(anuncios);
        actualizarTabla();
    }
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
        const data = JSON.parse(localStorage.getItem("anuncios"));
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

    mostrarBotones();

    ///MODIFICAR DE ACUERDO A LA CONSIGNA
    const {txtId, txtTitulo, txtTransaccion, txtDescripcion, txtPrecio, txtBanos, txtAutos, txtDormitorios} = $formulario;

    txtId.value = parseInt(anuncio.id);
    txtTitulo.value= anuncio.titulo;
    txtTransaccion.value = anuncio.transaccion;
    txtDescripcion.value = anuncio.descripcion;
    txtPrecio.value = anuncio.precio;
    txtBanos.value= anuncio.num_banos;
    txtAutos.value= anuncio.num_autos;
    txtDormitorios.value= anuncio.num_dormitorios;

};

function mostrarBotones(){

    const botonEliminar = document.getElementById("btnDelete");
    botonEliminar.hidden = false;

    const botonCancelar = document.getElementById("btnCancel");
    botonCancelar.hidden = false;
}