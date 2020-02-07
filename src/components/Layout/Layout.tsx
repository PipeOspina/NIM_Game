import React, { Props, useContext } from 'react'
import { AppBar, Toolbar, IconButton, Avatar, ButtonBase, Button } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import Person from '@material-ui/icons/Person'
import { UserContext } from '../Auth/UserProvider'
import './Layout.scss'
import { signOut } from '../Auth/FirebaseAuth'

export default function Layout({ children }: Props<Element>): JSX.Element {
    const { user } = useContext(UserContext)
    const avatarAlt = user ? user.displayName ? user.displayName : '' : ''
    const photoURL = user ? user.photoURL ? user.photoURL : '' : ''
    const letters = avatarAlt.split(' ').map((word) => word.charAt(0).toUpperCase()).join('')

    console.log('url', photoURL, 'alt', avatarAlt, 'user', user)

    return (
        <AppBar color='inherit'>
            <Toolbar>
                <IconButton color='primary'>
                    <MenuIcon />
                </IconButton>
                <div className='avatar'>
                    <ButtonBase className='personal-button' onClick={signOut} centerRipple>
                        <Avatar alt={avatarAlt} src={photoURL} className='back-avatar'>
                            {letters ? letters : <Person />}
                        </Avatar>
                    </ButtonBase>
                </div>
            </Toolbar>
        </AppBar>
    )
}