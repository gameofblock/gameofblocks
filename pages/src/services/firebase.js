// const firebase = require("firebase");
// require("firebase/firestore");


export function getFirestore() {
    // firebase.initializeApp({
    //   apiKey: process.env.FIREBASE_API_KEY,
    //   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    //   projectId: process.env.FIREBASE_PROJECT_ID
    // });

    // const firestore = firebase.firestore()
    // const settings = { timestampsInSnapshots: true }
    // firestore.settings(settings)
    // return firestore
  }

export function createNewsletterSubscription(email) {
    // const firestore = getFirestore()
    // return firestore.collection('newsletter').add({
    //   email: email,
    //   createdAt: firestore.FieldValue.serverTimestamp()
    // })
  }