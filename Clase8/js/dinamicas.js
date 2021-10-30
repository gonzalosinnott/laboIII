export const crearTabla = (data) => {

    const tabla = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    const cabecera = document.createElement("tr");

    //CARGO THEAD
    for (const key in data[0]) {
        
        //CREACION A TRAVES DE METODO
        if(key !== "id"){
            const th = document.createElement("th");
            const contenido = document.createTextNode(key);
            th.appendChild(contenido);
            cabecera.appendChild(th);  
        }
    }

    thead.appendChild(cabecera);    
    tabla.appendChild(thead);

    //CARGO TBODY
    data.forEach(element => {
        const tr = document.createElement("tr");
        for (const key in element) {
           if(key === "id"){
               tr.setAttribute("data-id", element[key]);
           }
           else{
                const td = document.createElement("td");
                td.textContent = element[key];
                tr.appendChild(td);
           }            
        }
        tbody.appendChild(tr);
    });
    
    tabla.appendChild(tbody);

    return tabla;
}