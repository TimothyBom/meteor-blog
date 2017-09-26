import React from 'react'
import SignupForm from '../ui/components/user/SignupForm'

const SignupPage = props => (
    <div className="container mt-5">
        <h1 className="text-center mb-4">Signup Page</h1>
        <div className="row justify-content-center">
            <SignupForm history={props.history} />
        </div>
    </div>
)

export default SignupPage