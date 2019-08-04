$(".txtb input").on("focus", function(){
    $(this).addClass("focus");
  })
  $(".txtb input").on("blur", function(){
   if ($(this).val () == "")
   $(this).removeClass("focus");
  });

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

  function Register(){
            var correo = document.getElementById('email').value;
            var pass = document.getElementById('pass').value;
            firebase.auth().createUserWithEmailAndPassword(correo, pass)
            .then(function(){
                document.getElementById('email').value = "";
                document.getElementById('pass').value = "";
                alert("Has sido registrado! \nInicie sesión, por favor.");
                var page="index.html";
                document.location.href=page;
            })
            .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                alert("No ha sido registrado, inténtelo una vez más.");
                console.log(errorCode);
                console.log(errorMessage);
                // ...
             });
}