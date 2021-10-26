import Person from "./persona.js";
import {Employee} from "./empleado.js";


const persona = new Person("Miguel", 28, true);

console.log(persona);
persona.saludar();
persona.Nombre = "Mario";
console.log(persona.Nombre)

const empleado = new Employee("Gonzalo", 31, "",1234)

console.log(empleado);
empleado.saludar();
empleado.Nombre = "Mario";
console.log(empleado.Nombre);
empleado.cobrarAguinaldo();
              
