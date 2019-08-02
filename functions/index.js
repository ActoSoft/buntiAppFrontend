const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.sendPushNotification = functions.firestore.document('usuarios/{id}/services/{docId}').onWrite((change, context) => {
    // if (change.after.data().Accepted && change.after.data().WaitingTime) {

    // }
})