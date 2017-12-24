import React, {Component} from 'react'
import {connect} from 'react-redux'

class Home extends Component {
  render () {
    return (
      <article>
        <div className='inner cover col-md-1' />
        <div className='inner cover col-md-6 cover-heading'>
          <h1>DO<br />EVERYTHING<br />FOR THE<br />NACHOS.</h1>
          <a href='https://www.messenger.com/t/1322155157880770' className='btn btn-lg btn-default'>FUCK YEAH</a>
        </div>
      </article>
    )
  }
}

function select (state) {
  return {
    data: state
  }
}

export default connect(select)(Home)
