import React from 'react'
import ReactDOM from 'react-dom'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import './index.scss'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import Home from './pages/Home'
import Engine from './utils/game-engine/model/Engine'
import Board from './utils/game-engine/model/Board'
import Game from './pages/Game/Game'
import PrivateRoute from './components/Auth/PrivateRoute'
import { UserProvider } from './components/Auth/UserProvider'

export default function App(): JSX.Element {
  return (
    <Router>
      <Switch>
        <Route path='/home' component={Home} />
        <PrivateRoute path='/game' component={Game} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route exact path="/">
          <Redirect to='/login' />
        </Route>
      </Switch>
    </Router>
  )
  /*
  const currentUser = useContext(AuthContext)

  const board = new Board()
  const gameEngine = new Engine(board, 1)


  const call = async () => {
    board.consoleDraw()
    let continuar = 'si';
    while (continuar === 'si' || continuar === '') {
      const i = Number.parseInt(await window.prompt('i') || '0')
      const fromj = Number.parseInt(await window.prompt('From j') || '0')
      const toj = Number.parseInt(await window.prompt('To j') || '0')
      board.getBoardRows()[i].getToothpicks().forEach((tooth, j) => {
        if (j >= fromj && j <= toj) {
          tooth.disable()
        }
      })
      continuar = await window.prompt('Digite "si" si desea seguir ingresando datos') || ''
      board.consoleDraw()
    }
    setTimeout(() => {
      gameEngine.step(call)
      board.consoleDraw()
    }, 5000);
    //gameEngine.step(call)
    //De momento funciona pero solo una vez, pues en la siguiente todos los binarios son pares, entonces no encuentra que hacer y no hace nada xF
  }

  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path='/home' component={Home} />
          <Route path='/game'>
            {currentUser ? <Game /> : <Redirect to='/login' />}
          </Route>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route exact path="/">
            <Redirect to="/game" />
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
  )
  */
}

const root = document.getElementById('app-root')
ReactDOM.render((<UserProvider><App /></UserProvider>), root)
