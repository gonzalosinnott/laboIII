import { actualizarTabla, divSpinner } from "./scriptsAdmin.js";  
export { getAll, createAnuncio, deleteAnuncio, updateAnuncio, anuncios};

const URL="http://localhost:3000/anuncios";

let anuncios = [];

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

///GET
function getAll(){

  divSpinner.appendChild(crearSpinner());
  fetch(URL)
  .then(response => response.ok ? response.json() : Promise.reject(new Error(`Error: ${response.status} : ${response.statusText} `)))
  .then((data)=>{
    anuncios = data;
    actualizarTabla(anuncios);
  }) 
  .catch(error => {
      console.error(error);
      alert(error);
  })
  .finally(() => {
    limpiarSpinner();
  });
};


///POST
function createAnuncio(anuncio){  

  const options={
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(anuncio)
  };   


  fetch(URL, options)
  .then(response => response.ok ? response.json() : Promise.reject(new Error(`Error: ${response.status} : ${response.statusText} `)))
  .then((data)=>{
      anuncios = data;
      actualizarTabla(anuncios);    
  }) 
  .catch(error => {
      console.error(error);
      alert(error);
  })
  .finally(() => {
  });     
};

///DELETE
function deleteAnuncio(id){

  const options={
    method: "DELETE"        
  };   

  fetch(URL +"/" + id, options)
  .then(response => response.ok ? response.json() : Promise.reject(new Error(`Error: ${response.status} : ${response.statusText} `)))
  .then((data)=>{
    anuncios = data;
    actualizarTabla(anuncios); 
  }) 
  .catch(error => {
    alert(error);
  })
  .finally(() => {
  });  
};

///PUT
function updateAnuncio(anuncio){

  const options={
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
      },
    body: JSON.stringify(anuncio)
  };   

  fetch(URL +"/" + anuncio.id, options)
  .then(response => response.ok ? response.json() : Promise.reject(new Error(`Error: ${response.status} : ${response.statusText} `)))
  .then((data)=>{
    anuncios = data;
    actualizarTabla(anuncios);    
  }) 
  .catch(error => {
    console.error(error);
    alert(error);
  })
  .finally(() => {
  });       
};


