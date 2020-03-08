function tcheby(){
    let ordre = document.getElementById("ordre").value
    let attenuation = document.getElementById("attenuation").value
    let frequence = document.getElementById("frequence").value
    let resistance = document.getElementById("resistance").value

    let parametres = new Map()
    parametres.set("ordre", {nombre: ordre, decimal: true, min: 1})
    parametres.set("attenuation", {nombre: attenuation, decimal: false, min: 0})
    parametres.set("frequence", {nombre: frequence, decimal: false, min: 0})
    parametres.set("resistance", {nombre: ordre, decimal: false, min: 0})

    if(parametres.areNumbers()){
        const pi = Math.PI

        ordre = parseFloat(ordre)
        attenuation = parseFloat(attenuation)
        frequence = parseFloat(frequence)
        resistance = parseFloat(resistance)

        const choixFreq = document.getElementById("choixFrequence")
        frequence = frequence * Math.pow(10, parseFloat(choixFreq.options[choixFreq.selectedIndex].value))

        let pulsation = 2 * pi * frequence
        let beta = Math.log((myCos(attenuation / 17.37)) / (mySin(attenuation / 17.37)))
        let gamma = mySin(beta / (2 * ordre))

        let r
        if (ordre%2 != 0){
            r = 1
        }else{
            r = myTan(beta / 4) * myTan(beta / 4)
        }
        let rn = r * resistance

        let ak = []
        for(let i=1 ; i<=ordre ; i++){
            ak[i] = Math.sin((2 * i - 1) * pi / (2 * ordre))
        }

        let bk = []
        for(let i=1 ; i<=ordre ; i++){
            bk[i] = gamma * gamma + Math.sin((i) * pi / ordre) * Math.sin((i) * pi / ordre)
        }

        let gk = []
        gk[1] = 2 * ak[1] / gamma
        for(let i=2 ; i<=ordre ; i++){
            gk[i] = 4 * ak[i-1] * ak[i] / (bk[i-1] * gk[i-1])
        }

        let l = []
        for(let i=1 ; i<=ordre ; i++){
            l[i] = resistance * gk[i] / pulsation
        }

        let c = []
        for(let i=1 ; i<=ordre ; i++){
            c[i] = gk[i] / (resistance * pulsation)
        }

        if ((ordre%2)==0) {
            ordre++
        }

        document.getElementById("result").innerHTML = ""
        createTable(rn, c,l)

    }else{
        let message = ""
        if(!ordre.isNumberFormated(true, 1)){
            message += "<br/>Veuillez remplir correctement l'ordre du filtre."
        }
        if(!attenuation.isNumberFormated(false, 0)){
            message += "<br/>Veuillez remplir correctement le taux d'atténuation."
        }
        if(!frequence.isNumberFormated(false, 0)){
            message += "<br/>Veuillez remplir correctement la fréquence de coupure."
        }
        if(!resistance.isNumberFormated(false, 0)){
            message += "<br/>Veuillez remplir correctement l'impédance."
        }
        document.getElementById("dialog").innerHTML = message
        $("#dialog").dialog("open")
    }
}