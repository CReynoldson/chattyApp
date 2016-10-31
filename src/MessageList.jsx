
import React, {Component} from 'react';

 export default class MessageList extends React.Component{
  render(){
    console.log("Rendering <MessageList/>");
    return (
      <div id="message-list">
        <div className="message">
          <span className="username">Anonymous1</span>
          <span className="content">I won't be impressed with technology until I can download food.</span>
        </div>
      </div>
    )
  }
 }
