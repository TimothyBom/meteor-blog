import React from 'react'
import { Meteor } from 'meteor/meteor'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
        Meteor.userId()
        ? <Component {...props}/>
        : <Redirect to={{ pathname: '/login' }}/>}
    />
)

export default PrivateRoute