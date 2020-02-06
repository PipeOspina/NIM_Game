import React, { Fragment, useContext } from 'react'
import { UserContext } from '../../components/Auth/UserProvider'
import { signOut } from '../../components/Auth/FirebaseAuth'
import { useHistory } from 'react-router'

export default function Game(): JSX.Element {
    const { user } = useContext(UserContext)

    const history = useHistory()

    const wait = async (ms: number) => {
        return new Promise(res => {
            setTimeout(() => {
                res()
            }, ms);
        })
    }

    return (
        <Fragment>
            <div>{user ? user.email : ''}</div>
            <button onClick={async () => {
                await wait(5000)
                await signOut()
                history.push('/login')
            }}>Logout</button>
        </Fragment>
    )
}