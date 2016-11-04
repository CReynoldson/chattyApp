const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('uuid');

// Set the port to 4000
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({
  server
});

wss.broadcast = function broadcast(data) {
  console.log("Broadcasting...");
  wss.clients.forEach(function each(client) {
    client.send(data);
  });
};

let usersOnline = 0;
// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  usersOnline += 1;
  console.log("USERS ONLINE:", usersOnline);
  let usersOnlineObj =
    {
    type: 'userCount',
    data: {usersOnline: usersOnline}
    };

  wss.broadcast(
    JSON.stringify(usersOnlineObj)
  );

  ws.on('message', function incoming(message) {
    let newEvent = JSON.parse(message);
    console.log("TYPE OF THING: ", newEvent.type);
    if (newEvent.type === "postMessage"){
      let newMessage = newEvent;
      console.log('> ' + newMessage.username + " said " + newMessage.content);

      let uniqueId = uuid.v1();
      let outgoingMessage = {type: "incomingMessage", id: uniqueId, username: newMessage.username, content: newMessage.content};
      wss.broadcast(JSON.stringify(outgoingMessage));
    } else if (newEvent.type === "postNotification"){
        console.log("got a new notification");
        let newNotification = newEvent;
        let uniqueId = uuid.v1();
        console.log(newNotification);
        console.log(`${newNotification.oldUsername} changed their name to ${newNotification.newUsername}`)
        let outgoingNotification = {
          type:"incomingNotification",
          oldUsername:newNotification.oldUsername,
          newUsername: newNotification.newUsername,
          id: uniqueId,
          content: newNotification.content
        };
        wss.broadcast(JSON.stringify(outgoingNotification));
    } else {
        console.log("something went Horribly Awry");
    }
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});

