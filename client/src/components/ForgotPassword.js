import React, { Component } from 'react';
import { connect } from 'react-redux';
import UIkit from "uikit";
import { validateEmailFormat } from 'utils/validators';

const initialState = {
    email: "",
    valid: true
}

export class ForgotPassword extends Component {
    constructor(props) {
        super(props)
        this.state = initialState
    }

    handleChange = e => this.setState({ [e.target.name]: e.target.value, valid: true })

    handleSubmit = e => {
        e.preventDefault()
        let validEmail = this.state.email.length > 0 && validateEmailFormat(this.state.email)
        if (!validEmail) {
            return this.setState({ valid: false })
        }

        this.props.dispatch({ type: "RECOVERY_LINK", email: this.state.email })
    }

    render() {
        UIkit.util.on(document, 'beforeshow', '#forgotPassword', () => this.setState(initialState))
        return (
            <div id="forgotPassword" className="uk-flex-top" style={{ zIndex: 5 }} uk-modal="bg-close: false">
                <div className="uk-modal-dialog uk-margin-auto-vertical">
                    <button className="uk-modal-close-default" uk-close=""></button>
                    <div className="uk-modal-header">
                        <h2 className="uk-modal-title">Easy to reset your password</h2>
                    </div>
                    <div className="uk-modal-body">
                        <input id="email" className={`uk-input ${this.state.valid ? '' : 'uk-form-danger'}`}
                            type="text" placeholder="Enter your registered email"
                            name="email" onChange={this.handleChange} value={this.state.email}
                            autoComplete="off" />
                        <small style={{ color: "red", display: this.state.valid ? "none" : "" }}>Please enter a valid email</small>
                    </div>
                    <div className="uk-modal-footer uk-text-right">
                        <button className="uk-button uk-button-primary uk-margin-small-right" onClick={this.handleSubmit}>Submit</button>
                        <button className="uk-button uk-button-danger" uk-toggle="target: #forgotPassword">Cancel</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, null)(ForgotPassword);