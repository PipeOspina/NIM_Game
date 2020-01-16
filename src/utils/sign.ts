import * as firebase from "firebase/app";
import "firebase/auth";

export default function realLogin(
  email: string,
  pass: string,
  doRemember: boolean
) {
  const persistence = doRemember
    ? firebase.auth.Auth.Persistence.LOCAL
    : firebase.auth.Auth.Persistence.SESSION;

  firebase.auth().setPersistence(persistence);

  return firebase.auth().signInWithEmailAndPassword(email, pass);
}
