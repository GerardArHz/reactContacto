import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDD6xVXzd_M-QxhK2o3v5b6zDjlHuiAAKw",
    authDomain: "appservicescloud.firebaseapp.com",
    databaseURL: "https://appservicescloud.firebaseio.com",
    projectId: "appservicescloud",
    storageBucket: "",
    messagingSenderId: "104917691745"
};

const database = firebase.initializeApp(config);

export default database;
