const URL="http://localhost:3000/anuncios";

const divSpinner = document.querySelector(".spinnerClientes");
let anuncios = [];

document.addEventListener('DOMContentLoaded', function() {    
    getAll();
 }, false);  

function actualizarAnuncios(){

    const divContainer = document.createElement('div');

    divContainer.className = 'container-fluid';

    const divRow = document.createElement('div');
    
    divRow.className = 'row';

    divContainer.appendChild(divRow);

    anuncios.forEach((element)=>{
        const br = document.createElement("br");

        const iPrecio = document.createElement("i");
        const iPuertas = document.createElement("i");
        const iKm = document.createElement("i");
        const iPotencia = document.createElement("i");

        iPrecio.className = 'fas fa-dollar-sign';
        iPuertas.className = 'fas fa-door-open';
        iKm.className = 'fas fa-tachometer-alt';
        iPotencia.className = 'fas fa-bolt';

        const liPrecio = document.createElement("li");
        const liPuertas = document.createElement("li");
        const liKm = document.createElement("li");
        const liPotencia = document.createElement("li");

        liPrecio.className = 'list-group-item';
        liPuertas.className = 'list-group-item';
        liKm.className = 'list-group-item';
        liPotencia.className = 'list-group-item';

        liPrecio.appendChild(iPrecio);
        liPuertas.appendChild(iPuertas);
        liKm.appendChild(iKm);
        liPotencia.appendChild(iPotencia);

        liPrecio.appendChild(document. createTextNode(` Precio: ${element.precio}`));
        liPuertas.appendChild(document. createTextNode(` Puertas: ${element.puertas}`));
        liKm.appendChild(document. createTextNode(` Km: ${element.kilometros}`));
        liPotencia.appendChild(document. createTextNode(` Potencia: ${element.potencia}`));

        const ul = document.createElement("ul");

        ul.className = 'list-group list-group-flush';

        ul.appendChild(liPrecio);
        ul.appendChild(liPuertas);
        ul.appendChild(liKm);
        ul.appendChild(liPotencia);

        const divdescripcion = document.createElement("p");
        
        divdescripcion.className = 'card-text';
        divdescripcion.innerHTML = `${element.descripcion}`;

        const divTitulo = document.createElement("h4");
        
        divTitulo.className = 'card-title';
        divTitulo.innerHTML = `${element.titulo}`;

        const divBody = document.createElement("div");

        divBody.className = 'card-body';        
        
        divBody.appendChild(divTitulo);
        divBody.appendChild(divdescripcion);
      
        divBody.appendChild(ul);

        const img = document.createElement("img");

        img.className = 'card-img-top';
        img.src = "./assets/car-placeholder.png";
        img.alt = 'Card image cap';
        img.setAttribute('id', 'imgPlaceholder');

        const divImg = document.createElement("div");

        divImg.setAttribute('id', 'imgDiv');

        divImg.appendChild(img);

        const divCard = document.createElement("div");

        divCard.className = 'card';

        divCard.appendChild(divImg);
        divCard.appendChild(divBody);

        const divCol = document.createElement("div");

        divCol.className = 'col col-sm-12 col-md-3';

        divCol.appendChild(divCard);

        divCol.appendChild(br);

        divRow.appendChild(divCol);
        
    });

    document.getElementById('divAnuncios').appendChild(divContainer);
};


function getAll(){
    const xhr = new XMLHttpRequest();
    limpiarSpinner();          
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          const data = JSON.parse(xhr.responseText);
          anuncios = data;
          actualizarAnuncios();         
        } else {
          console.error(`Error: ${xhr.status} : ${xhr.statusText} `);          
          alert(`Error: ${xhr.status} : ${xhr.statusText} `);
        }
        limpiarSpinner();
      } else {
          divSpinner.appendChild(crearSpinner());
      }    
    };
  
    xhr.open("GET", URL);
    xhr.send();
  };

  function crearSpinner() {
    const spinner = document.createElement("img");
  
    spinner.width = 300;
    
    spinner.setAttribute("src", "./assets/loader.gif");
    spinner.setAttribute("alt", "loader");
  
    return spinner;
  };
  
  const limpiarSpinner = () => {
    while(divSpinner.hasChildNodes()){
        divSpinner.removeChild(divSpinner.firstChild);
    }
  };