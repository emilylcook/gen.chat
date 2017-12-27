import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'

class Home extends Component {
  render () {
    return (
    <div className='site-wrapper'>
      <div className='site-wrapper-inner'>
        <article id='cover-container'>
          <div className='cover-page'>
            <div className='inner cover col-md-1' />
            <div className='inner cover col-md-6 cover-heading'>
              <h1>DO<br />EVERYTHING<br />FOR THE<br />NACHOS.</h1>
              <Link to='/timeline' className='btn btn-lg btn-default home-btn'>FUCK YEAH</Link>
            </div>
          </div>
        </article>
      </div>
    </div>
    )
  }
}

function select (state) {
  return {
    data: state
  }
}

export default connect(select)(Home)
