const URL="http://localhost:3000/personas";

const divSpinner = document.querySelector(".spinner");

const getSpinner = () => {
    const spinner = document.createElement("img");
    spinner.setAttribute("src", "./assets/loader.gif");
    spinner.setAttribute("alt", "loader");
    return spinner;
};

const clearDivSpinner = () => {
    while(divSpinner.hasChildNodes()){
        divSpinner.removeChild(divSpinner.firstChild);
    }
};

const getPersonasAjax = () => {

    const xhr = new XMLHttpRequest();
  
    console.log("TEST");

    xhr.addEventListener("readystatechange", () => {
      if (xhr.readyState == 4){

        if(xhr.status >= 200 && xhr.status < 300){
          const data = JSON.parse(xhr.responseText);

          console.log(data);
        }
        else{
            console.error(`Error: ${xhr.status} : ${xhr.statusText} `);
        }

        clearDivSpinner();
      }
      else{
        console.log("Cargando...");
        divSpinner.appendChild(getSpinner());
      }
    });

    xhr.open("GET", URL);
    xhr.send();    
};

const getPersonasFetchPromesas = () => {
    
    divSpinner.appendChild(getSpinner());

    fetch(URL)
    .then(response => response.ok ? response.json() : Promise.reject(new Error(`Error: ${response.status} : ${response.statusText} `)))
    .then((data)=>{
        console.log(data);
    }) 
    .catch(error => {
        console.error(error);
    })
    .finally(() => {
        clearDivSpinner();
    });
};

const getPersonasFetchAsync = async() => {
    
    try{
        divSpinner.appendChild(getSpinner());
        
        const response = await fetch(URL);
        
        if(!response.ok){
            throw new Error(`Error: ${response.status} : ${response.statusText} `);
        }

        const data = await response.json();

        console.log(data);
    }
    catch(error){
        console.error(error.message);
    }
    finally{
        clearDivSpinner();
    }
};

const getPersonasAxiosPromesas = () => {

    divSpinner.appendChild(getSpinner());
    axios.get(URL)
    .then(({data}) => {
        console.log(data);
    })
    .catch(error => {
        console.error(error.response);
    })
    .finally(() => {
        clearDivSpinner();
    });
}

const getPersonasAxiosAsync = async() => {

    divSpinner.appendChild(getSpinner());

    try{
        const {data} = await axios.get(URL);
        console.log(data);
    }
    catch(error){
        console.error(error.response);
    }
    finally{
        clearDivSpinner();
    }   
};


const getPersonaAjaxId = (id) => {

    const xhr = new XMLHttpRequest();
  
    console.log("TEST");

    xhr.addEventListener("readystatechange", () => {
      if (xhr.readyState == 4){

        if(xhr.status >= 200 && xhr.status < 300){
          const data = JSON.parse(xhr.responseText);

          console.log(data);
        }
        else{
            console.error(`Error: ${xhr.status} : ${xhr.statusText} `);
        }

        clearDivSpinner();
      }
      else{
        console.log("Cargando...");
        divSpinner.appendChild(getSpinner());
      }
    });

    xhr.open("GET", URL + "/" + id);
    xhr.send();    
};

///LOS OTROS SON IGUALES CAMBIA SOLAMENTE AGREGAR EL ID EN EL URL COMO PARAMETRO

const createPersonaAjax = () => {

    const nuevaPersona = { nombre: "Juan", apellido: "Perez" };
    const xhr = new XMLHttpRequest();
  
    console.log("TEST");

    xhr.addEventListener("readystatechange", () => {
      if (xhr.readyState == 4){

        if(xhr.status >= 200 && xhr.status < 300){
          const data = JSON.parse(xhr.responseText);
          alert(JSON.stringify(data));
        }
        else{
            console.error(`Error: ${xhr.status} : ${xhr.statusText} `);
        }
        clearDivSpinner();
      }
      else{
        console.log("Cargando...");
        divSpinner.appendChild(getSpinner());
      }
    });

    xhr.open("POST", URL);
    xhr.setRequestHeader("Content-Type", "application/json;charset=utf8");
    xhr.send( JSON.stringify(nuevaPersona));    
};


