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
  axios.get(URL)
  .then(({data}) => {
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
  
  axios.post(URL, anuncio)
  .then(({data}) => {
    anuncios = data;
    actualizarTabla(anuncios);
  }) 
  .catch(error => {
      console.error(error);
      alert(error);
  })
  .finally(() => {
  });
}

///DELETE
const deleteAnuncio = async(id) => {

  try{
    const {data} = await axios.delete(URL + "/" + id);
    anuncios = data;
    actualizarTabla(anuncios);
    alert(error.response);
  }
  catch(error){
      console.error(error.response);
  }
  finally{
  }    
};

///PUT
function updateAnuncio(anuncio){
  axios.put(URL+ "/" + anuncio.id, anuncio)
  .then(({data}) => {
    anuncios = data;
    actualizarTabla(anuncios);
  }) 
  .catch(error => {
      console.error(error);
      alert(error);
  })
  .finally(() => {
  });
}

  


