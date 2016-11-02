import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props){
    super(props)
    this.socket = new WebSocket("ws://localhost:3001/");
    this.addMessage = this.addMessage.bind(this);
    this.state = {
      currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    };
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    console.log("SOCKET:", this.socket);
    this.socket.onopen = function (event) {
      console.log("Connected to Server");
    };
    // exampleSocket.send("Client connected");

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


  addMessage (newMessage) {
    // const messages = this.state.messages.concat(newMessage);
    // this.setState({messages: messages});
    console.log("Socket?", this.socket);
    var messageString = (JSON.stringify(newMessage));
    this.socket.send(messageString);
  }

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
