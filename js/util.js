function br(nbTour){
    for(let i=0 ; i<nbTour ; i++){
        let newLink = document.createElement("br")
        document.getElementById("result").appendChild(newLink)
    }
}

function print(texte){
    let newLinkText = document.createTextNode(texte)
    document.getElementById("result").appendChild(newLinkText)
}

function myCos(value){
    let myTerm1 = Math.pow(Math.E, value)
    let myTerm2 = Math.pow(Math.E, -value)
    return (myTerm1 + myTerm2) / 2
}

function mySin(value){
    return (Math.exp(value) - Math.exp(-value)) / 2
}

function myTan(value){
    return (Math.exp(value) - Math.exp(-value)) / (Math.exp(value) + Math.exp(-value))
}

function isNumberFormated(number){
    if(isNaN(number) || number<0 || number==""){
        return false
    }
    return true
}

function removeClasses(id){
    $(`#${id}`).removeClass("unknow")
    $(`#${id}`).removeClass("error")
    $(`#${id}`).removeClass("validate")
}

function validateNumber(id){
    let element = document.getElementById(id).value
    if(isNumberFormated(element)){
        removeClasses(id)
        $(`#${id}`).addClass("validate")
    }else{
        removeClasses(id)
        $(`#${id}`).addClass("error")
    }
}

Array.prototype.areNumbers = function(){
    let retour = true
    this.forEach(function(element){
        if(!isNumberFormated(element)){
            retour = false
        }
    })
    return retour
}