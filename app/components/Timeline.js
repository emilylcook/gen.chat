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

    this.handleSortClick = this.handleSortClick.bind(this)

    this.state = {
      events: []
    }
  }

  handleSortClick(e) {

    this.setState({
      events: this.state.events.reverse()
    });

    e.target.classList.toggle('glyphicon-chevron-down')
    e.target.classList.toggle('glyphicon-chevron-up')
  }

  componentWillMount () {
  }

  componentDidMount () {
    // everytime data changes at (database/messages) provide this callback function that returns a new set of data
    let eventValues
    let app = firebase.database().ref('events').orderByChild('DateTimestamp').on('value', snapshot => {

        this.eventsValues = []
        var storageRef = firebase.storage().ref()

        snapshot.forEach((eventValues) => {

        var evnt = eventValues.val()
          if (evnt.ImageName !== undefined) {
            storageRef.child('images/' + evnt.ImageName).getDownloadURL().then(url => {
              evnt.ImageUrl = url

              let updateEvents = this.state.events
              let u  = updateEvents.find(item => item.ImageName === evnt.ImageName)
              u.ImageUrl = url

              this.setState ({
               events: updateEvents
              })
          })
        }

        this.eventsValues.push(evnt)
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
        <TimelineEvent key={index} side={event.side} imageUrl={event.ImageUrl} dangerouslySetInnerHTML={event.dangerouslySetInnerHTML} descriptionLink={event.descriptionLink} title={event.Title} type={event.Type} date={event.Date} image={event.ImageName} topText={event.TopText} description={event.Description} counter={counter} />
      )
    })
    return (
      <div className='site-wrapper'>
        <div className='site-wrapper-inner timeline-inner'>
          <div className='container site-container'>
            <div className='page-header'>
                <h1 id='timeline'>History of Gen.Chat</h1>
            </div>
            <ul id='History-timeline' className='col-md-push-2 col-md-8 timeline'>
              <span id='SortTimeline' className='sort-icon glyphicon glyphicon-chevron-down' onClick={this.handleSortClick}></span>
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
