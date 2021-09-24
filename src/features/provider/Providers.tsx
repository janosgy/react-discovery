import React, { useEffect } from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { Editor } from './Editor'
import { List } from './List'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchProviders, selectStatus } from './providerSlice'

export function Providers () {
  const { path } = useRouteMatch()
  const listStatus = useAppSelector(selectStatus)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (listStatus === 'idle') {
      dispatch(fetchProviders())
    }
  }, [listStatus, dispatch])

  return (
    <Switch>
      <Route exact path={path} component={List}/>
      <Route path={`${path}/:id`} component={Editor}/>
    </Switch>
  )
}
