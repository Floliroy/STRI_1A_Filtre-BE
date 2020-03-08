function createHeader(tr, titre, colspan){
    td = document.createElement("td")
    if(colspan > 1){
        td.setAttribute("colSpan", `${colspan}`)
    }
    td.setAttribute("style", "font-weight:bold")
    td.appendChild(document.createTextNode(titre))
    tr.appendChild(td)
}

function createTable(resistance, capacite, bobine){
    let table = document.createElement("table")

    table.style.width = "100%"
    table.setAttribute("border", "1")
    let tbody = document.createElement("tbody");

    //Valeur de la resistance
    let tr = document.createElement("tr")
    createHeader(tr,`Rn = ${Math.round(resistance*100)/100} Ω`, 2)
    tbody.appendChild(tr)

    //Titre des colonnes
    tr = document.createElement("tr")
    createHeader(tr, "Capacité(s)", 1)
    createHeader(tr, "Bobine(s)", 1)
    tbody.appendChild(tr)

    //Toutes les valeurs a remplir
    for(let i=1; i<=Math.ceil(capacite.length/2) ; i++){
        tr = document.createElement("tr")

        let td = document.createElement("td")
        td.appendChild(document.createTextNode(`${capacite[i].toExponential(2)} F`))
        tr.appendChild(td)

        td = document.createElement("td")
        if((i) != Math.ceil(capacite.length/2)){
            td.appendChild(document.createTextNode(`${bobine[i].toExponential(2)} F`))
        }else{
            td.appendChild(document.createTextNode("/"))
        }
        
        tr.appendChild(td)
        tbody.appendChild(tr)
    }

    table.appendChild(tbody)
    document.getElementById("result").appendChild(table)
}