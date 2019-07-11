var config = {
    apiKey: "AIzaSyBSw1waeNb59opZJUxf4fHVBUgb1_6a0nQ",
    authDomain: "chatfirebase-51172.firebaseapp.com",
    projectId: "chatfirebase-51172",
  };
  firebase.initializeApp(config);
  
  var db = firebase.firestore();

  // Save Info
/*  var num = 0; 
  function Save(){
      var name = document.getElementById('name').value;
      var location = document.getElementById('location').value;
      var time = document.getElementById('time').value;
      num=num+1 
    db.collection("service").add({
        user: name,
        location: location,
        time: time,
        num: num,
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        document.getElementById('name').value = '';
        document.getElementById('location').value = '';
        document.getElementById('time').value = '';
        
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
} 
*/ 

// View List 
var ViewList = document.getElementById('ListView');
db.collection("service").orderBy("num", "desc").onSnapshot((querySnapshot) => {
    ViewList.innerHTML = ''; 
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().user}`);
        ViewList.innerHTML += `<li class="list-group-item">
        <p>Usuario: ${doc.data().user}</p>
        <p>Localización: ${doc.data().location}</p>
        <p>Hora: ${doc.data().time}</p>
        <p>Codigo: ${doc.id}</p>
        <button type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#dialog">Aceptar</button>
        <button type="button" class="btn btn-danger btn-sm" onclick="DeleteList('${doc.id}')">Rechazar</button></li>`,
        notify()
       
            
    });
});

// Delete List
function DeleteList(id) {
    db.collection("service").doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    }); 
}    

function notify(){
        
var notification = new Notification("Un viaje nuevo!");
        
}
    