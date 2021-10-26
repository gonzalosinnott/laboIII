//CLASES, CONSTRUCTORES, SETTERS Y GETTERS

class Person {      
    nombre;
    edad;
    hambre;
    
    constructor(nombre,edad,hambre){
        this.nombre = nombre;
        this.edad = edad;
        this.hambre = false;
    }        

    set Nombre(value){
        this.nombre = value;
    }
    
    get Nombre(){
        return this.nombre;
    }

    saludar(){
        console.log(`Hola me llamo ${this.nombre}`);
    }
    
    static sumar(a, b){
        return a + b;
    }
}

export default Person;