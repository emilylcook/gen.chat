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

  componentWillMount () {
  }

  componentDidMount () {
    // everytime data changes at (database/messages) provide this callback function that returns a new set of data
    let eventValues
    let app = firebase.database().ref('events').orderByChild('DateTimestamp').on('value', snapshot => {

        this.eventsValues = []
        snapshot.forEach((eventValues) => {
            this.eventsValues.push(eventValues.val())
        })

        this.setState ({
          events: this.eventsValues
        })
    })
  }

  render () {
    let counter = 0
    let eventNodes = this.state.events.map((event, index) => {
      counter++
      return (
        <TimelineEvent key={index} side={event.side} dangerouslySetInnerHTML={event.dangerouslySetInnerHTML} descriptionLink={event.descriptionLink} title={event.Title} type={event.Type} date={event.Date} image={event.ImageName} topText={event.TopText} description={event.Description} counter={counter} />
      )
    })
    return (
      <div className='site-wrapper'>
        <div className='site-wrapper-inner timeline'>
          <div className='container site-container'>
            <div className='page-header'>
                <h1 id='timeline'>History of Gen.Chat</h1>
            </div>
            {/*<span id='SortTimeline' className='sort-icon glyphicon glyphicon-chevron-down'></span>*/}
            <ul id='History-timeline' className='col-md-push-2 col-md-8 timeline'>
              {eventNodes}
            </ul>
          </div>
        </div>
      </div>
    )
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
