 import React, {Component} from 'react';
 import App from './App.jsx';

 export default class Message extends React.Component{
  constructor(props){
    super (props)
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      username: "Anonymous",
      content: ""
    }

  }

  handleChange (event) {
    let id = event.target.id;
    let value = event.target.value;

    if (id === "new-message"){
      this.setState({content: value});
    }
  }

  handleSubmit (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      let id = event.target.id;

      //Handle username update notifications
      if (id === "username" && event.target.value !== ""){
        if(this.state.username !== event.target.value){
          this.props.addNotification(this.state.username, event.target.value);
          this.setState({username: event.target.value});
        }
      }

      //Handle new messages
      if (id === "new-message"){
        this.props.addMessage(this.state);
      }
    }
  }

  render(){
    return (
      <footer>
        <input
          id="username"
          type="text"
          placeholder={this.state.username}
          defaultValue={this.state.value}
          onChange={this.handleChange}
          onKeyDown={this.handleSubmit}
        />

        <input
          id="new-message"
          type="text"
          placeholder="Type a message and hit ENTER"
          defaultValue={this.state.value}
          onChange={this.handleChange}
          onKeyDown={this.handleSubmit}
          autoFocus="true"
        />
      </footer>
    )
  }
 }

