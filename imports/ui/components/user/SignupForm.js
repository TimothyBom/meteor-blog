import React from 'react'
import { Accounts } from 'meteor/accounts-base'
import validator from 'validator'
import { isEmpty } from 'lodash'
import TextFieldGroup from '../TextFieldGroup'

class SignupForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            confirmPassword: '',
            errors: {}
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    isValidate(data) {
        let errors = {}

        if (validator.isEmpty(data.username)) {
            errors.username = 'This field is required.'
        }
        if (validator.isEmpty(data.password)) {
            errors.password = 'This field is required.'
        } else if (validator.isLength(data.password, { max: 7 })) {
            errors.password = 'Enter a password at least 8 characters long.'
        }
        if (validator.isEmpty(data.confirmPassword)) {
            errors.confirmPassword = 'This field is required.'
        } else if (!validator.equals(data.password, data.confirmPassword)) {
            errors.confirmPassword = "Password didn't match."
        }

        return {
            errors,
            isValid: isEmpty(errors)
        }
    }

    isValid() {
        const { errors, isValid } = this.isValidate(this.state)

        if (!isValid) {
            this.setState({ errors })
        }

        return isValid
    }

    onChange(e) {
        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors)
            delete errors[e.target.name]
            this.setState({
                [e.target.name]: e.target.value,
                errors
            })
        } else {
            this.setState({ [e.target.name]: e.target.value })
        }
    }

    onSubmit(e) {
        e.preventDefault()
        if (this.isValid()) {
            this.setState({ errors: {} })
            const userInfo = {
                username: this.state.username,
                password: this.state.password
            }
            Accounts.createUser(userInfo, (err) => {
                if(err) {
                    this.setState({ errors: { form: err.reason } })
                } else {
                    this.props.history.push('/')
                }
            })
        }
    }
    
    render() {
        const { username, password, confirmPassword, errors } = this.state
        return (
            <form onSubmit={this.onSubmit}>
                { errors.form && <div className="alert alert-danger">{errors.form}</div> }
                <TextFieldGroup
                    label="Username"
                    field="username"
                    value={username}
                    onChange={this.onChange}
                    error={errors.username}
                />

                <TextFieldGroup
                    type="password"
                    label="Password"
                    field="password"
                    value={password}
                    onChange={this.onChange}
                    error={errors.password}
                />

                <TextFieldGroup
                    type="password"
                    label="Confirm Password"
                    field="confirmPassword"
                    value={confirmPassword}
                    onChange={this.onChange}
                    error={errors.confirmPassword}
                />
                
                <div className="form-group">
                    <button
                        type="submit"
                        className="btn btn-primary">
                        Sign Up
                    </button>
                </div>
            </form>
        )
    }
}

export default SignupForm