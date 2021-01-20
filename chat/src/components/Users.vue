<template>
    <div>
        <ul id="user-list">
            <span>Список пользователей:</span>
            <br>
            <br>
            <li v-for="(userName, index) in getUsers" v-bind:key="index">
               <div class="user-item">
                <div v-if="getUserPhoto(userName.userCount) == undefined">
                     <img class="user-list-ava" src="userpic.png">
                </div>
                <div v-else="">
                    <img class="user-list-ava" :src="getUserPhoto(userName.userCount).thumbnailUrl">
                </div>
                
                <span>{{ userName.name }} </span>
               </div> 
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        
        computed: {
            getUsers() {
                return this.$store.getters.getUsers;
            },
            getMyName() {
                return this.$store.getters.getMyName;
            },
            getUserCount() {
                return this.$store.getters.getUserCount;
            },
            getUserPhoto () {
                return this.$store.getters.getUserPhoto;
            }
        }              
    }
</script>

<style  scoped>
    .user-item{
        display: flex;  
    }
    .user-list-ava { 
        height: 20px;
        width: 20px;
        border-radius: 50px;
        margin-right: 5px;
    }
</style>