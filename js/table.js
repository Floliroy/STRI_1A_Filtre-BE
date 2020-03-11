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

    let nbtour = capacite.length
    if (nbtour % 2 == 0) {
        nbtour++
    }
    //Toutes les valeurs a remplir
    for(let i=1; i<nbtour ; i++){
        let td = document.createElement("td")

        if(i % 2 == 1){
            tr = document.createElement("tr")
            td.appendChild(document.createTextNode(`C${i} = ${capacite[i].toExponential(3).toString().replace("e", " e")} F`))
            tr.appendChild(td)
            tbody.appendChild(tr)
        }else{
            if(bobine[i]){
                td.appendChild(document.createTextNode(`L${i} = ${bobine[i].toExponential(3).toString().replace("e", " e")} H`))
            }else{
                td.appendChild(document.createTextNode("/"))
            }
            tr.appendChild(td)
        }
    }

    table.appendChild(tbody)
    document.getElementById("result").appendChild(table)
}