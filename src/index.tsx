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

firebase.initializeApp(config);

firebase.auth().onAuthStateChanged((usr: any) => {
  console.log(usr)
})

export default function App(): JSX.Element {
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
    </Fragment>
  )
}

const root = document.getElementById('app-root')

ReactDOM.render(<App />, root)
