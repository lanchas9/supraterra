function actualizar(){
    iniciarLoader()
    const url= 'https://mosaico.app:3000/listaFotografiasPendientes'
    fetch (url)
    .then(response => response.json() )
    .then(data => {
        // console.log(data)
        let lista = data.archivosPendientes
        // console.log(lista.length)

        lista.forEach(element => {
            
            let jsonFoto = element
            // console.log(jsonFoto.url)
            if (document.getElementById(jsonFoto.archivo)){
                console.log("ya existe: " + jsonFoto.archivo)
            }else{
                agregaFoto(jsonFoto.url, jsonFoto.archivo, "", "")
            }
        });
        finLoader()
    })
    .catch(err=> {
        console.log(err)
        finLoader()
    })
}

function restaurarFotos(){
    const url= 'https://mosaico.app:3000/restaurarFotos'
    fetch (url)
    .then(response => response.json() )
    .then(data => {
        console.log(data)
    })
    .catch(err=> {
        console.log(err)
    })
}

function iniciarLoader(){
 var divPadre = document.createElement("div");
 divPadre.setAttribute("class", "lds-spinner");
 divPadre.setAttribute("id", "david-spinner");
 
 for (var i=1;i<=12;i++){
    var divHijo = document.createElement("div");
    divPadre.appendChild(divHijo); 
 }   
 console.log("Vamos a agregar al padre")
 console.log(divPadre)
 document.getElementById('davidLoader').appendChild(divPadre); 
}

function finLoader(){
    document.getElementById('david-spinner').remove();
}

function agregaFoto(url, archivo, nombre, telefono){
    let nombreDivParaAgregarFotosNuevas = 'padreFoto'
    
    var elemDiv = document.createElement("div");
    elemDiv.setAttribute("class", "elementoFoto");
    elemDiv.setAttribute("id", archivo);
    
    var elemDivFoto = document.createElement("div");
    elemDivFoto.setAttribute("class", "divFoto");

    var elem = document.createElement("img");
    elem.setAttribute("id", 'FOTO'+ archivo);
    elem.setAttribute("class", 'imagen');
    elem.setAttribute("src", url);
    elem.setAttribute("height", "400");
    elem.setAttribute("alt", archivo);
    // elem.setAttribute("class", 'logo');
    
    elemDivFoto.appendChild(elem);
    elemDiv.appendChild(elemDivFoto);
    /*
    var elemNombre = document.createElement("h2");
    elemNombre.innerHTML = nombre
    elemNombre.setAttribute("class", 'nombreFoto');
    elemDiv.appendChild(elemNombre);
	
	var elemTelefono = document.createElement("h2");
    let tel = telefono.substring(3,telefono.length)
    let telefonoFinal = ""
    if (tel.substring(0,2)=="55"){
        telefonoFinal = "(" + tel.substring(0,2) + ")" + tel.substring(2, telefono.length)
    }else{
        telefonoFinal = "(" + tel.substring(0,3) + ")" + tel.substring(3, telefono.length)
    }
    elemTelefono.innerHTML = telefonoFinal
    elemTelefono.setAttribute("class", 'nombreFoto');
    elemDiv.appendChild(elemTelefono);
	*/
    // document.getElementById(nombreDivParaAgregarFotosNuevas).appendChild(elemBr);
    // document.getElementById(nombreDivParaAgregarFotosNuevas).appendChild(elemBr);
    // document.getElementById(nombreDivParaAgregarFotosNuevas).appendChild(elemBr);
    
    var elemBotonSi = document.createElement("input");
    elemBotonSi.setAttribute("type", "button");
    elemBotonSi.setAttribute("class", "btn1");
    elemBotonSi.setAttribute("id", 'SI'+ archivo);
    elemBotonSi.setAttribute("value", "Aceptar");
    elemBotonSi.setAttribute("onclick", `aceptar("${archivo}")`);
    elemDiv.appendChild(elemBotonSi);
    
    var elemBotonNo = document.createElement("input");
    elemBotonNo.setAttribute("type", "button");
    elemBotonNo.setAttribute("class", "btn2");
    elemBotonNo.setAttribute("id", 'NO'+ archivo);
    elemBotonNo.setAttribute("value", "Rechazar");
    elemBotonNo.setAttribute("onclick", `rechazar("${archivo}")`);
    elemDiv.appendChild(elemBotonNo);
   
    document.getElementById(nombreDivParaAgregarFotosNuevas).appendChild(elemDiv);    
    // document.getElementById(nombreDivParaAgregarFotosNuevas).appendChild(elemBr);    
    // document.getElementById(nombreDivParaAgregarFotosNuevas).appendChild(elemBr);
}

function aceptar(id){
    // console.log("aceptar:" + id)
    let archivosPendientes = [];
    archivosPendientes.push({
        "archivo" : id,
        "status": true
    })
    let respuesta = JSON.stringify(archivosPendientes)
    let respuestaJson =  `{
        "archivosPendientes" : ${respuesta}
    }`
    fetch ('https://mosaico.app:3000/listaArchivosModerados' , {
    method: 'POST',
    body: respuestaJson,
    headers: {
        'Content-Type' : 'application/json'       
    }})
    .then((response) => response.json())
    .then(data =>{
        console.log(data);
        document.getElementById(id).remove();
    })
}

function rechazar(id){
    // console.log("rechazar:" + id)
    let archivosPendientes = [];
    archivosPendientes.push({
        "archivo" : id,
        "status": false
    })
    let respuesta = JSON.stringify(archivosPendientes)
    let respuestaJson =  `{
        "archivosPendientes" : ${respuesta}
    }`

    fetch ('https://mosaico.app:3000/listaArchivosModerados' , {
    method: 'POST',
    body: respuestaJson,
    headers: {
        'Content-Type' : 'application/json'       
    }})
    .then((response) => response.json())
    .then(data =>{
        console.log(data);
        document.getElementById(id).remove();
    })
}