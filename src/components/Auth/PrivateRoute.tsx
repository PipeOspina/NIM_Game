import React, { useContext } from 'react'
import { Route, useHistory } from 'react-router-dom'
import { getUser } from './FirebaseAuth'
import { Async } from 'react-async'
import { User } from 'firebase'
import { UserContext, SET_USER } from './UserProvider'

export default function PrivateRoute({ component: RouteComponent, ...rest }: any): JSX.Element {
    const { dispatch } = useContext(UserContext)
    const history = useHistory()

    const redirect = () => {
        history.replace('/login')
    }

    return (
        <Async promiseFn={getUser}>
            <Async.Fulfilled>{
                (usr: User) => {
                    dispatch({ type: SET_USER, payload: usr })
                    return (
                        <Route
                            {...rest}
                            render={(routeProps?: any) => {
                                return (
                                    usr ?
                                        usr.email ?
                                            usr.email !== '' ?
                                                <RouteComponent {...routeProps} /> :
                                                redirect() ://<Redirect push to='/login' /> :
                                            redirect() ://<Redirect push to='/login' /> :
                                        redirect() //<Redirect push to='/login' />
                                )
                            }}
                        />
                    )
                }
            }</Async.Fulfilled>
        </Async>
    )
}