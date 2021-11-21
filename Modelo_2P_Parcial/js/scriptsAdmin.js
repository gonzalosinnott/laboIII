import { Anuncio_Auto } from "./anuncio.js";
import { crearTabla } from "./tabla.js";
import { getAll, createAnuncio, deleteAnuncio, updateAnuncio, anuncios} from "./scriptCRUDXMLHttpRequest.js";
//import { getAll, createAnuncio, deleteAnuncio, updateAnuncio, anuncios} from "./scriptCRUDFetch.js";
//import { getAll, createAnuncio, deleteAnuncio, updateAnuncio, anuncios} from "./scriptCRUDAxios.js";

export { actualizarTabla, divSpinner};    

const $formulario = document.forms[0];
const $divTabla = document.getElementById("divTabla");
const divSpinner = document.querySelector(".spinner");


getAll();
resetForm();
$("#createAlert").hide();
$("#deleteAlert").hide();
$("#modifyAlert").hide();
 
window.addEventListener("click", (e)=>{

    if(e.target.matches("td")){
        
        const id = e.target.parentElement.id;
        cargarFormulario(anuncios.find((anuncio)=> anuncio.id == id));

        const tituloForm = document.getElementById("tituloForm");
        tituloForm.textContent = "MODIFICAR / BORRAR ANUNCIO: ID " + id;

    }else if(e.target.matches("#btnDelete")){
        handlerDelete(parseInt($formulario.txtId.value));
        resetForm();        
    }
    else if(e.target.matches("#btnCancel")){
        resetForm();        
    }    
});

$formulario.addEventListener("submit", (e) => {    

    e.preventDefault();

    const {txtId, txtTitulo, txtDescripcion, txtTransaccion,  txtPrecio, txtPuertas, txtKms, txtPotencia} = $formulario;
    
    const formAnuncio = new Anuncio_Auto(parseInt(txtId.value), txtTitulo.value, txtDescripcion.value, txtTransaccion.value,  txtPrecio.value, txtPuertas.value, txtKms.value, txtPotencia.value);
    
    if($formulario.txtId.value === ''){
        formAnuncio.id = getMaxId() + 1;
        handlerCreate(formAnuncio);
        console.log(formAnuncio);
    }
    else{
        formAnuncio.id = parseInt(formAnuncio.id);
        handlerUpdate(formAnuncio);
    }
    resetForm();
});

function getMaxId() {
    if(anuncios.length == 0){
        return 0 ;
    }
    else{
    return anuncios.reduce((prev, current) => (+prev.id > +current.id) ? prev : current).id;
    }
}

const handlerCreate = (nuevoAnuncio)=>{
    limpiarTabla();    
    createAnuncio(nuevoAnuncio);
    $("#createAlert").show();
          window.setTimeout(function () {
              $("#createAlert").slideUp(500, function () {
                  $("#createAlert").hide();
              });
          }, 3000);       
};

const handlerUpdate = (anuncioEditado)=>{
    limpiarTabla();
    updateAnuncio(anuncioEditado);
    $("#modifyAlert").show();
            window.setTimeout(function () {
                $("#modifyAlert").slideUp(500, function () {
                    $("#modifyAlert").hide();
                });
            }, 3000);        
};


const handlerDelete = (id) => {
    console.log(id);
    if (confirm("Quiere eliminar el anuncio ?")) { 
        limpiarTabla();       
        deleteAnuncio(id);
        $("#deleteAlert").show();
            window.setTimeout(function () {
                $("#deleteAlert").slideUp(500, function () {
                    $("#deleteAlert").hide();
                });
            }, 3000);        
    }
};

function actualizarTabla(data) {
    $divTabla.appendChild(crearTabla(data));
    toogleTabla();         
};

function limpiarTabla() {
    while($divTabla.hasChildNodes()){
        $divTabla.removeChild($divTabla.firstChild);
    }
}

function cargarFormulario(anuncio) {

    mostrarBotones();

    const {txtId, txtTitulo, txtDescripcion, txtTransaccion,  txtPrecio, txtPuertas, txtKms, txtPotencia} = $formulario;
    console.log(anuncio);
    txtId.value = parseInt(anuncio.id);
    txtTitulo.value= anuncio.titulo;
    txtDescripcion.value = anuncio.descripcion;
    txtTransaccion.value = anuncio.transaccion;    
    txtPrecio.value = anuncio.precio;
    txtPuertas.value= anuncio.puertas;
    txtKms.value= anuncio.kms;
    txtPotencia.value= anuncio.potencia;
};

function mostrarBotones() {

    const botonEliminar = document.getElementById("btnDelete");
    botonEliminar.hidden = false;

    const botonCancelar = document.getElementById("btnCancel");
    botonCancelar.hidden = false;
};

function toogleTabla () {
    $(function() {
        // on init
        $(".table-hideable .hide-col").each(HideColumnIndex);
      
        $('.hide-column').click(HideColumnIndex);
        $(".footer-restore-columns").hide();
      
        function HideColumnIndex() {
          var $el = $(this);
          var $cell = $el.closest('th,td')
          var $table = $cell.closest('table')
      
          var colIndex = $cell[0].cellIndex + 1;
      
          $table.find("tbody tr, thead tr")
            .children(":nth-child(" + colIndex + ")")
            .addClass('hide-col');
            
          $table.find(".footer-restore-columns").show()
        }
      
        $(".restore-columns").click(function(e) {
          var $table = $(this).closest('table')
          $table.find(".footer-restore-columns").hide()
          $table.find("th, td")
            .removeClass('hide-col');
      
        })
      
    });
}
    

  document.getElementById('selectFiltro').addEventListener('change', function() {
    
    const filtro = $('#selectFiltro option:selected').text();
    
    if(filtro == "Todos"){
        getValues(anuncios);
        limpiarTabla();
        actualizarTabla(anuncios);
        getValues(anuncios);
    }else{
    let filteredAnuncios = [];  
    filteredAnuncios = anuncios.filter((anuncio)=> anuncio.transaccion == filtro);
    getValues(filteredAnuncios);
    limpiarTabla();
    actualizarTabla(filteredAnuncios);
    }
});

function getValues(data){
    const sumTxt = document.getElementById('txtTotal');
    const avgTxt = document.getElementById('txtPromedio');
    const maxTxt = document.getElementById('txtMax');
    const minTxt = document.getElementById('txtMin');

    
    if(data.length == 0){
        sumTxt.value = 0;
        avgTxt.value = 0;
        maxTxt.value = 0;
        minTxt.value = 0;        
    }
    else{
    const result = data.map(x=>x.precio);
    const sum = result.reduce((a,b)=>a+Number(b),0);
    const avg = sum/result.length;
    const max = Math.max(...result);
    const min = Math.min(...result);

    
    sumTxt.value = sum;
    avgTxt.value = avg;
    maxTxt.value = max;
    minTxt.value = min;
    }    
}

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
  
