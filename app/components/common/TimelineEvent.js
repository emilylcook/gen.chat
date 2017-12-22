// Message.js
import React, {Component} from 'react'
import firebase from 'firebase'

class TimelineEvent extends Component {
  constructor(props){
    super(props);

    this.state = {
      title: '',
      description: '',
      type: '',
      imageUrl: '',
      date: ''
    }
  }

  componentDidMount() {
    var storageRef = firebase.storage().ref()
    var imageUrl = storageRef.child('images/' + this.props.image).getDownloadURL().then(url => {
      this.setState({
        imageUrl: url
      })
    })
  }

  render () {
    let c = ''
    let iconType = 'time'

    if (this.props.counter % 2 === 0) {
      c = 'timeline-inverted'
    }

    if (this.props.type === 'add') {
      iconType = 'plus'
    } else if (this.props.type === 'celebrate') {
      iconType = 'time'
    } else if (this.props.type === 'removal') {
      iconType = 'minus'
    }

    // TODO: logic to determine class for Type
    // logic to determine side

    if (this.state.imageUrl == '') {
        return (
          <div>Loading...</div>
        )
    }
    else {
      return (
        <li className={c}>
          <div className='timeline-badge success'><i className={'glyphicon glyphicon-' + iconType}></i></div>
          <div className='timeline-panel'>
            <div className='timeline-heading'>
              <h4 className='timeline-title'>{this.props.title}</h4>
              <p><small className='text-muted'><i className='glyphicon glyphicon-time'></i>&nbsp; {this.props.date}</small></p>
            </div>
            <div className='timeline-body'>
              <p>{this.props.description}</p>
              <img src={this.state.imageUrl}  />
            </div>
          </div>
        </li>
      )
    }


  }
}

export default TimelineEvent
