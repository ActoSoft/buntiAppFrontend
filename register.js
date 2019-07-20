var config = {
  apiKey: "AIzaSyBSw1waeNb59opZJUxf4fHVBUgb1_6a0nQ",
  authDomain: "chatfirebase-51172.firebaseapp.com",
  projectId: "chatfirebase-51172"
};
firebase.initializeApp(config);

var db = firebase.firestore();

// Save Info

function Save() {
  var lat = document.getElementById("lat").value;
  var lon = document.getElementById("lon").value;
  var users = document.getElementById("users").value;
  var place = document.getElementById("place").value;
  var pago = document.getElementById("pago").value;
  console.log(lat+" "+lon+" "+users);
 
  moment = new Date();
  var year = moment.getFullYear().toString();
  var month = (moment.getMonth() + 1).toString();
  var day = moment.getDate().toString();
  var hour = moment.getHours().toString();
  var minute = moment.getMinutes().toString();
  var second = moment.getSeconds().toString();
  var date = day+"/"+month+"/"+year; 

  var exactTime = year + month + day + hour + minute + second;
  var temp = "";
   if (hour >= 12){
       temp = " P.M.";
   }
   if (hour < 12){
    temp = " A.M.";
    }
   var time = hour + ":" + minute + temp;
  console.log(exactTime);
  db.collection("service")
    .add({
      User: users,
      Latitude: lat,
      Longitude: lon,
      Place: place,
      PaymentMethod: pago,
      num: exactTime,
      ShippingTime: time,
      ShippingDate: date,
    })
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
      document.getElementById("users").value = "";
      document.getElementById("lat").value = "";
      document.getElementById("lon").value = "";
      document.getElementById("place").value = "";
      document.getElementById("pago").value = "";
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
}

// Users view select
/*
db.collection("users").onSnapshot(querySnapshot => {
    List = document.getElementById('users');
    List.innerHTML ='';
    querySnapshot.forEach(doc => {
      List.innerHTML += `<option value="${doc.data().Email}">${doc.data().Email}</option>`;
    });
  });
*/
