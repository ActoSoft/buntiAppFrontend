var config = {
  apiKey: "AIzaSyA_I_x2mljXdhCaCucr8VDS6EVssspryx0",
  authDomain: "buntiapp-82c84.firebaseapp.com",
  databaseURL: "https://buntiapp-82c84.firebaseio.com",
  projectId: "buntiapp-82c84",
  storageBucket: "buntiapp-82c84.appspot.com",
  messagingSenderId: "422168280434",
  appId: "1:422168280434:web:bb44667cfc19a11d"
  };
  firebase.initializeApp(config);
  var db = firebase.firestore();
  var firstTime = true

// View List
var ViewList = document.getElementById('ListView');
var ViewList2 = document.getElementById('ListView2');
var i = 0;
db.collection("services").orderBy("exactTime", "desc").onSnapshot(async querySnapshot => {
    await querySnapshot.forEach(async serviceDoc => {
        ViewList.innerHTML = '';
        ViewList2.innerHTML = '';
        notify();
        const serviceData = await serviceDoc.data()
        if(!serviceData.aceptado) { //Excluimos los servicios que ya han sido aceptados
            i++;
            if (i%2){
                ViewList.innerHTML += `<div class="global"><div class="default"><list class="list-group-item listStyle">
                <table class="table">
                        <tr class="tr"><td class="data">Usuario:</td><td><span class="data-info">${serviceData.usuario}</span></td></tr>
                        <tr><td class="data">Fecha de solicitud:</td><td><span class="data-info">${serviceData.fecha}</span></td></tr>
                        <tr><td class="data">Hora de solicitud:</td><td><span class="data-info">${serviceData.hora}</span></td></tr>
                        <tr><td class="data">Forma de pago:</td><td><span class="data-info">${serviceData.pago}</span></td></tr>
                        <tr><td class="data-center" colspan="2">Localización:</td></tr>
                        <tr><td colspan="2" class="data-place"><span>${serviceData.direccion}</span></td></tr>
                    </table></div>
                <div class="space">
                <label class="code">${serviceData.id}</label>
                <div class="footer-content">
                <button type="button" class="btn btn-info btn-sm"
                data-toggle="modal" onclick="DataTime('${serviceDoc.id}')">Aceptar</button>
                <button type="button" class="btn btn-danger btn-sm"
                data-toggle="modal" onclick="DeleteList('${serviceDoc.id}')">Rechazar</button></div></div></list></div>`;
            } else {
                ViewList2.innerHTML += `<div class="global"><div class="default"><list class="list-group-item listStyle">
                <table class="table">
                        <tr class="tr"><td class="data">Usuario:</td><td><span class="data-info">${serviceData.usuario}</span></td></tr>
                        <tr><td class="data">Fecha de solicitud:</td><td><span class="data-info">${serviceData.fecha}</span></td></tr>
                        <tr><td class="data">Hora de solicitud:</td><td><span class="data-info">${serviceData.hora}</span></td></tr>
                        <tr><td class="data">Forma de pago:</td><td><span class="data-info">${serviceData.pago}</span></td></tr>
                        <tr><td class="data-center" colspan="2">Localización:</td></tr>
                        <tr><td colspan="2" class="data-place"><span>${serviceData.direccion}</span></td></tr>
                    </table></div>
                <div class="space">
                <label class="code">${serviceData.id}</label>
                <div class="footer-content">
                <button type="button" class="btn btn-info btn-sm"
                data-toggle="modal" onclick="DataTime('${serviceDoc.id}')">Aceptar</button>
                <button type="button" class="btn btn-danger btn-sm"
                data-toggle="modal" onclick="DeleteList('${serviceDoc.id}')">Rechazar</button></div></div></list></div>`;
            }
        }
    });
});

// Delete List
function DeleteList(serviceId) {
    $('#DialogDelete').modal('show');
    $("#btn-delete").click(function(){
        db.collection("services").doc(serviceId).delete()
        .then(function() {
            $('#DialogDelete').modal('hide');
            $('#ToastC').toast('hide');
            $('#ToastD').toast('show');
        })
        .catch(function(error) {
            console.error("Error removing document: ", error);
        })
    });
}

function Validation(){
    var dateNum = document.getElementById('time').value;
    var txtNotify = document.getElementById('text-notify');
    var n = parseInt(dateNum);
    if (n==0){
        txtNotify.innerHTML = 'No puede ingresar 0 minutos.';
    }
    if (n<0){
        txtNotify.innerHTML = `No puede ingresar ${n} minutos.`;
    }
    if (n>0){
        txtNotify.innerHTML = '';
    }
}
// Update Info & Time
function DataTime(serviceId){
    $('#dialog').modal('show');
    $("#btn-save").click(function(){
        const serviceRef = db.collection("services").doc(serviceId)
        now = new Date();
        var year = moment.getFullYear();
        var month = (moment.getMonth()+1);
        var day = moment.getDate();
        var hour = moment.getHours();
        var minute = moment.getMinutes();
        var second = moment.getSeconds();
        var exactTime = day+"/"+month+"/"+year+"  "+hour+":"+minute+":"+second;
        var timeNum = document.getElementById('time').value;
        var time = timeNum +" minutos";
        $('#dialog').modal('hide');
        serviceRef.update({
            aceptado: true,
            tiempo: exactTime,
            minutos: time
        })
        .then(function() {
            document.getElementById('time').value = ''
            $('#ToastC').toast('hide');
            $('#ToastA').toast('show');
        })
        .catch(function() {
            alert("Ocurrió un error al aceptar el viaje")
        })
    });
}

function notify(){
   moment = new Date();
   var hour = moment.getHours();
   var minute = moment.getMinutes();
   var temp = "";
   if (hour >= 12){
       temp = " P.M.";
   }
   if (hour < 12){
    temp = " A.M.";
    }
   var exactTime = "Hoy, "+ hour + ":" + minute + temp;
   document.getElementById('moment').innerHTML= exactTime;
    $(document).ready(function(){
        $('#ToastC').toast('show');
        var audio = document.getElementById("audio");
        audio.play().catch(error => {
            console.log("Error al reproducir");
          });;
      });
}

function closeToast(){
    $('.toast').toast('hide');
}

 function Close() {
    $('#DialogClose').modal('show');
    $(document).ready(function(){
        $("#btn-close").click(function(){
    firebase.auth().signOut()
    .then(function(){
        var page="index.html";
        document.location.href=page;
    })
    .catch(function(error){
        console.log(error)
    })
    });
    });
}