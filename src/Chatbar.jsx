 import React, {Component} from 'react';
 import App from './App.jsx';

 export default class Message extends React.Component{
  constructor(props){
    super (props)
    this.state = {value: ""}
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange (event) {
    this.setState({value:event.target.value})
  }

  handleSubmit (event) {
    let userCount = (this.props.messages.length + 1);
    console.log("UserCount", userCount);
    if (event.key == 'Enter'){
      event.preventDefault();
      let newMessage = {id: userCount, username: this.props.currentUser.name, content: this.state.value};
      this.props.handleSubmit(newMessage);
      this.setState({value: ""});
    }
  }

  render(){
    return (
      <footer>
        <input id="username" type="text" defaultValue={this.props.currentUser.name} />
        <input id="new-message" type="text" placeholder="Type a message and hit ENTER"
               value={this.state.value} onChange={this.handleChange}
               onKeyDown={this.handleSubmit}/>
      </footer>
    )
  }
 }

