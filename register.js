var config = {
    apiKey: "AIzaSyBSw1waeNb59opZJUxf4fHVBUgb1_6a0nQ",
    authDomain: "chatfirebase-51172.firebaseapp.com",
    projectId: "chatfirebase-51172",
  };
  firebase.initializeApp(config);

  var db = firebase.firestore();

  // Save Info
  function Save(){
      var name = document.getElementById('name').value;
      var location = document.getElementById('location').value;
      var time = document.getElementById('time').value;
      moment = new Date();
        var year = moment.getFullYear().toString();
        var month = (moment.getMonth()+1).toString();
        var day = moment.getDate().toString();
        var hour = moment.getHours().toString();
        var minute = moment.getMinutes().toString();
        var second = moment.getSeconds().toString();
        var exactTime = year+month+day+hour+minute+second;
        console.log(exactTime);
   db.collection("service").add({
        user: name,
        location: location,
        time: time,
        num: exactTime,
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

