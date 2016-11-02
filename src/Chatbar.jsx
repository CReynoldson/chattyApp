 import React, {Component} from 'react';
 import App from './App.jsx';

 export default class Message extends React.Component{
  constructor(props){
    super (props)
    this.state = {
      user: "",
      value: ""
    }
    // this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.changeUser = this.changeUser.bind(this);

  }

  // changeUser (event) {
  //   if (event.key === 'Enter'){
  //     this.setState({user: event.target.value});
  //     console.log(this.state.user);
  //     this.props.currentUser.name = this.state.user;
  //   }
  // }

  changeUser (event) {
    this.props.currentUser.name = this.state.user;
  }

  handleChange (event) {
    this.setState({user: event.target.value});
  }

  handleSubmit (event) {
    this.setState({value:event.target.value});
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
        <input id="username" type="text" placeholder={this.props.currentUser.name}
        defaultValue={this.state.value} onChange={this.handleChange}
        onKeyDown={this.changeUser}/>


        <input id="new-message" type="text" placeholder="Type a message and hit ENTER"
               defaultValue={this.state.value} onChange={this.handleSubmit}
               onKeyDown={this.handleSubmit}/>
      </footer>
    )
  }
 }

