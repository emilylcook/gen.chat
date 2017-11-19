// Message.js
import React, {Component} from 'react';

class TimelineEvent extends Component {

  render(){
    console.log('item')
    console.log(this.props)

    return (
      <div>
        {this.props.title}
        {this.props.type}
        {this.props.date}
        {this.props.image}
        {this.props.description}
      </div>
    )
  }
}
export default TimelineEvent
