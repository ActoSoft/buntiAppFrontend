var config = {
    apiKey: "AIzaSyBSw1waeNb59opZJUxf4fHVBUgb1_6a0nQ",
    authDomain: "chatfirebase-51172.firebaseapp.com",
    projectId: "chatfirebase-51172",
  };
  firebase.initializeApp(config);
  
  var db = firebase.firestore();
 
// View List 
var ViewList = document.getElementById('ListView');
var ViewList2 = document.getElementById('ListView2');
db.collection("service").orderBy("num", "desc").onSnapshot((querySnapshot) => {
    ViewList.innerHTML = '';
    ViewList2.innerHTML = '';
    var i=0; 
    querySnapshot.forEach((doc) => {
        i++;
        notify();
        if (i%2){
        ViewList.innerHTML += `<div class="global"><div class="default"><list class="list-group-item listStyle">
        <table class="table">
                <tr class="tr"><td class="data">Usuario:</td><td><span class="data-info">${doc.data().User}</span></td></tr>
                <tr><td class="data">Localización:</td><td><span class="data-info">${doc.data().Place}</span></td></tr>
                <tr><td class="data">Fecha de solicitud:</td><td><span class="data-info">${doc.data().ShippingDate}</span></td></tr>
                <tr><td class="data">Fecha de solicitud:</td><td><span class="data-info">${doc.data().ShippingTime}</span></td></tr>
                <tr><td class="data">Forma de pago:</td><td><span class="data-info">${doc.data().PaymentMethod}</span></td></tr>
            </table></div>
        <div class="space">
        <label class="code">${doc.id}</label>
        <div class="footer-content">       
        <button type="button" class="btn btn-info btn-sm" 
        data-toggle="modal" onclick="DataTime('${doc.id}')">Aceptar</button>
        <button type="button" class="btn btn-danger btn-sm" 
        data-toggle="modal" onclick="DeleteList('${doc.id}')">Rechazar</button></div></div></list></div>`;}
        else{
        ViewList2.innerHTML += `<div class="global"><div class="default"><list class="list-group-item listStyle">
        <table class="table">
                <tr class="tr"><td class="data">Usuario:</td><td><span class="data-info">${doc.data().User}</span></td></tr>
                <tr><td class="data">Localización:</td><td><span class="data-info">${doc.data().Place}</span></td></tr>
                <tr><td class="data">Fecha de solicitud:</td><td><span class="data-info">${doc.data().ShippingDate}</span></td></tr>
                <tr><td class="data">Fecha de solicitud:</td><td><span class="data-info">${doc.data().ShippingTime}</span></td></tr>
                <tr><td class="data">Forma de pago:</td><td><span class="data-info">${doc.data().PaymentMethod}</span></td></tr>
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


 
// Delete List
function DeleteList(id) { 
    $('#DialogDelete').modal('show');
    $(document).ready(function(){
        $("#btn-delete").click(function(){
            db.collection("service").doc(id).delete().then(function() {
                console.log("Document successfully deleted!");
                $('#DialogDelete').modal('hide');
                $('#ToastC').toast('hide');
                $('#ToastD').toast('show');
            }).catch(function(error) {
                console.error("Error removing document: ", error);
            });
        });
      }); 
}    

// Update Info & Time
function DataTime(id){       
    $('#dialog').modal('show');
    $(document).ready(function(){
        $("#btn-save").click(function(){
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
            var washingtonRef = db.collection("service").doc(id);
            $('#dialog').modal('hide');
            return washingtonRef.update({
                Accepted: true,
                TimestampAccepted: exactTime,
                WaitingTime: time,    
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


