// Message.js
import React, {Component} from 'react'

class TimelineEvent extends Component {
  constructor(props){
    super(props);

    this.state = {
      title: '',
      description: '',
      type: '',
      image: '',
      date: ''
    };
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
            { /* <img src='img/{this.props.image}.png' /> */ }
          </div>
        </div>
      </li>
    )
  }
}

export default TimelineEvent
