import React from 'react'
import LoginForm from '../ui/components/user/LoginForm'

const LoginPage = props => (
    <div className="container mt-5">
        <h1 className="text-center mb-4">Login Page</h1>
        <div className="row justify-content-center">
            <LoginForm history={props.history} />
        </div>
    </div>
)

export default LoginPage