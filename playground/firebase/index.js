  import firebase from 'firebase';
  
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC25irOGtDwBX9Lp6SmpbbGQIxe1BvnL6E",
    authDomain: "react-todo-app-823cd.firebaseapp.com",
    databaseURL: "https://react-todo-app-823cd.firebaseio.com",
    storageBucket: "react-todo-app-823cd.appspot.com",
    messagingSenderId: "364193688583"
  };
  firebase.initializeApp(config);

var firebaseRef = firebase.database().ref();

  firebaseRef.set({
      app: {
          name: 'Todo App',
          version: '1.0.0'
      },
      isRunning: true,
      user: {
          name: 'Tony',
          age: 25
      }
  });

var todosRef = firebaseRef.child('todos');

todosRef.on('child_added', (snapshot) => {
    console.log('child_added', snapshot.key, snapshot.val());
});

todosRef.push({
    text: 'walk the dog'
});
todosRef.push({
    text: 'walk the cat'
});