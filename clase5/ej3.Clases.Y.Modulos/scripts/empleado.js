import Person from "./persona.js";

//HERENCIA

export class Employee extends Person{
    legajo;
    
    constructor(nombre,edad,hambre,legajo){
        super(nombre,edad,hambre);
        this.legajo = legajo;
    }

    saludar() {
        console.log(`Hola me llamo ${this.nombre} y soy un empleado.`)
    }

    cobrarAguinaldo() {
        console.log("Cobre el aguinaldo!")
    }
}

