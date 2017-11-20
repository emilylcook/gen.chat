import React, {Component} from 'react'
import {connect} from 'react-redux'
import AddEventForm from './common/AddEventForm'
import firebase from 'firebase'
import {browserHistory} from 'react-router'

class AddEvent extends Component {
  constructor (props) {
    super(props)

    this._AddEvent = this._AddEvent.bind(this)
  }

  render () {
    const {dispatch} = this.props
    const {formState, currentlySending, addEventError} = this.props.data

    return (
      <div className='form-page__wrapper'>
        <div className='form-page__form-wrapper'>
          <div className='form-page__form-header'>
            <h2 className='form-page__form-heading'>Add Event</h2>
          </div>
          <AddEventForm data={formState} dispatch={dispatch} history={this.props.history} onSubmit={this._AddEvent} btnText={'Submit'} addEventError={addEventError} currentlySending={currentlySending} />
        </div>
      </div>
    )
  }

  _AddEvent (form) {
    var user = firebase.auth().currentUser

    var obj = {
      Title: form.title,
      Date: form.date,
      Type: form.type,
      ImageName: 'TODO',
      Description: form.description !== undefined ? form.description : "",
      CreatedBy: user.email,
      CreatedOn: Date.now()
    }

    console.log(obj)

    let dbCon = firebase.database().ref('/events')
    dbCon.push(obj)

    // take user to timeline
    browserHistory.push('/timeline')
  }
}

AddEvent.propTypes = {
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
export default connect(select)(AddEvent)
