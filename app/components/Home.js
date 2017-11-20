import React, {Component} from 'react'
import {connect} from 'react-redux'

class Home extends Component {
  render () {
    return (
      <article>
        <div>
          <section className='text-section'>
            <h1>Welcome to Eavus Playground</h1>
            <p>do everything for the nachos </p>
          </section>

          { /*    }  <section className='text-section'>
            <h2>Authentication</h2>
            <p>Authentication happens in <code>app/auth/index.js</code>, using <code>fakeRequest.js</code> and <code>fakeServer.js</code>. <code>fakeRequest</code> is a fake <code>XMLHttpRequest</code> wrapper. <code>fakeServer</code> responds to the fake HTTP requests and pretends to be a real server, storing the current users in local storage with the passwords encrypted using <code>bcrypt</code>.</p>
          </section>  */ }
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
