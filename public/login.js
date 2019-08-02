$(".txtb input").on("focus", function(){
  $(this).addClass("focus");
})
$(".txtb input").on("blur", function(){
 if ($(this).val () == "")
 $(this).removeClass("focus");
});

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

function Login() {
  var correo = document.getElementById("email").value;
  var pass = document.getElementById("pass").value;
  firebase.auth().signInWithEmailAndPassword(correo, pass).then(function() {
        document.getElementById("email").value = "";
        document.getElementById("pass").value = "";
        var page="window.html";
        document.location.href=page;
    })
    .catch(function(error) {
      alert("Error al iniciar sesión (Datos incorrectos).");
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
}
