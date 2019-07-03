<template>
<div class="navBar" >
   <template>
  <nav class="nav-wrapper light blue">
    <div class = "brand-logo left"><img alt="" src="../assets/icon-left-font-monochrome-black.svg"></div>
        <ul class ="right">
    <li v-if="isLoggedIn"><span class="email black-text">{{currentUser}}</span></li>
    <li v-if="isLoggedIn"><router-link to="/">Dashboard</router-link></li>
     <li v-if="!isLoggedIn"><router-link to="/login">Login</router-link></li>
    <li v-if="!isLoggedIn"><router-link to="/signup">Register</router-link></li>
    <li><router-link to="/profile">Profile</router-link> </li>
    <li v-if="isLoggedIn"><button v-on:click="logout" class="btn white">Logout</button></li>
    </ul>   
        
     
    </nav>
  </template>
    </div>
  </template>


  
<script>
import firebase from 'firebase';
export default {
  name: 'navbar',
  data() {
    return {
      isLoggedIn: false,
      currentUser: false
    };
  },
  created() {
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true;
      this.currentUser = firebase.auth().currentUser.email;
    }
  },
  methods: {
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.go({ path: this.$router.path });
        });
    }
  }
};
</script>

<style>
img{
  width:120px;
  padding-left: 10px;
  margin-bottom: 5px;
}

.right{
    padding-right:10px;
}
 
</style>