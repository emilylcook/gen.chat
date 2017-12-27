import React, {Component} from 'react'
import {connect} from 'react-redux'
import LoginForm from './common/LoginForm'

import {loginRequest} from '../actions'

class Login extends Component {
  constructor (props) {
    super(props)

    this._login = this._login.bind(this)
  }

  render () {
    const {dispatch} = this.props
    const {formState, currentlySending, error} = this.props.data

    return (
      <div className='site-wrapper'>
        <div className='site-wrapper-inner'>
          <div id='login-page' className='container site-container noscroll'>
            <div className='form-container'>
              <div className=''>
                <h2 className='form-page__form-heading'>Login</h2>
              </div>
              <LoginForm data={formState} dispatch={dispatch} history={this.props.history} onSubmit={this._login} btnText={'Login'} error={error} currentlySending={currentlySending} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  _login (username, password) {
    this.props.dispatch(loginRequest({username, password}))
  }
}

Login.propTypes = {
  data: React.PropTypes.object,
  history: React.PropTypes.object,
  dispatch: React.PropTypes.func
}

// Which props do we want to inject, given the global state?
function select (state) {
  return {
    data: state
  }
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(Login)
