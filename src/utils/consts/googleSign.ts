import * as firebase from "firebase/app";
import "firebase/auth";

export default function login(doRemember: boolean) {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
  firebase.auth().languageCode = "es";

  const persistence = doRemember
    ? firebase.auth.Auth.Persistence.LOCAL
    : firebase.auth.Auth.Persistence.SESSION;

  firebase.auth().setPersistence(persistence);

  return firebase.auth().signInWithPopup(provider);
}

export function logout() {
  firebase
    .auth()
    .signOut()
    .then((result: any) => {
      console.log(result);
    })
    .catch((err: any) => {});
}
