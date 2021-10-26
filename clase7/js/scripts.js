import { Persona } from "./persona.js";
import { crearTabla } from "./dinamicas.js";

//Creo un array de personas a partir de lo cargado y si no hay nada es vacio
const personas =JSON.parse(localStorage.getItem("personas")) || [];
const $divTabla = document.getElementById("divTabla");


//Recuperacion de Id por delegacion de eventos.
window.addEventListener("click", (e)=>{

    if(e.target.matches("td")){
        console.log(e.target.parentElement.dataset.id);

        let id = e.target.parentElement.dataset.id;
        cargarFormulario(personas.find((persona)=> persona.id === id));
    }
    else if(e.target.matches("#btnDelete")){
        handlerDelete($formulario.txtId.value);
    }   
});

function cargarFormulario(persona){

    const {txtId,txtNombre,txtApellido,txtEmail,rdoGenero,txtEdad} = $formulario;

    txtId.value = persona.id;
    txtNombre.value= persona.nombre;
    txtApellido.value = persona.apellido;
    txtEmail.value = persona.email;
    rdoGenero.value = persona.genero;
    txtEdad.value= persona.edad;
};

const $formulario = document.forms[0];

document.querySelector('form').addEventListener("submit", (e)=>{
    
    //PREVIENE EL ENVIO DEL SUBMIT POR DEFECTO
    e.preventDefault();

    console.log("Enviando...");

    const data = new FormData(e.target) 

    const obj = Object.fromEntries(data)
    
    const formPersona = new Persona(obj.txtId, obj.txtNombre, obj.txtApellido, obj.txtEmail, obj.rdoGenero, obj.txtEdad);

    if(obj.txtId === undefined){
        //ALTA
        formPersona.id = Date.now();
        console.log(formPersona);
        handlerCreate(formPersona);
    }
    else{
        //UPDATE
        handlerUpdate(formPersona);
    }

    $formulario.reset();
});

//MANEJADOR PARA AGREGAR LA PERSONA AL ARRAY
const handlerCreate = (nuevaPersona)=>{
    
    personas.push(nuevaPersona);
    actualizarStorage(personas);
    actualizarTabla();
};

//MANEJADOR PARA MODIFICAR LA PERSONA
const handlerUpdate = (personaEditada)=>{

    let indice = personas.findIndex((personas)=>{
        return personas.id == personaEditada.id;
    })

    personas.splice(indice, 1);
    personas.push(personaEditada);
    console.log(personas);

    actualizarStorage(personaEditada);
    actualizarTabla();
};

//MANEJADOR PARA ELEIMINAR LA PERSONA POR ID
const handlerDelete = (id)=> {
    let indice = personas.findIndex((personas)=>{
        return personas.id == id;
    })

    personas.splice(indice, 1);
    console.log(personas);

    actualizarStorage(personas);
    actualizarTabla();
};


function actualizarTabla(){
    while($divTabla.hasChildNodes()){
        $divTabla.removeChild($divTabla.firstElementChild)
    }
    const data = JSON.parse(localStorage.getItem("personas"));
    if(data){
        $divTabla.appendChild(crearTabla(personas));
    }
};

const actualizarStorage = (data)=>{
    localStorage.setItem("Personas", JSON.stringify(data));
};

