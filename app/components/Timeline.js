import React, {Component} from 'react'
import {connect} from 'react-redux'
import firebase from 'firebase'
import TimelineEvent from './common/TimelineEvent'
import _ from 'lodash'

class Timeline extends Component {
  constructor (props) {
    super(props)
    console.log('constructor')
    console.log(this.state)
    this.state = {
      events: []
    }

  }

  componentWillMount(){

  }

  componentDidMount(){
      // everytime data changes at (database/messages) provide this callback function that returns a new set of data
      let app = firebase.database().ref('events')
      app.on('value', snapshot => {
        this.getData(snapshot.val())
      })
  }

  getData (values) {
    let eventValues = values
    let events = _(eventValues)
                      .keys()
                      .map(eventKey => {
                        let cloned = _.clone(eventValues[eventKey])
                        cloned.key = eventKey
                        return cloned
                      })
                      .value()

     this.setState({
      events: events
     })
  }

  render () {
    let counter = 0
    let eventNodes = this.state.events.map((event, index) => {
      counter++
      return (
        <div>
          <TimelineEvent key={index} title={event.Title} type={event.Type} date={event.Date} image={event.ImageName} description={event.Description} counter={counter} />
        </div>
      )
    });
    return (
      <div> hi
        {eventNodes}
      </div>
    );
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
