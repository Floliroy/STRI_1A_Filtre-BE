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

String.prototype.isNumberFormated = function(decimal, min){
    if(isNaN(this) || this<min || this=="" || (decimal && (this.includes(",") || this.includes(".")))){
        return false
    }
    return true
}

function removeClasses(id){
    $(`#${id}`).removeClass("unknow")
    $(`#${id}`).removeClass("error")
    $(`#${id}`).removeClass("validate")
}

function validateNumber(id, decimal, min){
    let element = document.getElementById(id).value
    if(element.isNumberFormated(decimal, min)){
        removeClasses(id)
        $(`#${id}`).addClass("validate")
    }else{
        removeClasses(id)
        $(`#${id}`).addClass("error")
    }
}

Map.prototype.areNumbers = function(){
    let retour = true
    for(let [key, value] of this){
        if(!value.nombre.isNumberFormated(value.decimal, value.min)){
            retour = false
        }
    }
    return retour
}