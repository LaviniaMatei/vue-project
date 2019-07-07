<template>
<div class="navBar" >
   <template>
  <nav class="nav-wrapper light blue">
    <div class = "brand-logo left rounded mx-auto img-fluid"><img class="rounded mx-auto img-fluid" alt="" src="../assets/icon.png"></div>
        <ul class ="right ">
    <li v-if="isLoggedIn"><span class="email black-text">{{currentUser}}</span></li>
    <li v-if="isLoggedIn"><router-link to="/">Dashboard</router-link></li>
     <li v-if="!isLoggedIn"><router-link to="/login">Login</router-link></li>
    <li v-if="!isLoggedIn"><router-link to="/signup">Register</router-link></li>
    <li v-if="isLoggedIn"><router-link to="/profile">Profile</router-link> </li>
    <li v-if="isLoggedIn"><button v-on:click="logout" class="btn">Logout</button></li>
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
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            this.isLoggedIn = true;
            this.currentUser = user.email;
        } else {
            this.isLoggedIn = false;
            this.currentUser = null;
        }
    });
  },
  methods: {
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace('/');
        });
    }
  }
};
</script>

<style>
.brand-logo{
  width:50px;
  margin-left: 30px;
  margin-bottom: 5px;
}

.brand-logo img {
  width:80%;
  margin-left: 30px;
}

.right{
    padding-right:10px;
}
.btn{
    color:darkgreen;
    
}

.nav-wrapper{
    padding-left: 10px;
}



 
</style>