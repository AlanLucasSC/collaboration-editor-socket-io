var firebase = require('firebase');

var config = {
    apiKey: "AIzaSyDWPNv8jnHuo17O8SblKeciZTqu0qKNzRk",
    authDomain: "az-editor-online.firebaseapp.com",
    databaseURL: "https://az-editor-online.firebaseio.com",
    projectId: "az-editor-online",
    storageBucket: "gs://az-editor-online.appspot.com/",
    messagingSenderId: "372729218502"
};

exports.firebaseImpl = firebase.initializeApp(config)
exports.firebaseDatabase = firebase.database()
