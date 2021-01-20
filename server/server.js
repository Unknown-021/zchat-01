const express = require('express');
const app = express();
const cors = require('cors')
const http = require('http').createServer(app);
// const io = require('socket.io')(http, {
  
// });
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
  },
  maxHttpBufferSize: 1e8
});



let userList = [];
let imageUrl = ''
let imgBase64 = null;
let count =  0; 

app.use(cors())

app.use(express.static('dist'))


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});
app.get('/chat', (req, res) => {
  res.sendFile(__dirname + '/dist/chat.html');
});



io.on('connection', (socket) => {
  let nameGenerator = require('./nameGenerator');
  
  socket.username = nameGenerator.randomName();

  let user = {
    name: socket.username,
    userId: socket.id,
    userCount: count++,
    photoUrl: null
  };

  userList.push(user);

    console.log(userList);
    io.emit('addUserList',userList);


    console.log(socket.username);
    socket.emit('setMyProps',user);
 


  socket.on('chat-message', (data) => {
     
    socket.broadcast.emit('chat-message', (data));
    console.log('Message sent');
    // imgBase64 = null;
    
  })
 
  socket.on('disconnect' , (reason) => {
    console.log(reason);
    userList.splice(userList.indexOf(socket),1); 
    io.emit('addUserList', userList);
    console.log('Discontected');
  });

  
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
