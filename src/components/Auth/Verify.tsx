import React, { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router'
import { verifyUser } from './FirebaseAuth'
import { LinearProgress, Backdrop } from '@material-ui/core'

export default function Verify(): JSX.Element {
    const history = useHistory()
    const location = useLocation()
    const code = new URLSearchParams(location.search).get('oobCode') || ''

    useEffect(() => {
        verifyUser(code).then(() => {
            history.replace('login')
        })
    })

    return (
        <Backdrop open={true} className='backdrop' >
            <LinearProgress className="charge" />
        </Backdrop>
    )
}