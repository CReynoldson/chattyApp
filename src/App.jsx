import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx';
import MessageList from './MessageList.jsx';
import Nav from './Nav.jsx';

class App extends Component {
  constructor(props){
    super(props);
    this.socket = new WebSocket("ws://localhost:3001/");

    this.addMessage = this.addMessage.bind(this);
    this.receiveMessage = this.receiveMessage.bind(this);
    this.receiveNotification = this.receiveNotification.bind(this);
    this.addNotification = this.addNotification.bind(this);
    this.updateUserCount = this.updateUserCount.bind(this);

    this.state = {
      currentUser: {name: "Anonymous"},
      messages: [],
      userCount: 0
    };
  }

  componentDidMount() {

    this.socket.onopen = function (event) {
      console.log("Connected to Server");
    };

    this.socket.onmessage = (event) => {
      let info = JSON.parse(event.data);

      switch(info.type){
        case "incomingMessage":
          let id = info.id;
          let username = info.username;
          let content = info.content;

          this.receiveMessage(id, username, content);
          break;

        case "incomingNotification":
          let oldUsername = info.oldUsername;
          let newUsername = info.newUsername;
          id = info.id;
          // content = info.content;

          this.receiveNotification(id, oldUsername, newUsername);
          break;

        case "userCount":
          console.log(info.data);
          this.updateUserCount(info.data);
          break;
      }
    }
  };

  //send message to server
  addMessage (newMessageObj) {
    let newMessage = {
      type: "postMessage",
      username: newMessageObj.username,
      content: newMessageObj.content
    }
    let messageString = (JSON.stringify(newMessage));
    this.socket.send(messageString);
  }

  //send notification to server
  addNotification (oldUsername, newUsername) {
    let newNotification = {
      type: "postNotification",
      oldUsername: oldUsername,
      newUsername: newUsername
    };
    let notificationString = (JSON.stringify(newNotification));
    this.socket.send(notificationString);
  }

  //receive message from server
  receiveMessage (id, username, content){
    let incomingMessage = {id: id, username: username, content: content};
    let messages = this.state.messages.concat(incomingMessage);
    this.setState({messages: messages});
  }

  //receive notification from server
  receiveNotification (id, oldUsername, newUsername) {
    console.log("app id for noti:", id);
    let update = `${oldUsername} changed their name to ${newUsername}`;
    let newNoti = this.state.messages.concat({notification: update});
    this.setState({currentUser: {name: newUsername}});
    this.setState({messages: newNoti});
  }

  //receive updates on usercount from server
  updateUserCount (userCount) {
    this.setState({userCount: userCount.usersOnline});
  }

  render() {
    console.log("Rendering <App/>");
    return (
      <div>
        <div className="wrapper">
          <Nav userCount={this.state.userCount}/>
        </div>
        <MessageList messages={this.state.messages}
        />
        <Chatbar currentUser={this.state.currentUser}
                 addMessage={this.addMessage}
                 messages={this.state.messages}
                 addNotification={this.addNotification}/>
      </div>
    );
  }
}
export default App;
