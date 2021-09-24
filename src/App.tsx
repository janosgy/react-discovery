import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route, Redirect
} from 'react-router-dom'

import './App.css'
import { Providers } from './features/provider/Providers'

function App (): JSX.Element {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/providers" component={Providers}/>
          <Redirect exact from="/" to="/providers"/>
        </Switch>
      </div>
    </Router>
  )
}

export default App
