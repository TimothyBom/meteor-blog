import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Navbar from './components/Navbar'
import Home from '../pages/Home'
import SignupPage from '../pages/SignupPage'
import LoginPage from '../pages/LoginPage'
import ChangePassword from '../pages/ChangePassword'
import Dashboard from '../pages/Dashboard'
import PrivateRoute from '../routes/PrivateRoute'
import PublicRoute from '../routes/PublicRoute'

const App = () => (
    <Router>
        <div>
            <Navbar />
            <Switch>
                <Route exact path="/" component={Home} />
                <PublicRoute exact path="/signup" component={SignupPage} />
                <PublicRoute exact path="/login" component={LoginPage} />
                <PrivateRoute exact path="/changepassword" component={ChangePassword} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
        </div>
    </Router>
)

export default App