///El fetch async away es igual
const createPersonaFetchPromesas = () => {
    
    const nuevaPersona = { nombre: "Andres", apellido: "Gomez" };

    const options={
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(nuevaPersona)
    };   

    divSpinner.appendChild(getSpinner());

    fetch(URL, options)
    .then(response => response.ok ? response.json() : Promise.reject(new Error(`Error: ${response.status} : ${response.statusText} `)))
    .then((data)=>{
        alert(JSON.stringify(data));
    }) 
    .catch(error => {
        console.error(error);
    })
    .finally(() => {
        clearDivSpinner();
    });
};


///CAMBIA EL BODY POR DATA Y EL AXIOS.GET POR AXIOS(URL, OPTIONS)
const createPersonasAxiosAsync = async() => {

    const nuevaPersona = { nombre: "Ramon", apellido: "Valdez" };

    const options={
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(nuevaPersona)
    };  

    divSpinner.appendChild(getSpinner());

    try{
        const {data} = await axios(URL, options);
        alert(JSON.stringify(data));
    }
    catch(error){
        console.error(error.response);
    }
    finally{
        clearDivSpinner();
    }   
};

const deletePersonaAjaxId = (id) => {

    const xhr = new XMLHttpRequest();
  
    console.log("TEST");

    xhr.addEventListener("readystatechange", () => {
      if (xhr.readyState == 4){

        if(xhr.status >= 200 && xhr.status < 300){
          alert(xhr.responseText);
        }
        else{
            console.error(`Error: ${xhr.status} : ${xhr.statusText} `);
        }
        clearDivSpinner();
      }
      else{
        console.log("Cargando...");
        divSpinner.appendChild(getSpinner());
      }
    });

    xhr.open("DELETE", URL + "/" + id);
    xhr.send();    
};

const deletePersonaFetchPromesas = (id) => {
    
    const options={
        method: "DELETE"        
    };   

    divSpinner.appendChild(getSpinner());

    fetch(URL +"/" + id, options)
    .then(response => response.ok ? response.json() : Promise.reject(new Error(`Error: ${response.status} : ${response.statusText} `)))
    .then((data)=>{
        alert(data);
    }) 
    .catch(error => {
        console.error(error);
    })
    .finally(() => {
        clearDivSpinner();
    });
};

const deletePersonasAxiosAsync = async(id) => {


    divSpinner.appendChild(getSpinner());

    try{
        const {data} = await axios.delete(URL + "/" + id);
        alert(data);
    }
    catch(error){
        console.error(error.response);
    }
    finally{
        clearDivSpinner();
    }   
};

const updatePersonaAjaxId = () => {

    const personToEdit = { id:1, nombre: "Ramona", apellido: "Spurdle" };

    const xhr = new XMLHttpRequest();
  
    console.log("TEST");

    xhr.addEventListener("readystatechange", () => {
      if (xhr.readyState == 4){

        if(xhr.status >= 200 && xhr.status < 300){
          alert(xhr.responseText);
        }
        else{
            console.error(`Error: ${xhr.status} : ${xhr.statusText} `);
        }
        clearDivSpinner();
      }
      else{
        console.log("Cargando...");
        divSpinner.appendChild(getSpinner());
      }
    });

    xhr.open("PUT", URL + "/" + personToEdit.id);
    xhr.setRequestHeader("Content-Type", "application/json;charset=utf8");
    xhr.send(JSON.stringify(personToEdit));   
};

///el update de fetch y axios son similares, buscar como son.....


////bonus track. array con repetidos

const vec = [2,2,5,4,6,7,8,2,2];

const x = new Set(...vec);

const y = [...x];

console.log(vec);
console.log(y);

