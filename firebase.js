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
        db.ref('mensajes').orderByChild('date').on('child_added', function(data){
        
        //db.ref().child('users'){ } 
            
            $('#list').append('<li class="list-group-item"><p>'+data.val().mensaje+
            '</p><button type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#dialog">Aceptar</button><button type="button" class="btn btn-danger btn-sm">Rechazar</button></li>');
            notify();
        });
    });        

    function notify(){
        
            var notification = new Notification("Un viaje nuevo!");
        
    }
    