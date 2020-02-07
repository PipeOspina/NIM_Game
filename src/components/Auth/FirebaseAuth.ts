import * as firebase from 'firebase/app'
import 'firebase/auth'
import { User } from '@firebase/auth-types'
import config from '../../utils/consts/config'

export const WITH_GOOGLE = 1
export const WITH_EMAIL = 2

const app = firebase.initializeApp(config)

export default app

export const getUser = async (): Promise<User | null> => {
    return await new Promise(resolve => {
        app.auth().onAuthStateChanged((usr) => {
            resolve(usr)
        })
    })
}

export const register = async (email: string, password: string, name: string, lastName: string) => {
    return await new Promise(async (resolve, reject) => {
        await app.auth().createUserWithEmailAndPassword(email, password).catch(reject)
        const user: User | null = await getUser()
        user ? await user.sendEmailVerification() : null
        const displayName = `${name.charAt(0).toUpperCase()}${name.slice(1).toLowerCase()} ${lastName.charAt(0).toUpperCase()}${lastName.slice(1).toLowerCase()}`
        user ? user.updateProfile({ displayName }) : 0
        resolve(await signOut())
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
    })
}

export const sendVerification = async () => {
    return await new Promise(async (resolve, reject) => {
        const user = await getUser()
        if (user) {
            await user.sendEmailVerification().catch(reject)
            resolve(await getUser())
        }
    })
}

export const verifyUser = async (code: string) => {
    return await new Promise(async (resolve, reject) => {
        await app.auth().applyActionCode(code).then(res => {
            console.log('code', res)
        }).catch(reject)
        resolve(await getUser())
    })
}