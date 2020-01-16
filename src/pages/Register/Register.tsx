import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
  Box,
  LinearProgress,
  Button
} from '@material-ui/core'
import {
  Visibility,
  VisibilityOff
} from '@material-ui/icons'
import './Register.scss'
import Copyright from '../../components/Copyright'
import googleLogin from '../../utils/consts/googleSign'
import { register } from '../../utils/sign'
import GoogleButton from '../../components/GoogleButton/GoogleButton'
import GoogleIcon from '../../components/icons/GoogleIcon'
import * as firebase from 'firebase/app'
import 'firebase/auth'


export default function Register(): JSX.Element {
  const [states, setStates] = useState({
    visibility: false,
    doCharge: false,
    doNameErr: false,
    doLastErr: false,
    doNickErr: false,
    doEmailErr: false,
    doPassErr: false,
    emailBlur: false,
    name: '',
    lastName: '',
    nickname: '',
    email: '',
    password: '',
    nameHelper: '',
    lastHelper: '',
    nickHelper: '',
    emailHelper: '',
    passHelper: ''
  })

  const toggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    const name = event.target.name
    const id = event.target.id
    const fixed = typeof id === 'string' ? id.charAt(0).toUpperCase() + id.slice(1) : id
    if (!value) {
      setStates({ ...states, ['do' + fixed + 'Err']: true, [id + 'Helper']: 'Completa este campo', [name]: value, emailBlur: true })
    } else {
      setStates({ ...states, ['do' + fixed + 'Err']: false, [id + 'Helper']: '', [name]: value })
    }
  }

  const emailToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    states.emailBlur && !value.match(regex) ?
      setStates({ ...states, doEmailErr: true, emailHelper: 'Digita correctamente tu correo electrónico', email: value }) :
      toggle(event)
  }

  const emailBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStates({ ...states, emailBlur: true })
    event.target.value ? emailToggle(event) : toggle(event)
  }

  const nickToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    value.includes(' ') ? event.target.value = states.nickname : toggle(event)
  }

  const submit = (event: React.BaseSyntheticEvent) => {
    event.preventDefault()
    if (!states.doLastErr && !states.doNameErr && !states.doEmailErr && !states.doNickErr && !states.doPassErr) {
      setStates({ ...states, doCharge: true })
      register(states.email, states.password).then(() => {
        const user = firebase.auth().currentUser
        user.updateProfile({
          displayName: states.name + ' ' + states.lastName
        }).then(() => {
          user.sendEmailVerification().then(() => {
            setStates({ ...states, doCharge: false })
            console.log('Te hemos enviado un correo electrónico')
          }).catch(() => {
            setStates({ ...states, doCharge: false })
            console.log('Correo electrónico fallido :c')
          })
        }).catch(() => {
          setStates({ ...states, doCharge: false })
        })
      }).catch(() => {
        setStates({ ...states, doCharge: false })
      })
    }
  }

  const handleClickShowPassword = () => setStates({ ...states, ['visibility']: !states.visibility })

  const preventDefault = (event: React.BaseSyntheticEvent) => event.preventDefault()

  return (
    <Grid
      container
      spacing={0}
      alignItems="center"
      justify="center"
      className="container"
      direction="column"
    >
      <form
        noValidate
        onSubmit={submit}
      >
        <Grid
          container
          item
          direction="row"
          className="names"
        >
          <TextField
            label="Nombre"
            type="text"
            variant="outlined"
            autoComplete="given-name"
            name="name"
            id="name"
            onChange={toggle}
            onBlur={toggle}
            error={states.doNameErr}
            helperText={states.nameHelper}
            required
            InputLabelProps={
              {
                required: false
              }
            }
          />
          <TextField
            label="Apellido"
            type="text"
            variant="outlined"
            autoComplete="family-name"
            name="lastName"
            id="last"
            className="last-name"
            onChange={toggle}
            onBlur={toggle}
            error={states.doLastErr}
            helperText={states.lastHelper}
            required
            InputLabelProps={
              {
                required: false
              }
            }
          />
        </Grid>
        <TextField
          label="Nombre En El Juego"
          type="text"
          variant="outlined"
          autoComplete="nickname"
          name="nickname"
          id="nick"
          onChange={nickToggle}
          onBlur={toggle}
          error={states.doNickErr}
          helperText={states.nickHelper}
          required
          InputLabelProps={
            {
              required: false
            }
          }
        />
        <TextField
          label="Correo Electrónico"
          type="email"
          variant="outlined"
          autoComplete="email"
          name="email"
          id="email"
          onChange={emailToggle}
          onBlur={emailBlur}
          error={states.doEmailErr}
          helperText={states.emailHelper}
          required
          InputLabelProps={
            {
              required: false
            }
          }
        />
        <FormControl variant="outlined"
          error={states.doPassErr}>
          <InputLabel>Contraseña</InputLabel>
          <OutlinedInput
            type={states.visibility ? 'text' : 'password'}
            onChange={toggle}
            onBlur={toggle}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={preventDefault}
                  edge="end"
                >
                  {
                    !states.visibility ?
                      <Visibility color={states.doPassErr ? 'secondary' : 'inherit'} /> :
                      <VisibilityOff color={states.doPassErr ? 'secondary' : 'inherit'} />
                  }
                </IconButton>
              </InputAdornment>
            }
            labelWidth={86}
            name="password"
            id="pass"
            required
          />
          {states.doPassErr ? <FormHelperText>{states.passHelper}</FormHelperText> : ''}
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          type="submit"
        >
          Registrarse
        </Button>
        <GoogleButton
          variant="contained"
          color="primary"
          className="google-btn"
          onClick={googleLogin}
        >
          <GoogleIcon
            className="my-icon"
            fontSize="small"
          />
          Registrarse con Google
        </GoogleButton>
      </form>
      <Box>
        <Copyright />
      </Box>
      {states.doCharge ? <LinearProgress className="charge" /> : ''}
    </Grid>
  )
}
