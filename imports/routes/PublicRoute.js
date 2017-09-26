import React from 'react'
import { Meteor } from 'meteor/meteor'
import { Route, Redirect } from 'react-router-dom'

const PublicRoute = ({ component: Component, ...rest, isAuthenticated }) => (
    <Route
        {...rest}
        render={props =>
        Meteor.userId()
        ? <Redirect to={{ pathname: '/' }}/>
        : <Component {...props}/>}
    />
)

export default PublicRoute