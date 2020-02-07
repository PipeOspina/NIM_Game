import React, { useState, useContext } from "react";
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
  Button,
  Typography,
  Link,
  Backdrop,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@material-ui/core'
import {
  Visibility,
  VisibilityOff
} from '@material-ui/icons'
import './Register.scss'
import Copyright from '../../components/Copyright'
import GoogleButton from '../../components/GoogleButton/GoogleButton'
import GoogleIcon from '../../components/icons/GoogleIcon'
import { register, signIn } from "../../components/Auth/FirebaseAuth";
import { UserContext, SET_USER } from "../../components/Auth/UserProvider";
import { Link as RouterLink, useHistory } from 'react-router-dom'

export default function Register(): JSX.Element {
  const [visibility, setVisibility] = useState(false)
  const [doCharge, setDoCharge] = useState(false)
  const [doNameErr, setDoNameErr] = useState(false)
  const [doLastErr, setDoLastErr] = useState(false)
  const [doNickErr, setDoNickErr] = useState(false)
  const [doEmailErr, setDoEmailErr] = useState(false)
  const [doPassErr, setDoPassErr] = useState(false)
  const [emailBlur, setEmailBlur] = useState(false)
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nameHelper, setNameHelper] = useState('')
  const [lastHelper, setLastHelper] = useState('')
  const [nickHelper, setNickHelper] = useState('')
  const [emailHelper, setEmailHelper] = useState('')
  const [passHelper, setPassHelper] = useState('')
  const [isDialogError, setIsDialogError] = useState(false)

  const functions = {
    setDoNameErr,
    setDoLastErr,
    setDoNickErr,
    setDoEmailErr,
    setDoPassErr,
    setName,
    setLastName,
    setNickname,
    setEmail,
    setPassword,
    setNameHelper,
    setLastHelper,
    setNickHelper,
    setEmailHelper,
    setPassHelper
  }

  const [openDialog, setOpenDialog] = useState(false)
  const [dialogMessage, setDialogMessage] = useState('')
  const [dialogTitle, setDialogTitle] = useState('')

  const { dispatch } = useContext(UserContext)
  const history = useHistory()

  const toggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    const name = event.target.name
    const id = event.target.id
    const fixed = typeof id === 'string' ? id.charAt(0).toUpperCase() + id.slice(1) : id
    const fixedName = typeof name === 'string' ? name.charAt(0).toUpperCase() + name.slice(1) : name
    if (!value) {
      functions['setDo' + fixed + 'Err'](true)
      functions['set' + fixed + 'Helper']('Completa este campo')
      functions['set' + fixedName](value)
      setEmailBlur(true)
    } else {
      functions['setDo' + fixed + 'Err'](false)
      functions['set' + fixed + 'Helper']('')
      functions['set' + fixedName](value)
    }
  }

  const emailToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (emailBlur && !value.match(regex)) {
      setDoEmailErr(true)
      setEmailHelper('Digita correctamente tu correo electrónico')
      setEmail(value)
    } else {
      toggle(event)
    }
  }

  const emailBlured = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailBlur(true)
    event.target.value ? emailToggle(event) : toggle(event)
  }

  const nickToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    value.includes(' ') ? event.target.value = nickname : toggle(event)
  }

  const submit = async (event: React.BaseSyntheticEvent) => {
    event.preventDefault()
    if (!doLastErr && !doNameErr && !doEmailErr && !doNickErr && !doPassErr) {
      setDoCharge(true)
      await register(email, password, name, lastName)
        .then(usr => {
          dispatch({ type: SET_USER, payload: usr })
          setDoCharge(false)
          setOpenDialog(true)
          setDialogTitle('Verificación')
          setDialogMessage(`Se ha enviado un link de verificación al correo electrónico ${email}`)
        }).catch(err => {
          switch (err.code) {
            case 'auth/email-already-in-use': {
              setEmailHelper('El correo electrónico ya está en uso')
              setDoEmailErr(true)
              break;
            }
            case 'auth/invalid-email': {
              setEmailHelper('Digita correctamente tu correo electrónico')
              setDoEmailErr(true)
              break;
            }
            case 'auth/weak-password': {
              setPassHelper('La contraseña es demasiado débil')
              setDoPassErr(true)
              break;
            }
            default: {
              setDialogTitle('No se pudo completar el registro')
              setIsDialogError(true)
              setDialogMessage('Error interno del servidor')
              setOpenDialog(true)
              break;
            }
          }
          setDoCharge(false)
        })
    }
  }

  const googleLogin = () => {
    setDoEmailErr(false)
    setDoPassErr(false)
    setEmailHelper('')
    setEmailBlur(false)
    setDoCharge(true)
    setOpenDialog(false)
    signIn(1, true)
      .then(usr => {
        dispatch({ type: SET_USER, payload: usr })
        setDoCharge(false)
        history.push('/game')
      }).catch(err => {
        setOpenDialog(true)
        setIsDialogError(true)
        setDialogTitle('Error al registrarse con Google')
        switch (err.code) {
          case 'auth/cancelled-popup-request': {
            setDialogMessage('El registro ha sido bloqueado por el servidor')
            break;
          }
          case 'auth/popup-blocked': {
            setDialogMessage('El Pop-Up ha sido bloqueado por el navegador')
            break;
          }
          case 'auth/popup-closed-by-user': {
            setDialogMessage('Cerraste el PopUp de registro con Google antes de tiempo')
            break;
          }
          default: {
            setDialogMessage('Error al tratar de registrar con Google')
            break;
          }
        }
        setDoCharge(false)
      })
  }

  const handleClickShowPassword = () => setVisibility(visibility => !visibility)

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
            error={doNameErr}
            helperText={nameHelper}
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
            error={doLastErr}
            helperText={lastHelper}
            required
            InputLabelProps={
              {
                required: false
              }
            }
          />
        </Grid>
        <TextField
          label="Nombre en el juego"
          type="text"
          variant="outlined"
          autoComplete="nickname"
          name="nickname"
          id="nick"
          onChange={nickToggle}
          onBlur={toggle}
          error={doNickErr}
          helperText={nickHelper}
          required
          InputLabelProps={
            {
              required: false
            }
          }
        />
        <TextField
          label="Correo electrónico"
          type="email"
          variant="outlined"
          autoComplete="email"
          name="email"
          id="email"
          onChange={emailToggle}
          onBlur={emailBlured}
          error={doEmailErr}
          helperText={emailHelper}
          required
          InputLabelProps={
            {
              required: false
            }
          }
        />
        <FormControl variant="outlined"
          error={doPassErr}>
          <InputLabel>Contraseña</InputLabel>
          <OutlinedInput
            type={visibility ? 'text' : 'password'}
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
                    !visibility ?
                      <Visibility color={doPassErr ? 'secondary' : 'inherit'} /> :
                      <VisibilityOff color={doPassErr ? 'secondary' : 'inherit'} />
                  }
                </IconButton>
              </InputAdornment>
            }
            labelWidth={86}
            name="password"
            id="pass"
            required
          />
          {doPassErr ? <FormHelperText>{passHelper}</FormHelperText> : ''}
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
      <Typography>
        <Grid
          container
        >
          <Grid xs item ></Grid>
          <Grid>
            <Link
              to="/login"
              component={RouterLink}
            >
              ¿Ya tienes una cuenta? Inicia sesión
            </Link>
          </Grid>
        </Grid>
      </Typography>
      <Box>
        <Copyright />
      </Box>
      <Backdrop open={doCharge} className='backdrop' >
        <LinearProgress className="charge" />
      </Backdrop>
      <Dialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false)
          setIsDialogError(false)
        }}
      >
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          {isDialogError ?
            <Button onClick={googleLogin} color="primary">
              Intentar Nuevamente
            </Button> : ''
          }
          <Button
            onClick={() => {
              !isDialogError ? history.push('/login') : 0
              setOpenDialog(false)
              setIsDialogError(false)
            }}
            color="primary">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  )
}
