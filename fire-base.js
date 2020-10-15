import firebase from "firebase/app";
import "firebase/auth"; // for authentication
import "firebase/firestore"; // for cloud firestore

const firebaseConfig = {
  apiKey: "AIzaSyBUBBm9Tj0RYbOXpBZao4dQ4LZYCcbz9IA",
  authDomain: "my-little-notebook.firebaseapp.com",
  databaseURL: "https://my-little-notebook.firebaseio.com",
  projectId: "my-little-notebook",
  storageBucket: "my-little-notebook.appspot.com",
  messagingSenderId: "132722912879",
  appId: "1:132722912879:web:f838cdbee3817ee9ece79a",
  measurementId: "G-GBW4Y81JKC",
};

if (!firebase.app.length) {
}

export class Firebase {
  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    this.db = firebase.app().firestore();
  }

  static defaultMapper = (doc) => ({ id: doc.id, ...doc.data() });
  static dateTransform = (firebaseDate) => {
    console.log("FECHA I: ", firebaseDate);
    return firebase.firestore.Timestamp(
      firebaseDate.seconds,
      firebaseDate.nanoseconds
    );
  };
}

const appFirebase = new Firebase();
export default appFirebase;
