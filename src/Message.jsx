import React, {Component} from 'react';

 export default class Message extends React.Component{

  render(){
    return (
      <div>
        <div className="message">
          <div className="message system">{this.props.message.notification}</div>
          <span className="username">{this.props.message.username}</span>
          <span className="content">{this.props.message.content}</span>
        </div>
      </div>
    )
  }
 }
