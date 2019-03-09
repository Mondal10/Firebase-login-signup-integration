//////// Initialize Firebase ///////////
// Only replace the part within "initial Firebase".
var config = {
    apiKey: "AIzaSyDegEn0QBowj2pzL4vgTRs47b7HSGhSJF8",
    authDomain: "projectv1-2c008.firebaseapp.com",
    databaseURL: "https://projectv1-2c008.firebaseio.com",
    projectId: "projectv1-2c008",
    storageBucket: "projectv1-2c008.appspot.com",
    messagingSenderId: "1007456456027"
};
firebase.initializeApp(config);
///////// Initialize Firebase //////////////

// Make auth and firestore references
const auth = firebase.auth();
const dataBase = firebase.firestore();