import React from 'react'
import classnames from 'classnames'

const TextFieldGroup = ({ type, field, value, label, error, onChange }) => (
    <div className="form-group">
        <label>{label}</label>
        <input
            type={type}
            className={classnames('form-control', { 'is-invalid': error })}
            name={field}
            value={value}
            onChange={onChange}
        />
        <div className="invalid-feedback">{error}</div>
    </div>
)

export default TextFieldGroup