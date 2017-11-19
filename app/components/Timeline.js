import React, {Component} from 'react'
import {connect} from 'react-redux'

class Timeline extends Component {
  constructor (props) {
    super(props)

    this._Timeline = this._Timeline.bind(this)
  }

  render () {
    const {dispatch} = this.props
    const {formState, currentlySending, error} = this.props.data

    return (
      <article>
        <section className='text-section'>
          <h1>Timeline of gen.chat</h1>
          <p>
            Welcome to the timeline
          </p>
        </section>
      </article>
    )
  }

  _Timeline (test) {
    console.log('update params here')
  // his.props.dispatch(loginRequest({username, password}))
  }
}

Timeline.propTypes = {
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
export default connect(select)(Timeline)
