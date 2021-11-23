export { getAll, createAnuncio, deleteAnuncio, updateAnuncio, anuncios};

const URL="http://localhost:3000/anuncios";

let anuncios = [];
const divSpinner = document.querySelector(".spinner");

function crearSpinner() {
  const spinner = document.createElement("img");
  spinner.setAttribute("src", "./assets/loader.gif");
  spinner.setAttribute("alt", "loader");
  spinner.setAttribute("style", "width:600px");
  return spinner;
};

const limpiarSpinner = () => {
  while(divSpinner.hasChildNodes()){
    divSpinner.removeChild(divSpinner.firstChild);
  }
};

///GET
const getAll = (callback) =>{
    const xhr = new XMLHttpRequest();  

    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          const data = JSON.parse(xhr.responseText);
          anuncios = data;
          callback(anuncios);         
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


///POST
function createAnuncio(anuncio){

    const nuevoAnuncio = JSON.stringify(anuncio)
    const xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", () => {
      if (xhr.readyState == 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          const data = JSON.parse(xhr.responseText);
          anuncios = data;           
        } else {
          console.error(`Error: ${xhr.status} : ${xhr.statusText} `);
          alert(`Error: ${xhr.status} : ${xhr.statusText} `);
        }
      } else {
      }    
    });
 
    xhr.open("POST", URL);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(nuevoAnuncio);    
};

///DELETE
function deleteAnuncio(id){

    const xhr = new XMLHttpRequest();  

    xhr.addEventListener("readystatechange", () => {
      if (xhr.readyState == 4){
        if(xhr.status >= 200 && xhr.status < 300){
            const data = JSON.parse(xhr.responseText);
            anuncios = data;            
        }
        else{
            console.error(`Error: ${xhr.status} : ${xhr.statusText} `);
            alert(`Error: ${xhr.status} : ${xhr.statusText} `);
        }
      } else {
      }    
    });

    xhr.open("DELETE", URL + "/" + id);
    xhr.send();    
};

///PUT
function updateAnuncio(anuncio){

    const anuncioToEdit = JSON.stringify(anuncio);

    const xhr = new XMLHttpRequest();
  
    xhr.addEventListener("readystatechange", () => {
      if (xhr.readyState == 4){

        if(xhr.status >= 200 && xhr.status < 300){
            const data = JSON.parse(xhr.responseText);
            anuncios = data;            
        }
        else{
            console.error(`Error: ${xhr.status} : ${xhr.statusText} `);
            alert(`Error: ${xhr.status} : ${xhr.statusText} `);
        }
      } else {
      }    
    });

    xhr.open("PUT", URL + "/" + anuncio.id);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(anuncioToEdit);   
};


