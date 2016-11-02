import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props){
    super(props)
    this.socket = new WebSocket("ws://localhost:3001/");
    this.addMessage = this.addMessage.bind(this);
    this.receiveMessage = this.receiveMessage.bind(this);
    this.state = {
      currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    };
  }


  addMessage (newMessage) {
    let messageString = (JSON.stringify(newMessage));
    this.socket.send(messageString);
  }

  receiveMessage (id, username, content){
    let incomingMessage = {id: id, username: username, content: content};
    let messages = this.state.messages.concat(incomingMessage);
    this.setState({messages: messages});
  }

  componentDidMount() {
    console.log("componentDidMount <App />");

    this.socket.onopen = function (event) {
      console.log("Connected to Server");
    };

    this.socket.onmessage = (event) => {
      console.log(event.data);
      let message = JSON.parse(event.data);
      let id = message.id;
      let username = message.username;
      let content = message.content;

      this.receiveMessage(id, username, content);
    }

    // setTimeout(() => {
    //   console.log("Simulating incoming message");
    //   // Add a new message to the list of messages in the data store
    //   const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    //   const messages = this.state.messages.concat(newMessage)
    //   // Update the state of the app component.
    //   // Calling setState will trigger a call to render() in App and all child components.
    //   this.setState({messages: messages})
    // }, 3000);
  };

    render() {
      console.log("Rendering <App/>");
      return (
        <div>
          <div className="wrapper">
            <nav>
              <h1>Chatty</h1>
            </nav>
          </div>
          <MessageList messages={this.state.messages}/>
          <Chatbar currentUser={this.state.currentUser} addMessage={this.addMessage}
                   messages={this.state.messages} socket={this.socket}/>
        </div>
      );
    }
}
export default App;
