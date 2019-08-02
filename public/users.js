// Registro de datos
var config = {
    apiKey: "AIzaSyBSw1waeNb59opZJUxf4fHVBUgb1_6a0nQ",
    authDomain: "chatfirebase-51172.firebaseapp.com",
    databaseURL: "https://chatfirebase-51172.firebaseio.com",
    projectId: "chatfirebase-51172",
    storageBucket: "chatfirebase-51172.appspot.com",
    messagingSenderId: "107651213265"
};
  firebase.initializeApp(config);
  var db = firebase.firestore();
  
  function Register(){
    $('#dialogR').modal('show');
    $(document).ready(function(){
        $("#btn-save").click(function(){
            var correo = document.getElementById('emailR').value;
            var pass = document.getElementById('passR').value;
            firebase.auth().createUserWithEmailAndPassword(correo, pass)
            .then(function(){
                alert("Has sido registrado!");
                Change();
            })
            .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                alert("Creo que ya tienes cuenta :o");
                $('#DialogL').modal('show');
                console.log(errorCode);
                console.log(errorMessage);
                // ...
             });
             $('#dialogR').modal('hide');
        });
      });
}

function Login(){
    $('#DialogL').modal('show');
    $(document).ready(function(){
        $("#btn-delete").click(function(){
            var correo = document.getElementById('email').value;
            var pass = document.getElementById('pass').value;
            firebase.auth().signInWithEmailAndPassword(correo, pass)
            .then(function(){
                alert("Iniciaste sesión");
                var face="index.html" 
        document.location.href=face;
            })
            .catch(function(error) {
                // Handle Errors here.
                alert("Correo o contrseña incontrrecto");
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
                // ...
            });
            $('#DialogL').modal('hide');
        });
      });
}
function Change(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            var UserName= user.displayName;
            var UserEmail = user.email;
            db.collection("users").add({
                Email: UserEmail,
            })
            .then(function(docRef) {
                location.reload();
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });
        } else {
          // User is signed out.
          console.log('no existe usuario activo')
          // ...
        }
      });
}


