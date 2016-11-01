import React, {Component} from 'react';

 export default class Message extends React.Component{

  render(){
    // console.log("Rendering <Message/>");
    return (
      <div>
        <div className="message">
          <span className="username">{this.props.message.username}</span>
          <span className="content">{this.props.message.content}</span>
        </div>
      </div>
    )
  }
 }
