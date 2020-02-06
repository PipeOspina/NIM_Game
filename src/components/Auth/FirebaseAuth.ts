import * as firebase from 'firebase/app'
import 'firebase/auth'
import config from '../../utils/consts/config'

export const WITH_GOOGLE = 1
export const WITH_EMAIL = 2

const app = firebase.initializeApp(config)

export default app

export const getUser = async () => {
    return await new Promise(resolve => {
        app.auth().onAuthStateChanged((usr) => {
            console.log('promise', usr)
            resolve(usr)
        })
    })
}

export const signIn = async (type: 1 | 2, doRemember: boolean, email?: string, password?: string) => {
    return await new Promise(async (resolve, reject) => {
        const persistence = doRemember
            ? firebase.auth.Auth.Persistence.LOCAL
            : firebase.auth.Auth.Persistence.SESSION;
        app.auth().setPersistence(persistence);
        app.auth().languageCode = "es";

        switch (type) {
            case WITH_GOOGLE: {
                const provider = new firebase.auth.GoogleAuthProvider();
                await app.auth().signInWithPopup(provider).catch(reject);
                break;
            }
            case WITH_EMAIL: {
                if (!email || !password) reject(new Error('Email and password needed!'))
                else await app.auth().signInWithEmailAndPassword(email, password).catch(reject);
                break;
            }
            default: {
                await app.auth().signOut().catch(reject)
            }
        }
        resolve(await getUser())
    })
}

export const signOut = async () => {
    return await new Promise(async (resolve, reject) => {
        await app.auth().signOut().catch(reject)
        resolve(await getUser())
    }
    )
}