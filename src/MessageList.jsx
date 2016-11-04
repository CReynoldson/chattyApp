
import React, {Component} from 'react';
import Message from './Message.jsx';

 export default class MessageList extends React.Component{
  constructor(props) {
    super(props)
    this.notification = "";
  }

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
