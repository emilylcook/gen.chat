// Message.js
import React, {Component} from 'react'
import firebase from 'firebase'

class TimelineEvent extends Component {
  constructor (props) {
    super(props)

    this.state = {
      title: '',
      description: '',
      type: '',
      imageUrl: '',
      date: ''
    }
  }

  componentWillMount () {
    var storageRef = firebase.storage().ref()
    if (this.props.image != null) {
      storageRef.child('images/' + this.props.image).getDownloadURL().then(url => {
        this.setState({
          imageUrl: url
        })
      })
    }
  }

  render () {
    let c = ''
    let iconType = 'time'

    if (this.props.counter % 2 === 0) {
      c = 'timeline-inverted'

      if (this.props.side === 'same') {
        c = ''
      }
    } else if (this.props.side === 'same') {
      c = 'timeline-inverted'
    }

    if (this.props.type === 'add') {
      iconType = 'plus'
    } else if (this.props.type === 'celebrate') {
      iconType = 'send'
    } else if (this.props.type === 'removal') {
      iconType = 'minus'
    } else if (this.props.type === 'memory') {
      iconType = 'time'
    }

    let imageDiv = ''
    if (this.state.imageUrl !== '') {
      imageDiv = <img src={this.state.imageUrl} />
    }

    let descriptionDiv = ''
    if (this.props.descriptionLink !== '') {
      descriptionDiv = <div><a href={this.props.descriptionLink}>{this.props.description}</a></div>
    } else {
      descriptionDiv = <p>{this.props.description}</p>
    }

    let topText = ''
    if (this.props.topText !== '') {
      topText = <p>{this.props.topText}</p>
    }

    return (
      <li className={c}>
        <div className={'timeline-badge success ' + iconType}><i className={'glyphicon glyphicon-' + iconType} /></div>
        <div className='timeline-panel'>
          <div className='timeline-heading'>
            <h4 className='timeline-title'>{this.props.title}</h4>
            <p><small className='text-muted'><i className='glyphicon glyphicon-time' />&nbsp; {this.props.date}</small></p>
          </div>
          <div className='timeline-body'>
            {topText}
            {imageDiv}
            {descriptionDiv}
          </div>
        </div>
      </li>
    )
  }
}

export default TimelineEvent
