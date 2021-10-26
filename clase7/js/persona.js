export const personas = [
{"id":1,"first_name":"Orbadiah","last_name":"Dayly","email":"odayly0@mysql.com","gender":"Genderqueer","age":70},
{"id":2,"first_name":"Wright","last_name":"Crowth","email":"wcrowth1@cafepress.com","gender":"Genderqueer","age":82},
{"id":3,"first_name":"Jeffrey","last_name":"Pamplin","email":"jpamplin2@dailymail.co.uk","gender":"Non-binary","age":21},
{"id":4,"first_name":"Alidia","last_name":"Connochie","email":"aconnochie3@istockphoto.com","gender":"Female","age":73},
{"id":5,"first_name":"Chastity","last_name":"Delgadillo","email":"cdelgadillo4@soup.io","gender":"Female","age":83},
{"id":6,"first_name":"Timmy","last_name":"Allaker","email":"tallaker5@prweb.com","gender":"Genderfluid","age":69},
{"id":7,"first_name":"Jeramey","last_name":"de Quesne","email":"jdequesne6@wordpress.com","gender":"Polygender","age":71},
{"id":8,"first_name":"Gelya","last_name":"Brownbridge","email":"gbrownbridge7@hibu.com","gender":"Genderfluid","age":99},
{"id":9,"first_name":"Tom","last_name":"McCrae","email":"tmccrae8@jugem.jp","gender":"Bigender","age":33},
{"id":10,"first_name":"Lay","last_name":"Skillanders","email":"lskillanders9@sphinn.com","gender":"Non-binary","age":21},
{"id":11,"first_name":"Bard","last_name":"Kelso","email":"bkelsoa@ustream.tv","gender":"Bigender","age":13},
{"id":12,"first_name":"Nell","last_name":"Hampson","email":"nhampsonb@zdnet.com","gender":"Non-binary","age":100},
{"id":13,"first_name":"Madelene","last_name":"Spata","email":"mspatac@soup.io","gender":"Agender","age":15},
{"id":14,"first_name":"Johnath","last_name":"Norgan","email":"jnorgand@behance.net","gender":"Non-binary","age":1},
{"id":15,"first_name":"Myranda","last_name":"Vernham","email":"mvernhame@mit.edu","gender":"Female","age":95},
{"id":16,"first_name":"Dex","last_name":"Dumingos","email":"ddumingosf@163.com","gender":"Genderfluid","age":100},
{"id":17,"first_name":"Merry","last_name":"Gilling","email":"mgillingg@about.com","gender":"Male","age":4},
{"id":18,"first_name":"Kirstin","last_name":"Hugonnet","email":"khugonneth@360.cn","gender":"Female","age":33},
{"id":19,"first_name":"Reagan","last_name":"Eddison","email":"reddisoni@dedecms.com","gender":"Male","age":81},
{"id":20,"first_name":"Virgilio","last_name":"Grigori","email":"vgrigorij@printfriendly.com","gender":"Female","age":54},
];

export class Persona {
    constructor(id, nombre, apellido, email, genero, edad) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.genero = genero;
        this.edad = edad;
    }
}
