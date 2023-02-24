import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {userName: '', passWord: '', errorMsg: '', isError: false}

  onChangeUserName = event => {
    this.setState({userName: event.target.value})
  }

  onChangePassword = event => {
    this.setState({passWord: event.target.value})
  }

  submitForm = async event => {
    event.preventDefault()
    const {userName, passWord} = this.state
    const userDetails = {
      username: userName,
      password: passWord,
    }
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const jwtToken = data.jwt_token
      const {history} = this.props
      Cookies.set('jwt_token', jwtToken, {expires: 30})
      history.replace('/')
    } else {
      const message = data.error_msg
      this.setState({isError: true, errorMsg: message})
    }
  }

  render() {
    const {userName, passWord, errorMsg, isError} = this.state
    if (Cookies.get('jwt_token') !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-main-cont">
        <img
          className="login-logo"
          alt="login website logo"
          src="https://res.cloudinary.com/dvsaoe21n/image/upload/v1677226353/Group_7399_1px_kfpfbz.svg"
        />
        <div className="form-card-cont">
          <h1 className="login-form-head">Login</h1>
          <form className="login-form" onSubmit={this.submitForm}>
            <label className="username" htmlFor="usernameInput">
              USERNAME
            </label>
            <input
              className="input"
              id="usernameInput"
              type="text"
              placeholder="Username"
              value={userName}
              onChange={this.onChangeUserName}
            />
            <label className="username" htmlFor="passwordInput">
              PASSWORD
            </label>
            <input
              className="input1"
              id="passwordInput"
              type="password"
              placeholder="Password"
              value={passWord}
              onChange={this.onChangePassword}
            />
            {isError && <p className="display-error-msg">{errorMsg}</p>}
            <button className="login-button" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}
export default Login
