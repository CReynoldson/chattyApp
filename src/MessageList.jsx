
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
        {this.props.messages.map((messageInfo, index) => {
            return (
            <Message key={index} message={messageInfo}/>
            )
          })
        }
      </div>
    )
  }
 }
