import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login } from '../store'

class Login extends Component {

    constructor() {
        super()
        this.state = {
            name: '',
            password: '',
            error: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSave = this.handleSave.bind(this)
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSave(e) {
        e.preventDefault()
        const { login, auth } = this.props
        const { history } = this.props
        login(this.state, history)
            .then(() => {
                this.setState({ error: '' })
            })
            .catch(e => { this.setState({ error: 'Incorrect Username or Password.' }) })
    }
    render() {
        const { name, password, error } = this.state
        const { handleChange, handleSave } = this
        return (
            <div>
            <form onSubmit={handleSave}>
                <input name='name' value={name} onChange={handleChange}/>
                <input name='password' value={password} onChange={handleChange}/>
                <button type='submit'>Login</button>
            </form>
            {error}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (credentials, history) => dispatch(login(credentials, history))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
