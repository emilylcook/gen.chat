import React, {Component} from 'react'
import ErrorMessage from './ErrorMessage'
import LoadingButton from './LoadingButton'
import {connect} from 'react-redux'

import {changeForm} from '../../actions'

class AddEventForm extends Component {
  constructor (props) {
    super(props)

    this.state = {type: 'memory'} // default type

    this._onSubmit = this._onSubmit.bind(this)
    this._changeTitle = this._changeTitle.bind(this)
    this._changeDate = this._changeDate.bind(this)
    this._changeImage = this._changeImage.bind(this)
    this._changeDescription = this._changeDescription.bind(this)
    this._changeType = this._changeType.bind(this)
  }
  render () {
    const {addEventError} = this.props

    return (
      <form className='form' onSubmit={this._onSubmit}>
        {addEventError ? <ErrorMessage error={addEventError} /> : null}
        <div className='form__field-wrapper'>
          <input
            className='form__field-input'
            type='text'
            required='true'
            id='username'
            value={this.props.data.title}
            placeholder='A Thursday Afternoon'
            onChange={this._changeTitle}
            autoCorrect='off'
            autoCapitalize='off'
            spellCheck='false' />
          <label className='form__field-label' htmlFor='title'>
            Title*
          </label>
        </div>
        <div className='form__field-wrapper'>
          <select
            className='form__field-input'
            type='text'
            required='true'
            id='username'
            value={this.props.data.type}
            onChange={this._changeType}
            defaultValue='memory'
           >
            <option value='memory'>Memory</option>
            <option value='celebrate'>Celebration</option>
            <option value='add'>New Member</option>
            <option value='removal'>BOYBYE</option>
          </select>
          <label className='form__field-label' htmlFor='title'>
            Type*
          </label>
        </div>
        <div className='form__field-wrapper'>
          <input
            className='form__field-input'
            id='date'
            type='date'
            required='true'
            value={this.props.data.date}
            placeholder='mm/dd/yyyy'
            onChange={this._changeDate} />
          <label className='form__field-label' htmlFor='date'>
            Date*
          </label>
        </div>
        <div className='form__field-wrapper'>
          <input
            className='form__field-input'
            id='upload'
            ref='upload'
            type='file'
            accept='image/*'
            onChange={this._changeImage}
            onClick={(event) => {
              event.target.value = null
            }}
          />
          <label className='form__field-label' htmlFor='date'>
            Image File
          </label>
        </div>
        <div className='form__field-wrapper'>
          <input
            className='form__field-input'
            id='description'
            type='text'
            value={this.props.data.description}
            placeholder='After a few too many mimosas....'  // todo: (fun) maybe make this randomized between a few
            onChange={this._changeDescription} />
          <label className='form__field-label' htmlFor='date'>
            Description
          </label>
        </div>
        <div className='form__submit-btn-wrapper'>
          {this.props.currentlySending ? (
            <LoadingButton />
          ) : (
            <button className='form__submit-btn' type='submit'>
              {this.props.btnText}
            </button>
             )}
        </div>
      </form>
    )
  }

  _changeTitle (event) {
    this.setState({title: event.target.value})
  }

  _changeDate (event) {
    this.setState({date: event.target.value})
  }

  _changeImage (event) {
    event.preventDefault()
  }

  _changeType (event) {
    this.setState({type: event.target.value})
  }

  _changeDescription (event) {
    this.setState({description: event.target.value})
  }

  // todo : image

  _emitChange (newFormState) {
    this.props.dispatch(changeForm(newFormState))
  }

  _onSubmit (event) {
    event.preventDefault()
    this.props.onSubmit(this.state)
  }
}

AddEventForm.propTypes = {
  dispatch: React.PropTypes.func,
  data: React.PropTypes.object,
  onSubmit: React.PropTypes.func,
  changeForm: React.PropTypes.func,
  btnText: React.PropTypes.string,
  addEventError: React.PropTypes.string,
  currentlySending: React.PropTypes.bool
}

// Which props do we want to inject, given the global state?
function select (state) {
  return {
    data: state
  }
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(AddEventForm)
