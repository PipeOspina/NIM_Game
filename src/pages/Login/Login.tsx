import React, { useState, useContext, useEffect } from 'react'
import Copyright from '../../components/Copyright'
import './Login.scss'
import GoogleIcon from '../../components/icons/GoogleIcon'
import GoogleButton from '../../components/GoogleButton/GoogleButton'
import {
  Button,
  TextField,
  Grid,
  Checkbox,
  FormControlLabel,
  Typography,
  Link,
  Box,
  LinearProgress,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Backdrop
} from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { Link as RouterLink, useHistory } from 'react-router-dom'
import { UserContext, SET_USER } from '../../components/Auth/UserProvider'
import { signIn, WITH_EMAIL, getUser } from '../../components/Auth/FirebaseAuth'
import { useAsync, Async } from 'react-async'
import { User } from 'firebase'

export default function Login(): JSX.Element {
  const preventDefault = (event: React.SyntheticEvent) => event.preventDefault()

  const { dispatch } = useContext(UserContext)

  const { data: user, isLoading } = useAsync({ promiseFn: getUser })

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [doRemember, setDoRemember] = useState(false)

  const [doCharge, setDoCharge] = useState(false)

  const [visibility, setVisibility] = useState(false)

  const [usrHelper, setUsrHelper] = useState('')
  const [passHelper, setPassHelper] = useState('')
  const [googleErrorMessage, setGoogleErrorMessage] = useState('')

  const [doUsrErr, setDoUsrErr] = useState(false)
  const [doPassErr, setDoPassErr] = useState(false)

  const [doUsrBlur, setDoUsrBlur] = useState(false)
  const [doPassBlur, setDoPassBlur] = useState(false)

  const [openDialog, setOpenDialog] = useState(false)

  const history = useHistory();

  /*
  useEffect(() => {
    setDoCharge(isLoading)
  }, [isLoading])
  */

  user ? history.push('/game') : 0

  const usrBlur = () => {
    setDoUsrBlur(true)
    setDoUsrErr(checkUsr(username))
  }

  const passBlur = () => {
    setDoPassBlur(true)
    setDoPassErr(checkPass(password))
  }

  const toggleUsr = (event: React.ChangeEvent<HTMLInputElement>) => {
    const usr = event.target.value
    doUsrBlur ? setDoUsrErr(checkUsr(usr)) : 0
    setUsername(usr)
  }

  const togglePass = (event: React.ChangeEvent<HTMLInputElement>) => {
    const pass = event.target.value
    doPassBlur ? setDoPassErr(checkPass(pass)) : 0
    setPassword(pass)
  }

  const checkUsr = (usr: string) => {
    const regex: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const err = !usr.match(regex)
    err ? setUsrHelper('Digita correctamente tu correo electrónico') : setUsrHelper('')
    return err
  }

  const checkPass = (pass: string) => {
    !pass ? setPassHelper('Digita tu contraseña') : setPassHelper('')
    return !pass
  }

  const submit = (event: any) => {
    preventDefault(event)
    setDoUsrBlur(true)
    setDoPassBlur(true)
    const anyUsrErr = checkUsr(username)
    const anyPassErr = checkPass(password)
    setDoUsrErr(anyUsrErr)
    setDoPassErr(anyPassErr)

    if (!anyUsrErr && !anyPassErr) {
      setDoCharge(true)
      signIn(WITH_EMAIL, doRemember, username, password)
        .then(usr => {
          dispatch({ type: SET_USER, payload: usr })
          setDoCharge(false)
          history.push('/game')
        }).catch(err => {
          switch (err.code) {
            case 'auth/user-disabled':
              setUsrHelper('Usuario inhabilitado')
              setDoUsrErr(true)
              break;
            case 'auth/user-not-found':
              setUsrHelper('Usuario no encontrado')
              setDoUsrErr(true)
              break;
            case 'auth/wrong-password':
              setPassHelper('Contraseña incorrecta')
              setDoPassErr(true)
              break;
            default:
              setUsrHelper('Digita correctamente tu correo electrónico')
              setDoUsrErr(true)
              break;
          }
          setDoCharge(false)
        })
      setPassword('')
      /*
      realLogin(username, password, doRemember)
        .then(() => {
          setDoCharge(false)
          history.push('/game')
        })
        */
    }
  }

  const googleLogin = () => {
    setOpenDialog(false)
    setDoUsrErr(false)
    setDoPassErr(false)
    setDoUsrBlur(false)
    setDoPassBlur(false)
    setUsrHelper('')
    setPassHelper('')
    setDoCharge(true)
    signIn(1, true)
      .then(usr => {
        dispatch({ type: SET_USER, payload: usr })
        setDoCharge(false)
        history.push('/game')
      }).catch(err => {
        setOpenDialog(true)
        switch (err.code) {
          case 'auth/cancelled-popup-request': {
            setGoogleErrorMessage('El inicio de sesión ha sido bloqueado por el servidor')
            break;
          }
          case 'auth/popup-blocked': {
            setGoogleErrorMessage('El Pop-Up ha sido bloqueado por el navegador')
            break;
          }
          case 'auth/popup-closed-by-user': {
            setGoogleErrorMessage('Cerraste el PopUp de inicio de sesión con Google antes de tiempo')
            break;
          }
          default: {
            setGoogleErrorMessage('Error al tratar de iniciar sesión con Google')
            break;
          }
        }
        setDoCharge(false)
      })
    /*
    login().then(() => {
      setDoCharge(false)
    }).catch(() => {
      setDoCharge(false)
      setDoUsrErr(true)
      setUsrHelper('Se canceló el inicio de sesión con Google')
    })
    */
  }

  const handleClickShowPassword = () => {
    setVisibility(!visibility);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (!isLoading ?
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
        <TextField
          label="Correo Electrónico"
          type="email"
          variant="outlined"
          autoComplete="username"
          name="email"
          id="email"
          onChange={toggleUsr}
          onBlur={usrBlur}
          error={doUsrErr}
          helperText={usrHelper}
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
            onChange={togglePass}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
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
            id="password"
            autoComplete="current-password"
            onBlur={passBlur}
            required
          />
          {doPassErr ? <FormHelperText>{passHelper}</FormHelperText> : ''}
        </FormControl>
        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              onChange={(event: any) => setDoRemember(event.target.checked)}
            />
          }
          label="Recuérdame"
          className="checkbox"
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
        >
          Entrar
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
          Entrar con Google
        </GoogleButton>
      </form>
      <Typography>
        <Grid
          container
        >
          <Grid
            item
            xs
          >
            <Link
              href="#"
              onClick={preventDefault}
              className="link"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </Grid>
          <Grid
            item
          >
            <Link
              to="/register"
              component={RouterLink}
              className="register"
            >
              Registrarse
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
        onClose={() => setOpenDialog(false)}
      >
        <DialogTitle>{"Error al iniciar sesión con Google"}</DialogTitle>
        <DialogContent>
          <DialogContentText>{googleErrorMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={googleLogin} color="primary">
            Intentar Nuevamente
          </Button>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </Grid >
    : <div></div>)
}
