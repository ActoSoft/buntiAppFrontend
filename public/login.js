$(".txtb input").on("focus", function(){
  $(this).addClass("focus");
})
$(".txtb input").on("blur", function(){
 if ($(this).val () == "")
 $(this).removeClass("focus");
});

var config = {
  authDomain: "buntiapp-82c84.firebaseapp.com",
  databaseURL: "https://buntiapp-82c84.firebaseio.com",
  projectId: "buntiapp-82c84",
  storageBucket: "buntiapp-82c84.appspot.com",
  messagingSenderId: "422168280434",
  appId: "1:422168280434:web:bb44667cfc19a11d"
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
