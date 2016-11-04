
import React, {Component} from 'react';
import Message from './Message.jsx';

 export default class MessageList extends React.Component{
  constructor(props) {
    super(props)
    this.trackNotifications = this.trackNotifications.bind(this);
    this.renderNotifications = this.renderNotifications.bind(this);
    this.notification = "";
  }

  trackNotifications () {
    console.log("Got to trackNotifications");
    if (this.props.notification !== this.notification){
      // this.setState({previousNotification: this.state.notification});
      return true;
    }
  }

  renderNotifications () {
    console.log("Got to renderNotifications");
    // console.log(this.state.notification);
    // console.log(this.state.previousNotification);
    if (this.trackNotifications()){
      return (
        <div className="message-system">
          {this.props.notification}
        </div>
      )
    }
  }

  //componentWillReceiveProps

  render(){
    console.log("Rendering <MessageList/>");
    return (
      <div id="message-list">
        {this.props.messages.map((messageInfo) => {
            return (
            <Message key={messageInfo.id} message={messageInfo}/>
            )
          })
        }
      </div>
    )
  }
 }
