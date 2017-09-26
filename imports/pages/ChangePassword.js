import React from 'react'
import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'
import validator from 'validator'
import { isEmpty } from 'lodash'
import TextFieldGroup from '../ui/components/TextFieldGroup'

export default class ChangePassword extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
            errors: {}
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    isValidate(data) {
        let errors = {}

        if (validator.isEmpty(data.oldPassword)) {
            errors.oldPassword = 'This field is required.'
        } else if (validator.equals(data.oldPassword, data.newPassword)) {
            errors.newPassword = "New password can't same old password."
        }
        if (validator.isEmpty(data.newPassword)) {
            errors.newPassword = 'This field is required.'
        } else if (validator.isLength(data.newPassword, { max: 7 })) {
            errors.newPassword = 'Enter a password at least 8 characters long.'
        }
        if (validator.isEmpty(data.confirmPassword)) {
            errors.confirmPassword = 'This field is required.'
        } else if (!validator.equals(data.newPassword, data.confirmPassword)) {
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
            Accounts.changePassword(this.state.oldPassword, this.state.newPassword, (err) => {
                if (err) {
                    this.setState({
                        errors: { oldPassword: err.reason },
                        oldPassword: ''
                    })
                } else {
                    this.setState({
                        message: 'Password is changed.',
                        oldPassword: '',
                        newPassword: '',
                        confirmPassword: ''
                    })
                }
            })
        }
    }
    
    render() {
        const { oldPassword, newPassword, confirmPassword, errors, message } = this.state
        return (
            <div className="container mt-5">
                <h1 className="text-center mb-4">Change Password Page</h1>
                <div className="row justify-content-center">
                    <form onSubmit={this.onSubmit}>
                        { message && <div className="alert alert-success">{message}</div> }
                        <TextFieldGroup
                            type="password"
                            label="Old Password"
                            field="oldPassword"
                            value={oldPassword}
                            onChange={this.onChange}
                            error={errors.oldPassword}
                        />

                        <TextFieldGroup
                            type="password"
                            label="New Password"
                            field="newPassword"
                            value={newPassword}
                            onChange={this.onChange}
                            error={errors.newPassword}
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
                                Change Password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}