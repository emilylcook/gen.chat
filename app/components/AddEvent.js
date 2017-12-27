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
      <div className='site-wrapper'>
        <div className='site-wrapper-inner'>
          <div id='add-event-page' className='container site-container noscroll'>
            <div className='form-container'>
              <div className='header'>
                <h2 className='heading'>Add Event</h2>
              </div>
              <AddEventForm data={formState} dispatch={dispatch} history={this.props.history} onSubmit={this._AddEvent} btnText={'Submit'} addEventError={addEventError} currentlySending={currentlySending} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  _AddEvent (form) {
    var user = firebase.auth().currentUser

    if (form.file != null) {
      var image = form.file
      var imageName = Date.now() + image.name
      var storageRef = firebase.storage().ref()

      // Upload file
      var uploadTask = storageRef.child('images/' + imageName).put(image)

      uploadTask.on('state_changed', function (snapshot) {
      }, function (error) {
        console.log('error uploading file', error)
        // Handle unsuccessful uploads
      }, function () {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...

        var obj = {
          Title: form.title,
          Date: form.date,
          DateTimestamp: new Date(form.date).getTime(),
          Type: form.type,
          ImageName: imageName,
          Description: form.description !== undefined ? form.description : '',
          CreatedBy: user.email,
          CreatedOn: Date.now()
        }

        let dbCon = firebase.database().ref('/events')
        dbCon.push(obj)

        // take user to timeline
        browserHistory.push('/timeline')
      })
    } else {
      var obj = {
        Title: form.title,
        Date: form.date,
        Type: form.type,
        DateTimestamp: new Date(form.date).getTime(),
        Description: form.description !== undefined ? form.description : '',
        CreatedBy: user.email,
        CreatedOn: Date.now()
      }

      let dbCon = firebase.database().ref('/events')
      dbCon.push(obj)

      // take user to timeline
      browserHistory.push('/timeline')
    }
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
