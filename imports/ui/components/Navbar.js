import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Meteor } from 'meteor/meteor'

class Navbar extends React.Component {
    Logout(e) {
        e.preventDefault()
        Meteor.logout()
        this.props.history.push('/login')
    }
    
    render() {
        const NotLogin = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/signup">Signup</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
            </ul>
        )

        const LoggedIn = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" data-toggle="dropdown">My Account</a>
                    <div className="dropdown-menu dropdown-menu-right">
                        <Link className="dropdown-item" to="/dashboard">Dashboard</Link>
                        <Link className="dropdown-item" to="/changepassword">Change Password</Link>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" onClick={this.Logout.bind(this)}>Logout</a>
                    </div>
                </li>
            </ul>
        )

        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/">Meteor Blog</Link>
            
                <div className="collapse navbar-collapse">
                    { Meteor.userId() ? LoggedIn : NotLogin }
                </div>
            </nav>
        )
    }
}

export default withRouter(Navbar)