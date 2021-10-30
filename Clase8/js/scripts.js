import { Persona } from "./persona.js";
import { crearTabla } from "./dinamicas.js";

const $divTabla = document.getElementById("divTabla");

const personas = JSON.parse(localStorage.getItem("personas")) || [];

const $formulario = document.forms[0];

actualizarTabla();

localStorage.setItem('personas', JSON.stringify(personas));

window.addEventListener("click", (e) => {
    if(e.target.matches("td"))
    {
        console.log(e.target.parentElement.dataset.id);

        let id = e.target.parentElement.dataset.id;

        cargarFormulario(personas.find((persona) => persona.id == id));
    }
    else if(e.target.matches("#btnDelete")){
        handlerDelete(parseInt($formulario.txtId.value));
        $formulario.reset();
    }    
});

$formulario.addEventListener("submit", (e) => {
    
    e.preventDefault();

    console.log("enviando....");

    const {txtId, txtNombre, txtApellido, txtEdad, txtEmail, rdoGenero} = $formulario;

    const formPersona = new Persona(txtId.value, txtNombre.value, txtApellido.value, txtEmail.value, rdoGenero.value, txtEdad.value, );


    if(formPersona.id === ''){
        ///ALTA
        formPersona.id = Date.now();
        console.log(formPersona);
        handlerCreate(formPersona);
    }
    else{
        ///MODIFICACION
        handlerUpdate(formPersona);
    }

    $formulario.reset();
});

///ALTA
const handlerCreate = (nuevaPersona) => {
    personas.push(nuevaPersona);
    actualizarStorage(personas)
    actualizarTabla();
};

///MODIFICACION
const handlerUpdate = (personaEditada) => {

    let indice = personas.findIndex((persona) =>{
         return persona.id == personaEditada.id;
    });

    personas.splice(indice, 1);
    personas.push(personaEditada);

    actualizarStorage(personas);
    actualizarTabla();
};

///BORRAR
const handlerDelete = (id) => {

    let indice = personas.findIndex((persona) =>{
        return persona.id == id;
   });

   personas.splice(indice, 1);
   
   actualizarStorage(personas);
   actualizarTabla();
};

///ACTUALIZAR TABLA
function actualizarTabla(){
    
    while($divTabla.hasChildNodes()){
        $divTabla.removeChild($divTabla.firstElementChild);
    }

    const data = JSON.parse(localStorage.getItem("personas"));

    if(data){
        $divTabla.appendChild(crearTabla(personas));
    }
    
};

///ACTUALIZAR LOCALSTORAGE
const actualizarStorage = (data) => {
    localStorage.setItem('personas', JSON.stringify(data));
};

///CARGAR FORMULARIO
function cargarFormulario(persona) {
    const {txtId, txtNombre, txtApellido, txtEdad, txtEmail, rdoGenero} = $formulario;

    txtId.value = persona.id;
    txtNombre.value = persona.nombre;
    txtApellido.value = persona.apellido;
    txtEdad.value = persona.edad;
    txtEmail.value = persona.email;
    rdoGenero.value = persona.genero;
};

