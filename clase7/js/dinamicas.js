//FORMA POCO EFICIENTE DE REGISTRAR QUE FILA SE CLICKEA
const handleClick =(e)=>{
    //DEVUELVE POR CONSOLA EL ID DE LA FILA SELECCIONADA
    console.log(e.target.parentElement.dataset.id);
}



export const crearTabla = (data)=>{

    const tabla = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");
    const cabecera = document.createElement("tr");
    
    //cargo el thead
    for (const key in data[0]) {
        if(key !== "id"){
            const th = document.createElement("th");
            const contenido = document.createTextNode(key);
            th.appendChild(contenido);
            cabecera.appendChild(th);
        }                
    }
    thead.appendChild(cabecera);
    tabla.appendChild(thead);

    thead.style.backgroundColor = 'green'
    
    //cargo el tbody
    data.forEach((element,index) => {

        const tr = document.createElement("tr");

        for (const key in element) {
            if(key === "id"){////revisar id
                tr.setAttribute("data-id", element[key]);
            }
            else{
                const td = document.createElement("td");
                td.textContent = element[key];
                //td.addEventListener("click", handleClick); FORMA POCO EFICIENTE

                tr.appendChild(td);
            }
        }

        tbody.appendChild(tr);
        
        if(index % 2){
            tr.style.backgroundColor = '#ccc'
        }
    });

    tabla.appendChild(tbody)

    return tabla;
}