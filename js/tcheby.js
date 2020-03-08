function br(nbTour){
  for(let i=0 ; i<nbTour ; i++){
    let newLink = document.createElement('br')
    document.getElementById('result').appendChild(newLink)
  }
}

function print(texte){
  let newLinkText = document.createTextNode(texte)
  document.getElementById('result').appendChild(newLinkText)
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

Array.prototype.areNumbers = function(){
  let retour = true
  this.forEach(function(element){
    if(isNaN(element) || element<0 || element==""){
      retour = false
    }
  })
  return retour
}

function tchebi(){
  let ordre = document.getElementById("ordre").value
  let attenuation = document.getElementById("attenuation").value
  let frequence = document.getElementById("frequence").value
  let resistance = document.getElementById("resistance").value

  const parametres = [ordre, attenuation, frequence, resistance]

  if (parametres.areNumbers()){
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
    br(1)
    print(`Rn = ${Math.round(rn*100)/100} Ω`)

    let cpt = 0
    for(let i=1; i<=Math.ceil(ordre/2) ; i++){
      br(2)
      cpt++
      let res = c[i]
      print(`C[${cpt}] = ${res.toExponential(2)} F`)

      if((i) != Math.ceil(ordre/2)){
        br(2)
        cpt++
        res = l[i]
        print(`L[${cpt}] = ${res.toExponential(2)} H`)
      }
    }
  }else{
    let message = ""
    if(isNaN(ordre) || ordre<0 || ordre==""){
      message += "\nVeuillez remplir correctement l'ordre du filtre."
    }
    if(isNaN(attenuation) || attenuation<0 || attenuation==""){
      message += "\nVeuillez remplir correctement le taux atténuation."
    }
    if(isNaN(frequence) || frequence<0 || frequence==""){
      message += "\nVeuillez remplir correctement la fréquence de coupure."
    }
    if(isNaN(resistance) || resistance<0 || resistance==""){
      message += "\nVeuillez remplir correctement l'impédance."
    }
    window.alert(message)
  }
}