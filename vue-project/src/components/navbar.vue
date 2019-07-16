<template>
<div class="navBar " >
    <container ml-5>
   <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class = "brand-logo rounded mx-auto img-fluid"><img class="rounded mx-auto img-fluid" alt="Grupomania Logo" src="../assets/icon-left-font-monochrome-black.svg"></div>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
   
  <div class="collapse navbar-collapse mr-3px" id="navbarTogglerDemo02">
       <ul class="navbar-nav navbar-dark bg-primary mr-auto mt-2 mt-lg-0 ">
      
      <li class="nav-item" v-if="isLoggedIn"><span class="nav-link">{{currentUser}}</span>
      </li>
      <li class="nav-item"
        v-if="isLoggedIn"><a class="nav-link" href="/">Dashboard</a>
      </li>
      <li class="nav-item" v-if="!isLoggedIn"><a class="nav-link" href="/login">Login</a></li>
    <li class="nav-item" v-if="!isLoggedIn"><a class="nav-link" href="/signup">Sign up</a></li>
    <li class="nav-item" v-if="isLoggedIn"><a class="nav-link" href="/profile">Profile</a> </li>
    <li class="nav-item" v-if="isLoggedIn"><button v-on:click="logout" class="btn">Logout</button></li>
     
    </ul>
    
  </div>
</nav>
  </container>
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
  width:200px;
  
  
}

.brand-logo img {
  width:80%;
  
}

.right{
    padding-right:10px;
}
.btn{
    
    margin-left: -10px;
    color:black;
    padding-top: 7px;
}

.nav-wrapper{
    padding-left: 10px;
}



 
</style>