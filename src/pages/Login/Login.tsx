import React from 'react'
import Copyright from '../../components/Copyright'
import './Login.scss'
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
  console.log(props)
  return (
    <Grid
      container
      spacing={0}
      alignItems="center"
      justify="center"
      className="container"
      direction="column"
    >
      <form noValidate>
        <TextField
          label="Usuario"
          type="email"
          variant="outlined"
          autoComplete="username"
          name="email"
          id="email"
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
            />
          }
          label="Recuérdame"
          className="checkbox"
        />
        <Button
          variant="contained"
          color="primary"
          className="Button"
        >
          Entrar
        </Button>
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
