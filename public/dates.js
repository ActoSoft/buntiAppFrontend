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

// View List
var ViewList = document.getElementById('ListView');
var ViewList2 = document.getElementById('ListView2');

db.collection("usuarios").onSnapshot((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        db.collection("usuarios").doc(doc.id).collection("services").onSnapshot((querySnapshot) => {
            ViewList.innerHTML = '';
            ViewList2.innerHTML = '';
            var i=0;
            querySnapshot.forEach((doc) => {
                i++;
                notify();
                if (i%2){ console.log("Num "+i);
                ViewList.innerHTML += `<div class="global"><div class="default"><list class="list-group-item listStyle">
                <table class="table">
                        <tr class="tr"><td class="data">Usuario:</td><td><span class="data-info">${doc.data().usuario}</span></td></tr>
                        <tr><td class="data">Fecha de solicitud:</td><td><span class="data-info">${doc.data().fecha}</span></td></tr>
                        <tr><td class="data">Hora de solicitud:</td><td><span class="data-info">${doc.data().hora}</span></td></tr>
                        <tr><td class="data">Forma de pago:</td><td><span class="data-info">${doc.data().pago}</span></td></tr>
                        <tr><td class="data-center" colspan="2">Localización:</td></tr>
                        <tr><td colspan="2" class="data-place"><span>${doc.data().direccion}</span></td></tr>
                    </table></div>
                <div class="space">
                <label class="code">${doc.id}</label>
                <div class="footer-content">
                <button type="button" class="btn btn-info btn-sm"
                data-toggle="modal" onclick="DataTime('${doc.id}')">Aceptar</button>
                <button type="button" class="btn btn-danger btn-sm"
                data-toggle="modal" onclick="DeleteList('${doc.id}')">Rechazar</button></div></div></list></div>`;}
                else{ console.log("Num2 "+i);
                ViewList2.innerHTML += `<div class="global"><div class="default"><list class="list-group-item listStyle">
                <table class="table">
                        <tr class="tr"><td class="data">Usuario:</td><td><span class="data-info">${doc.data().usuario}</span></td></tr>
                        <tr><td class="data">Fecha de solicitud:</td><td><span class="data-info">${doc.data().fecha}</span></td></tr>
                        <tr><td class="data">Hora de solicitud:</td><td><span class="data-info">${doc.data().hora}</span></td></tr>
                        <tr><td class="data">Forma de pago:</td><td><span class="data-info">${doc.data().pago}</span></td></tr>
                        <tr><td class="data-center" colspan="2">Localización:</td></tr>
                        <tr><td colspan="2" class="data-place"><span>${doc.data().direccion}</span></td></tr>
                    </table></div>
                <div class="space">
                <label class="code">${doc.id}</label>
                <div class="footer-content">
                <button type="button" class="btn btn-info btn-sm"
                data-toggle="modal" onclick="DataTime('${doc.id}')">Aceptar</button>
                <button type="button" class="btn btn-danger btn-sm"
                data-toggle="modal" onclick="DeleteList('${doc.id}')">Rechazar</button></div></div></list></div>`; }   
            });
        });
    });
});


// Delete List
function DeleteList(id) {
    $('#DialogDelete').modal('show');
    $(document).ready(function(){
        $("#btn-delete").click(function(){
            db.collection("usuarios").onSnapshot((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    db.collection("usuarios").doc(doc.id).collection("services").doc(id).delete().then(function() {
                        console.log("Document successfully deleted!");
                        $('#DialogDelete').modal('hide');
                        $('#ToastC').toast('hide');
                        $('#ToastD').toast('show');
                    }).catch(function(error) {
                        console.error("Error removing document: ", error);
                    });
                });
           });
        });
      }); }

// Update Info & Time
function DataTime(id){
    $('#dialog').modal('show');
    $(document).ready(function(){
        $("#btn-save").click(function(){
            db.collection("usuarios").onSnapshot((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    var washingtonRef = db.collection("usuarios").doc(doc.id).collection("services").doc(id);
                    moment = new Date();
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
                        return washingtonRef.update({
                            Aceptado: true,
                            Tiempo: exactTime,
                            Minutos: time,
                        })
                    .then(function() {
                        console.log("Document successfully updated!");
                        document.getElementById('time').value = '';
                    })
                    .catch(function(error) {
                        // The document probably doesn't exist.
                        console.error("Error updating document: ", error);
                    });
                    });
            });
        });
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