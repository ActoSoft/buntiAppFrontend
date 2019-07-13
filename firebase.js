var config = {
    apiKey: "AIzaSyBSw1waeNb59opZJUxf4fHVBUgb1_6a0nQ",
    authDomain: "chatfirebase-51172.firebaseapp.com",
    projectId: "chatfirebase-51172",
  };
  firebase.initializeApp(config);
  
  var db = firebase.firestore();

  // View List 
var ViewList = document.getElementById('ListView');
db.collection("service").orderBy("num", "desc").onSnapshot((querySnapshot) => {
    ViewList.innerHTML = ''; 
    querySnapshot.forEach((doc) => {
        notify();
        ViewList.innerHTML += `<li class="list-group-item">
        <div class="space"><p>Usuario: ${doc.data().user}</p>
        <p class="code">${doc.id}</p></div>
        <p>Localización: ${doc.data().location}</p>
        <p>Hora: ${doc.data().time}</p>       
        <button type="button" class="btn btn-info btn-sm" 
        data-toggle="modal" onclick="DataTime()">Aceptar</button>
        <button type="button" class="btn btn-danger btn-sm" 
        data-toggle="modal" onclick="DeleteList('${doc.id}')">Rechazar</button></li>`
        
        
       
            
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
                $('.toast').toast('hide');
            }).catch(function(error) {
                console.error("Error removing document: ", error);
            });
        });
      }); 
}    

// Save Info
function Save(){
  var time = document.getElementById('time').value;
  db.collection("serviceTime").add({
      time: time,
  })
  .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
      document.getElementById('time').value = '';     
  })
  .catch(function(error) {
      console.error("Error adding document: ", error);
  });
} 

function DataTime(){       
    $('#dialog').modal('show');
    $(document).ready(function(){
        $("#btn-save").click(function(){
            Save();
            $('#dialog').modal('hide');
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
        $('.toast').toast('show');
      });
      var audio = document.getElementById("audio");

      audio.play();  
}


