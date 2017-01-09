import firebase from 'firebase';

try {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyC25irOGtDwBX9Lp6SmpbbGQIxe1BvnL6E",
        authDomain: "react-todo-app-823cd.firebaseapp.com",
        databaseURL: "https://react-todo-app-823cd.firebaseio.com",
        storageBucket: "react-todo-app-823cd.appspot.com",
        messagingSenderId: "364193688583"
    };
    firebase.initializeApp(config);
} catch (e){

}

export var firebaseRef = firebase.database().ref();
export default firebase;