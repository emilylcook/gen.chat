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

console.log(form.file)
    if (form.file != null){
      var image = form.file;
      var imageName = Date.now() + image.name

      // Create the file metadata
      var metadata = {
        contentType: 'image/jpeg'
      };

      var storageRef = firebase.storage().ref();

      // Upload file
      var uploadTask = storageRef.child('images/' + imageName).put(image)

      uploadTask.on('state_changed', function(snapshot) {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      }, function(error) {
        console.log('error uploading file', error)
        // Handle unsuccessful uploads
      }, function() {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
         // var downloadURL = uploadTask.snapshot.downloadURL;

         var obj = {
           Title: form.title,
           Date: form.date,
           Type: form.type,
           ImageName: imageName,
           Description: form.description !== undefined ? form.description : "",
           CreatedBy: user.email,
           CreatedOn: Date.now()
         }

         let dbCon = firebase.database().ref('/events')
         dbCon.push(obj)

         // take user to timeline
         browserHistory.push('/timeline')
      })
    }
    else {
      var obj = {
       Title: form.title,
       Date: form.date,
       Type: form.type,
       Description: form.description !== undefined ? form.description : "",
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
