import React, { Component } from 'react'
import { connect } from 'react-redux'

const initialState = {
    userid: "",
    password: "",
    validuserid: true,
    validpassword: true,
}

export class SignIn extends Component {
    constructor(props) {
        super(props)
        this.state = initialState
    }

    handleOnFocus = e => {
        if (e.target.id === "password") this.setState({ password: "" })
    }

    handleChange = e => {
        let removedWarnFrom = `valid${e.target.id}`
        this.setState({ [e.target.name]: e.target.value, [removedWarnFrom]: true })
    }

    clearForm = e => this.setState(initialState)

    submitSignIn = e => {
        e.preventDefault()
        let validuserid = this.state.userid.length > 0
        let validpassword = this.state.password.length > 0
        if (!validuserid || !validpassword) {
            return this.setState({ validuserid, validpassword })
        }

        this.props.signin(this.state.userid, this.state.password)
    }

    render() {
        return (
            <div className="uk-card uk-card-default uk-card-body uk-width-1-2@l uk-align-center">
                <form id="signInForm" className="uk-from-stacked" onSubmit={this.submitSignIn}>
                    <div className="uk-child-width-1-1">
                        <div className="uk-inline">
                            <span className="uk-form-icon" uk-icon="icon: user"></span>
                            <input id="userid" className={`uk-input ${this.state.validuserid ? "" : "uk-form-danger"}`}
                                name="userid" onChange={this.handleChange} value={this.state.userid} placeholder="Email" />
                        </div>
                    </div>
                    <div className="uk-margin uk-child-width-1-1">
                        <div className="uk-inline uk-form-password">
                            <span className="uk-form-icon" uk-icon="icon: lock"></span>
                            <input id="password" className={`uk-input ${this.state.validpassword ? "" : "uk-form-danger"}`}
                                type="password" onFocus={this.handleOnFocus} onChange={this.handleChange}
                                name="password" value={this.state.password} placeholder="Password" />
                        </div>
                    </div>
                    <div className="uk-margin-small uk-child-width-1-1">
                        <button className="uk-button uk-button-primary uk-text-large">Sign In</button>
                    </div>
                </form>
                <div className="uk-margin-small uk-child-width-1-1 uk-text-right">
                    <a className="uk-text-small" href="#forgotPassword" uk-toggle=""
                        onClick={this.clearForm}>
                        Forgot password?
                    </a>
                </div>
                <div className="uk-margin-small uk-child-width-1-3 uk-text-right">
                    <span>Not a member?</span>
                    <a className="uk-text-bold uk-margin-small-left" style={{ verticalAlign: "baseline" }} href="#signUp" uk-toggle=""
                        onClick={this.clearForm}>
                        Enroll now
                    </a>
                </div>
                <div className="uk-margin-small-bottom uk-card-footer">
                    <small>CS157A-01 - TEAM 6</small>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    authenticated: state.background.authenticated
})

const mapDispatchToProps = dispatch => ({
    signin: (email, password) => dispatch({ type: "SIGN_IN", payload: { email, password } })
})

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)