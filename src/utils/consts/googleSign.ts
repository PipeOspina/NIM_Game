import * as firebase from "firebase/app";
import "firebase/auth";

export default function login() {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
  firebase.auth().languageCode = "es";

  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

  return firebase.auth().signInWithPopup(provider);
}

export function logout() {
  firebase
    .auth()
    .signOut()
    .then((result: any) => {
      console.log(result);
    })
    .catch(() => {});
}
