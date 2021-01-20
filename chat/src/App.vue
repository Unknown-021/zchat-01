<template>
  <div id="app">
    <users id="users"></users>
    <div id="body">
      <div class="header">
        <div v-if="getUserPhoto == undefined">
          <img class="my-avatar" src="userpic.png" alt="">
        </div>
        <div v-else>
          <img class="my-avatar" :src="getUserPhoto.thumbnailUrl" alt="">
        </div>
        <h2>{{getMyName}}</h2>
      </div>
      <chat-window></chat-window>
      <div class="message-input">
        <img :src="image" alt="" height="50px" wight="50">
        <form @submit.prevent="sendMessage">
            <input type="file" @change="handleImage" accept="image/*">
            
            <input id="message-input" v-model="newMessage">
            
            <button @click="sendMessage">Send</button>
        </form>
    </div>     
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import ChatWindow from './components/ChatWindow';
import Users from './components/Users'
import io from 'socket.io-client'



export default {
    data: function () {
      return {
        socket: io(),
        image: null,
        newMessage: null,
      }
    },
    created () {
      this.$store.dispatch('fetchPhoto');
      
      this.socket.emit('created');
      this.socket.on('setMyProps', (data) => {    
        this.SET_MY_PROPS(data);
      })
      this.socket.on('addUserList', (userList) => {    
        this.ADD_USERS(userList);
      })
      this.socket.on('chat-message', (msg) =>{
        this.ADD_MESSAGE(msg);
      })
  },
 
  methods: {
    ...mapMutations([
      'ADD_MESSAGE',
      'ADD_USERS',
      'SET_MY_PROPS',
      'SET_MY_MESSAGE_TYPE'
    ]),

    // IMG uploading and coverting
    handleImage (e) {
        const selectedImage = e.target.files[0];
        this.getBase64(selectedImage).then(data => this.image = data)
                   
              },
    getBase64 (file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    },
             

    sendMessage () {
        if(this.newMessage || this.image){
            this.user = this.$store.getters.getMyName;
            this.userId = this.$store.getters.getMyId;
            
            
            this.ADD_MESSAGE({mes:this.newMessage, name: this.user, img: this.image, id: this.userId, count: this.getMyCount});
            this.socket.emit('chat-message',{mes:this.newMessage, name: this.user, id: this.userId, img: this.image, count: this.getMyCount});
            

            this.newMessage = null;
            this.image = null;
            
        }
        
    },

  },
  computed: {
    getMyName() {
        return this.$store.getters.getMyName;
    },
    getMyCount() {
        return this.$store.getters.getMyCount;
    },
    getUserPhoto () {
        return this.$store.getters.getUserPhoto(this.getMyCount);
    },
    getUsers() {
        return this.$store.getters.getUsers;
            },
  },
  components:{
    ChatWindow,
    Users
  }

}
</script>

<style >
  li {
    list-style-type: none;
  }
  *{
    padding: 0;
    margin:0;
  }
  body{
    background-color: #212121;
  }
  
  #app{
    display: flex;
  }
  h2{
    padding-left: 20px;
    font-weight: 500;
    padding: 20px 20px 0px 20px;
  }
  #users{
    align-self: flex-start;
    padding: 20px;
    color: white;
    background-color: #424242;
    height: 103vh;
    border-right: 1px solid #545454;
    width: 260px;
  }
  #user-list li{
    height: 30px;
    padding-bottom: 20px;
  }
  #body{
    display: flex;
    flex-direction: column;
    width: 100%;
  }
    

  .header{
    width: 100%;
    background-color: #212121;
    color: #fff;
    display: flex;
  }
  .header h2{
    font-size: 18px;
  }
 .message-input{
    display: flex;
    height: 9vh;
    background-color: #212121;
  }

  .my-avatar{
    height: 80px;
    border-radius: 50px;
    padding: 10px;
  }
</style>
