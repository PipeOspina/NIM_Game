import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import Login from './pages/Login/Login'
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
import config from './utils/consts/config'

firebase.initializeApp(config);

export default function App(): JSX.Element {
  return (
    <Router>
      <Switch>
        <Route path='/home' component={Home} />
        <Route path="/login" component={Login} />
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </Router>
  )
}

const root = document.getElementById('app-root')

ReactDOM.render(<App />, root)
