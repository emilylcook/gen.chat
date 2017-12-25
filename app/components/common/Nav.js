import React, {Component} from 'react'
import LoadingButton from './LoadingButton'
import {Link} from 'react-router'

import {logout, clearError} from '../../actions'

class Nav extends Component {
  constructor (props) {
    super(props)
    this._logout = this._logout.bind(this)
    this._clearError = this._clearError.bind(this)
  }

  render () {
    const navButtons = this.props.loggedIn ? (
      <div>
        <Link to='/addevent' className=''>Add Event</Link>
        <Link to='/timeline' className=''>Timeline</Link>
        {this.props.currentlySending ? (
          <LoadingButton className='btn--nav' />
        ) : (
          <a href='#' className='btn btn--login btn--nav' onClick={this._logout}>Logout</a>
        )}
      </div>
    ) : (
      <div>
        {  /*  <Link to='/register' className='btn btn--login btn--nav' onClick={this._clearError}>Register</Link> */ }

        <Link to='/timeline' className=''>Timeline</Link>
        <Link to='/login' className='' onClick={this._clearError}>Login</Link>
      </div>
    )

    return (
      <div className='masthead clearfix'>
         <div className='inner'>
           <Link to='/' className='nav__logo-wrapper' onClick={this._clearError}>
             <h3 className='masthead-brand'>Gen.Chat</h3>
           </Link>
           <nav className='nav masthead-nav'>
               {navButtons}
           </nav>
         </div>
     </div>
    )
  }

  _logout () {
    this.props.dispatch(logout())
  }

  _clearError () {
    this.props.dispatch(clearError())
  }
}

Nav.propTypes = {
  loggedIn: React.PropTypes.bool,
  currentlySending: React.PropTypes.bool,
  dispatch: React.PropTypes.func
}

export default Nav
