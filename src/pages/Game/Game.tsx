import React, { Fragment, useContext } from 'react'
import { UserContext } from '../../components/Auth/UserProvider'
import { signOut } from '../../components/Auth/FirebaseAuth'
import { useHistory } from 'react-router'
import Layout from '../../components/Layout/Layout'

export default function Game(): JSX.Element {
    const { user } = useContext(UserContext)

    const history = useHistory()

    return (
        <Layout>
            holi
        </Layout>
    )
}