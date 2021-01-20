import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


export default new Vuex.Store({
    state: {
        messages: [],
        users: [],
        myName: null,
        myId: null,
        myCount: null,
        photos: [],
    },
    getters: {
        getMessages: state => {
            return state.messages;
        },
        getUsers: state => {
            return state.users;
        },
        getMyName: state => {
            return state.myName;
        },
        getMyId: state => {
            return state.myId;
        },
        getMyCount: state => {
            return state.myCount;
        },
        getUserCount: state => () => {
            return state.users.filter(user => user.userCount.count)
            
            
        },
        getUserPhoto: state => (id) => {
            return state.photos[id]
        },
        getMyMessageType: state => {
            return state.myMessageType;
        }
    },
    mutations: {
        ADD_MESSAGE(state, msg) {
            state.messages.unshift(msg);
        },
        ADD_USERS(state, payload) {
            state.users = payload;
        },
        SET_MY_PROPS(state, payload) {
            state.myName = payload.name;
            state.myId = payload.userId;
            state.myCount = payload.userCount;
        },
        SET_PHOTOS(state, payload) {
            state.photos = payload;
        },
        
        REMOVE_MESSAGE(state, payload){
            state.messages.splice(payload, 1)
        }

    },

    actions: {
        fetchPhoto({commit}) {
            const url = "https://jsonplaceholder.typicode.com/photos/"
            fetch(url)
                .then(response => response.json())
                .then(response => commit('SET_PHOTOS', response))
                
        }
    }

    
});