import React from 'react'
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  Redirect
} from 'react-router-dom'
import { CountriesEditor } from './CountriesEditor'
import { Summary } from './Summary'

export function Editor () {
  const { path } = useRouteMatch()

  return (
    <div className="e-layout">
      <header className="e-layout__header e-layout__header-form">
        <Link to="/" className="e-layout__back">
          <e-layout-back-button>Go to Overview</e-layout-back-button>
        </Link>
        <h1 className="e-layout__title">Overview</h1>
      </header>
      <main className="e-layout__content e-layout__content-form">
        <Switch>
          <Route path={`${path}/countries`} component={CountriesEditor}/>
          <Route path={`${path}/summary`} component={Summary}/>
          <Redirect exact from={path} to={`${path}/countries`}/>
        </Switch>
      </main>
    </div>
  )
}
