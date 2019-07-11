var config = {
    apiKey: "AIzaSyBSw1waeNb59opZJUxf4fHVBUgb1_6a0nQ",
    authDomain: "chatfirebase-51172.firebaseapp.com",
    databaseURL: "https://chatfirebase-51172.firebaseio.com",
    projectId: "chatfirebase-51172",
    storageBucket: "chatfirebase-51172.appspot.com",
    messagingSenderId: "107651213265"
  };
  firebase.initializeApp(config);
 
  var db = firebase.database(); 
                
 
  $(document).ready(function(){
        
    var query = db.ref('mensajes').orderByChild('date');
       
    query.on('child_added', function(data){
            
            $('#list').append('<li class="list-group-item"><p>Usuario: '+data.val().mensaje+
            '</p><p>Localización: '+data.val().locate+'</p><p>Hora: '+data.val().time+'</p><button type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#dialog">Aceptar</button><button type="button" class="btn btn-danger btn-sm" onclick="DeleteList()">Rechazar</button></li>');
            notify();
        });
    });        

    function DeleteList(id){
        var referencia = db.ref('mensajes');  
        referencia.child(key).remove();
    }

    function notify(){
        
            var notification = new Notification("Un viaje nuevo!");
        
    }
    