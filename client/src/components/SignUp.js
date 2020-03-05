import React, { Component } from 'react'
import { connect } from 'react-redux'
import UIkit from "uikit"
import { validateEmailFormat, validateStrongPassword } from 'utils/validators'
import PasswordField from './PasswordField'

const initialState = {
    firstName: '',
    middleInitial: '',
    lastName: '',
    signupEmail: '',
    confirmEmail: '',
    signupPassword: '',
    confirmPassword: '',
    validfirstName: true,
    validmiddleInitial: true,
    validlastName: true,
    validsignupEmail: true,
    validconfirmEmail: true,
    validsignupPassword: true,
    validconfirmPassword: true,
    duplicateEmail: false,
}

export class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = initialState
    }

    handleChange = e => {
        let removedWarnFrom = `valid${e.target.id}`
        let duplicateEmail = e.target.name === 'signupEmail' ? false : this.state.duplicateEmail
        this.setState({ [e.target.name]: e.target.value, [removedWarnFrom]: true, duplicateEmail })
    }

    handleOnFocusPassword = e => {
        this.setState({ signupPassword: '', confirmPassword: '', validsignupPassword: true, validconfirmPassword: true })
    }

    handleSubmit = e => {
        e.preventDefault()
        let { firstName, lastName, middleInitial, signupEmail, confirmEmail, signupPassword, confirmPassword } = this.state
        let validfirstName = firstName.length > 1
        let validlastName = lastName.length > 1
        let validmiddleInitial = middleInitial.length === 0 || (middleInitial.length > 0 && isNaN(middleInitial))
        let validsignupEmail = signupEmail.length > 0 && validateEmailFormat(signupEmail)
        let validconfirmEmail = confirmEmail.length > 0 && confirmEmail === signupEmail
        let validsignupPassword = signupPassword.length > 5 && validateStrongPassword(signupPassword)
        let validconfirmPassword = confirmPassword.length > 5 && confirmPassword === signupPassword
        if (!validfirstName || !validlastName || !validmiddleInitial || !validsignupEmail || !validconfirmEmail || !validsignupPassword || !validconfirmPassword) {
            return this.setState({
                validfirstName, validlastName, validmiddleInitial,
                validsignupEmail, validconfirmEmail, validsignupPassword,
                validconfirmPassword
            })
        }

        this.props.sendSignUpForm({ firstName, lastName, middleInitial, signupEmail, signupPassword }, response => {
            switch (response) {
                case 'success':
                    UIkit.modal('#signUp').hide()
                    return UIkit.modal.dialog('<p class="uk-modal-body" style="color:green;text-align:center;">Successfully created an account</p>')
                case 'duplicate':
                    return this.setState({ duplicateEmail: true, confirmEmail: '' })
                default:
                    return

            }
        })
    }

    render() {
        UIkit.util.on(document, 'beforeshow', '#signUp', () => this.setState(initialState))
        return (
            <div id="signUp" className="uk-flex-top" style={{ zIndex: 5 }} uk-modal="bg-close: false">
                <div className="uk-modal-dialog uk-margin-auto-vertical">
                    <button className="uk-modal-close-default" uk-close=""></button>
                    <div className="uk-modal-header">
                        <h2 className="uk-modal-title">Create Account</h2>
                    </div>
                    <div className="uk-modal-body">
                        <form className="uk-form-stacked uk-grid-small" uk-grid="">
                            <div className="uk-width-3-5 uk-width-4-5@m">
                                <label className="uk-form-label uk-text-bold" htmlFor="form-stacked-text">First Name</label>
                                <input id="firstName" className={`uk-input ${this.state.validfirstName ? "" : "uk-form-danger"}`}
                                    type="text" placeholder="john"
                                    name="firstName" onChange={this.handleChange} value={this.state.firstName} />
                                <small style={{ color: "red", display: this.state.validfirstName ? "none" : "" }}>First name is too short</small>
                            </div>
                            <div className="uk-width-2-5 uk-width-1-5@m">
                                <label className="uk-form-label uk-text-bold" htmlFor="form-stacked-text">Middle Initial</label>
                                <input id="middleInitial" className={`uk-input ${this.state.validmiddleInitial ? "" : "uk-form-danger"}`}
                                    type="text" maxLength={1}
                                    name="middleInitial" onChange={this.handleChange} value={this.state.middleInitial} />
                                <small style={{ color: "red", display: this.state.validmiddleInitial ? "none" : "" }}>Alphabetics only</small>
                            </div>
                            <div className="uk-width-1-1">
                                <label className="uk-form-label uk-text-bold" htmlFor="form-stacked-text">Last Name</label>
                                <input id="lastName" className={`uk-input ${this.state.validlastName ? "" : "uk-form-danger"}`}
                                    type="text" placeholder="doe"
                                    name="lastName" onChange={this.handleChange} value={this.state.lastName} />
                                <small style={{ color: "red", display: this.state.validlastName ? "none" : "" }}>Last name is too short</small>
                            </div>
                            <div className="uk-width-1-1">
                                <label className="uk-form-label uk-text-bold" htmlFor="form-stacked-text">Email</label>
                                <input id="signupEmail"
                                    className={`uk-input ${this.state.validsignupEmail ? '' : 'uk-form-danger'}
                                                         ${this.state.duplicateEmail === false ? '' : 'uk-form-danger'}`}
                                    type="text" placeholder="john.doe@domain.com"
                                    name="signupEmail" onChange={this.handleChange} value={this.state.signupEmail} />
                                <small style={{ color: "red", display: this.state.validsignupEmail ? "none" : "" }}>Email is not valid</small>
                                <small style={{ color: "red", display: !this.state.duplicateEmail ? "none" : "" }}>Email is already taken</small>
                            </div>
                            <div className="uk-width-1-1">
                                <label className="uk-form-label uk-text-bold" htmlFor="form-stacked-text">Confirm Email</label>
                                <input id="confirmEmail" className={`uk-input ${this.state.validconfirmEmail ? '' : 'uk-form-danger'}`} type="text" placeholder="john.doe@domain.com"
                                    name="confirmEmail" onChange={this.handleChange} value={this.state.confirmEmail} />
                                <small style={{ color: "red", display: this.state.validconfirmEmail ? "none" : "" }}>Email is not matching</small>
                            </div>
                            <PasswordField
                                passwordId="signupPassword"
                                passwordValue={this.state.signupPassword}
                                isValidPassword={this.state.validsignupPassword}
                                confirmPasswordId="confirmPassword"
                                confirmPasswordValue={this.state.confirmPassword}
                                isValidConfirmPassword={this.state.validconfirmPassword}
                                onChange={this.handleChange}
                                onFocus={this.handleOnFocusPassword}
                            />
                        </form>
                    </div>
                    <div className="uk-modal-footer uk-text-right">
                        <button className="uk-button uk-button-primary uk-margin-small-right" onClick={this.handleSubmit}>Submit</button>
                        <button className="uk-button uk-button-danger" uk-toggle="target: #signUp">Cancel</button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    sendSignUpForm: (payload, callback) => dispatch({ type: "SIGN_UP", payload, callback })
})

export default connect(null, mapDispatchToProps)(SignUp);