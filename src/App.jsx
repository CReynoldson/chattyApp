import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props){
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      currentUser: {name: "Bob"}, //if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          id: 1,
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          id: 2,
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    };
  }

  componentDidMount() {
  // console.log("componentDidMount <App />");
  setTimeout(() => {
    console.log("Simulating incoming message");
    // Add a new message to the list of messages in the data store
    const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    const messages = this.state.messages.concat(newMessage)
    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.
    this.setState({messages: messages})
  }, 3000);
}

handleSubmit (newMessage) {
  const messages = this.state.messages.concat(newMessage)
  console.log("Messages:" + this.state.messages);
  this.setState({messages: messages})
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
        <Chatbar currentUser={this.state.currentUser} handleSubmit={this.handleSubmit}
                 messages={this.state.messages}/>
      </div>
    );
  }
}
export default App;
