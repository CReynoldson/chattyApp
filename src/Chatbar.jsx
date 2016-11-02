 import React, {Component} from 'react';
 import App from './App.jsx';

 export default class Message extends React.Component{
  constructor(props){
    super (props)
    this.state = {value: ""}
    // this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleSubmit (event) {
    this.setState({value:event.target.value})
    let userCount = (this.props.messages.length + 1);
    if (event.key === 'Enter'){
      if(this.state.value.length !== 0){
        event.preventDefault();
        let newMessage = {id: userCount, username: this.props.currentUser.name, content: this.state.value};
        this.props.addMessage(newMessage);
        event.target.value = "";
      }
    }
  }

  render(){
    return (
      <footer>
        <input id="username" type="text" defaultValue={this.props.currentUser.name} />
        <input id="new-message" type="text" placeholder="Type a message and hit ENTER"
               defaultValue={this.state.value} onChange={this.handleSubmit}
               onKeyDown={this.handleSubmit}/>
      </footer>
    )
  }
 }

