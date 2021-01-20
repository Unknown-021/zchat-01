<template>
    <div>
        <ul class="chat-window">
            <li v-for="(mes,index) in getMessages" v-bind:key="index" 
            v-bind:img = "mes.img" :owner="getMessages[index].id === getMyId">
            
                <div class="message-top">
                    
                    <img class="message-avatar" :src="getUserPhoto(mes.count).thumbnailUrl" alt="">
                    <span class="name">{{mes.name}}</span>
                </div>
                <hr>
                  {{ mes.mes }}
                    
                  <img class="attached-photo" v-if="mes.img" :src="mes.img" height="50px" width="50px">
                 <button class='del-button' v-if="getMessages[index].id === getMyId"  @click.prevent='REMOVE_MESSAGE(index)'>Del</button>
            </li>
        </ul>
    </div>
</template>

<script>
    import {mapMutations} from 'vuex';

    export default {
        data: function(){
            return {
                imgUrl: '',
            }
            
        },
        
        computed: {
            getMessages () {
                return this.$store.getters.getMessages;
            },
            getUsers() {
                return this.$store.getters.getUsers;
            },
            getMyMessageType () {
                return this.$store.getters.getMyMessageType;
            },
            getMyId () {
                return this.$store.getters.getMyId;
            },
            getMyCount() {
                return this.$store.getters.getMyCount;
            },
            getUserPhoto () {
                return this.$store.getters.getUserPhoto;
            },
            getMyName: state => {
                return state.myName;
            },
            
            
        },
        methods: {
        ...mapMutations([
            'REMOVE_MESSAGE'
            ]),

            
        },            
    }
</script>

<style scoped>
    .myMessage{
        background-color: blue!important ;
    }

    li[owner]{
        color: white;
        background-color: #4343f1!important ;
        align-self: flex-end;
    }
    .chat-window{
        width:100%;
        height: 82vh;
        overflow-y:scroll;
        background-color: #303030;
        display: flex;
        flex-direction: column-reverse;
    }

    .chat-window::-webkit-scrollbar{
        display: none;
    }
    
    .chat-window li{
        word-wrap: break-word;
        line-height: 25px;
        background-color: white;
        margin: 10px 40px;
        border-radius: 5px;
        width: 40%;
        display: flex;
        flex-direction: column;
        padding: 5px 10px;
    }
    .attached-photo{
        height: 110px;
        width: 110px;
    }
    .message-avatar{
        height: 40px;
        width: 40px;
        border-radius: 50px;
        padding: 10px;
    }
    .message-top{
        display: flex;
    }
    .name{
        font-size: 13px;
        font-weight: bold;
        padding-top: 17px;
  }
  .del-button{
      width: 10%;
      margin: 0 auto;
  }

  @media screen and (max-width: 826px) {
    .del-button{
        width: 30%;
        margin: 0 auto;
  }
  .message-avatar{
        height: 20px;
        width: 20px;
    }
    .name{
    padding-top: 13px;
    padding-bottom: 9px;
  }
  }
@media screen and (max-width: 415px){
    .chat-window li{
        line-height: 12px;
    }
    li[owner]{
        line-height: 12px;
    }
    .message-avatar{
        display: none;
    }
}


  
</style>