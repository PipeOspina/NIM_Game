import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import './index.scss'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from 'react-router-dom'
import Home from './pages/Home'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import config from './utils/consts/config'
import Engine from './utils/game-engine/model/Engine'
import Board from './utils/game-engine/model/Board'
import { Button } from '@material-ui/core'

firebase.initializeApp(config);

firebase.auth().onAuthStateChanged((usr: any) => {
  console.log(usr)
})

export default function App(): JSX.Element {
  const board = new Board()
  const gameEngine = new Engine(board, 1, true)


  const call = () => {
    const i = Number.parseInt(window.prompt('i') || '0')
    const j = Number.parseInt(window.prompt('j') || '0')
    board.consoleDraw()

    //De momento funciona pero solo una vez, pues en la siguiente todos los binarios son pares, entonces no encuentra que hacer y no hace nada xF
  }

  const click = (event: React.BaseSyntheticEvent<HTMLButtonElement>) => {
    board.consoleDraw()
    gameEngine.step(call)
  }

  return (
    <Fragment>
      <Router>
        <Switch>
          <Route path='/home' component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
        </Switch>
      </Router>
      <Button
        onClick={click}
      >Presiona we :u</Button>
    </Fragment>
  )
}

const root = document.getElementById('app-root')

ReactDOM.render(<App />, root)
