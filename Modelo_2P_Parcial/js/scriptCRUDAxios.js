export { getAll, createAnuncio, deleteAnuncio, updateAnuncio, anuncios};

const URL="http://localhost:3000/anuncios";

let anuncios = [];
const divSpinner = document.querySelector(".spinner");

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
const getAll = (callback) =>{

  divSpinner.appendChild(crearSpinner());
  axios.get(URL)
  .then(({data}) => {
    anuncios = data;
    callback(anuncios);
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
  }
  catch(error){
      console.error(error.response);
      alert(error.response);
  }
  finally{
  }    
};

///PUT
function updateAnuncio(anuncio){
  axios.put(URL+ "/" + anuncio.id, anuncio)
  .then(({data}) => {
    anuncios = data;
  }) 
  .catch(error => {
      console.error(error);
      alert(error);
  })
  .finally(() => {
  });
}

  


