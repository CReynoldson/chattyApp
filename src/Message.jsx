import React, {Component} from 'react';

 export default class Message extends React.Component{
  render(){
    console.log("Rendering <Message/>");
    return (
      <footer>
        <input id="username" type="text" placeholder="Your Name (Optional)" />
        <input id="new-message" type="text" placeholder="Type a message and hit ENTER" />
      </footer>
    )
  }
 }
