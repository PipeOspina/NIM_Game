import React, { createContext, useReducer } from 'react'
import { getUser } from './FirebaseAuth'

export const SET_USER = 1

interface User {
    email: string
}

interface Dispatch {
    type?: 1
    payload?: any
}

interface Reducer {
    user?: User
    dispatch?: any
}

const initialUser: User = async () => await getUser()

const initialReducer: Reducer = {
    user: initialUser(),
    dispatch: {}
}

const UserContext = createContext(initialReducer)
const { Provider } = UserContext

const reducer = (user: User, dispatch: Dispatch) => {
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