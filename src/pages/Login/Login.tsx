import React, { useState } from 'react'
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
  Box
} from '@material-ui/core'


export default function Login(props: any): JSX.Element {
  const preventDefault = (event: React.SyntheticEvent) => event.preventDefault()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [doRemember, setDoRemember] = useState(false)

  const [doUsrErr, setDoUsrErr] = useState(false)
  const [doPassErr, setDopassErr] = useState(false)

  const [doUsrBlur, setDoUsrBlur] = useState(false)
  const [doPassBlur, setDoPassBlur] = useState(false)

  const usrBlur = () => {
    setDoUsrBlur(true)
    setDoUsrErr(checkUsr(username))
  }

  const passBlur = () => {
    setDoPassBlur(true)
    setDopassErr(checkPass(password))
  }

  const toggleUsr = (event: any) => {
    const usr = event.target.value
    doUsrBlur ? setDoUsrErr(checkUsr(usr)) : 0
    setUsername(usr)
  }

  const togglePass = (event: any) => {
    const pass = event.target.value
    doPassBlur ? setDopassErr(checkPass(pass)) : 0
    setPassword(pass)
  }

  const checkUsr = (usr: string) => {
    const regex: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const err = !usr.match(regex)
    return err
  }

  const checkPass = (pass: string) => {
    return !pass
  }

  const submit = (event: any) => {
    preventDefault(event)
    setDoUsrBlur(true)
    setDoPassBlur(true)
    const anyUsrErr = checkUsr(username)
    const anyPassErr = checkPass(password)
    setDoUsrErr(anyUsrErr)
    setDopassErr(anyPassErr)
    const user = {
      usr: username,
      pass: password,
      remember: doRemember
    }
    if (anyUsrErr || anyPassErr) console.log('err')
    else console.log('logging in', user)
  }

  return (
    <Grid
      container
      spacing={0}
      alignItems="center"
      justify="center"
      className="container"
      direction="column"
    >
      err: {'' + doUsrErr}
      <form
        noValidate
        onSubmit={submit}
      >
        <TextField
          label="Usuario"
          type="email"
          variant="outlined"
          autoComplete="username"
          name="email"
          id="email"
          onChange={toggleUsr}
          onBlur={usrBlur}
          error={doUsrErr}
          autoFocus
          required
          InputLabelProps={
            {
              required: false
            }
          }
        />
        <TextField
          label="Contraseña"
          type="password"
          name="password"
          id="password"
          variant="outlined"
          autoComplete="current-password"
          onBlur={passBlur}
          onChange={togglePass}
          error={doPassErr}
          required
          InputLabelProps={
            {
              required: false
            }
          }
        />
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
              href="#"
              onClick={preventDefault}
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
    </Grid >
  )
}
