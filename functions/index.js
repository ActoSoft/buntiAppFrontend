/* eslint-disable promise/no-nesting */
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.sendPushNotification = functions.firestore.document('services/{id}').onUpdate((change) => {
    if(!change.before.data().aceptado)
    {
        minutes = change.after.data().minutos
        user = change.after.data().userReference
        return user.get().then(userDoc => {
            token = userDoc.data().app_token
            const payload = {
                data: {
                    title: "Tu taxi se encuentra en camino",
                    body:"Llegará muy pronto a tu destino",
                    minutes
                }
            }
            return admin.messaging().sendToDevice(token, payload)
                .then(response => {
                    console.log("Se envió la notificación de manera correcta")
                    console.log(response)
                    return response
                })
                .catch(error => {
                    console.log("Algo falló " + error)
                })
        })
    }
    else {
        return "Ya pasó"
    }
})

exports.sendPushNotificationRechazado = functions.firestore.document('services/{id}').onDelete((snapshot) => {
    const user = snapshot.data().userReference
    return user.get().then(userDoc => {
        token = userDoc.data().app_token
        const payload = {
            data: {
                title: "Se he rechazado tu viaje",
                body: "No hay taxis disponibles"
            }
        }
        return admin.messaging().sendToDevice(token, payload)
            .then(response => {
                console.log("Se envió la notificación de manera correcta")
                console.log(response)
                return response
            })
            .catch(error => {
                console.log("Algo falló " + error)
            })
    })
})