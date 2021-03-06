import React, { createContext, useReducer } from 'react'
import { getUser } from './FirebaseAuth'
import { User as FireUser } from '@firebase/auth-types'

export const SET_USER = 1

interface Dispatch {
    type?: 1
    payload?: any
}

interface Reducer {
    user?: FireUser
    dispatch?: any
}

const initialUser: Promise<FireUser> = async () => await getUser()

const initialReducer: Reducer = {
    user: initialUser(),
    dispatch: {}
}

const UserContext = createContext(initialReducer)
const { Provider } = UserContext

const reducer = (user: FireUser, dispatch: Dispatch) => {
    const { type, payload } = dispatch
    switch (type) {
        case SET_USER: {
            return payload
        }
        default: {
            return user
        }
    }
}

function UserProvider({ children }: JSX.ElementChildrenAttribute): JSX.Element {
    const [user, dispatch] = useReducer(reducer, initialUser)

    return (
        <Provider
            value={{ user, dispatch }}
        >
            {children}
        </Provider>
    )
}

export { UserContext, UserProvider }