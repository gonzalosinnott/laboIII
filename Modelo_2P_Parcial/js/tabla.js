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

            const i = document.createElement("i");
            i.className = "fa fa-eye-slash";
            i.setAttribute("data-toggle", "tooltip");
            i.setAttribute("title", "Ocultar");
            i.setAttribute("data-placement", "bottom");

            const button = document.createElement("button");
            button.className = "pull-right btn btn-default btn-condensed hide-column";
            button.setAttribute("data-toggle", "tooltip");
            button.setAttribute("title", "Ocultar");
            button.setAttribute("data-placement", "bottom");

            button.appendChild(i);

            th.appendChild(button);
            
            
            th.appendChild(contenido);
            cabecera.appendChild(th);
       
            
            ///CABECERA CUSTOM - CAMBIAR DEPENDIENDO DE LA TABLA
            
        }                
    }

    thead.appendChild(cabecera);
    tabla.appendChild(thead);
    
    //cargo el tbody
    data.forEach((element) => {

        const tr = document.createElement("tr");

        for (const key in element) {
            if(key === "id"){
                tr.setAttribute("id", element[key]);
            }
            else{
                const td = document.createElement("td");
                td.textContent = element[key];

                tr.appendChild(td);
            }
        }

        tbody.appendChild(tr);    
    });

    tabla.appendChild(tbody)

    const a = document.createElement("a");
    a.className = "restore-columns";
    a.setAttribute("href", "javascript:void(0);");
    a.textContent = "Restaurar columnas";

    const th = document.createElement("th");
    th.setAttribute("colspan", "7");
    th.appendChild(a);

    const tfoot = document.createElement("tfoot");
    tfoot.className = "footer-restore-columns";

    tfoot.appendChild(th);

    tabla.appendChild(tfoot);

    tabla.className = "table table-condensed table-hover table-bordered table-striped table-hideable";

    return tabla;
}