import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import Login from './pages/Login/Login'
import './index.scss'

export default function App(): JSX.Element {
  return (
    <Login></Login>
  )
}

const root = document.getElementById('app-root')

ReactDOM.render(<App />, root)
