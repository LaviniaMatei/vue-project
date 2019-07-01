<template>
  <div class="login">
  <div class="wrapper">
  <div class ="form-signin">
      <div class = "img-icon"><img class="rounded mx-auto img-fluid max-width: 100% height: auto" src="../assets/icon.png"></div>
       <h1>Sign In</h1>
    <input class ="form-control" type="text" v-model="email" placeholder="Email"><br>
    <input class ="form-control" type="password" v-model="password" placeholder="Password"><br>
    
    <button @click="login" class="btn btn-primary">SIGN IN</button>
    <p>You don't have an account ? You can <router-link to="/signup">SIGN UP</router-link></p>
  
  </div>
  </div>
  </div>
</template>




<script>
  import firebase from 'firebase';
  export default {
    name: 'login',
    data() {
      return {
        email: '',
        password: ''
      }
      
    },
    methods: {
      login: function() {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
          (user) => {

            this.$router.replace('/')
          },
          (err) => {
            alert('Oops. ' + err.message)
          }
        );
      }
    }
  }
</script>

<style scoped>  /* "scoped" attribute limit the CSS to this component only */
 .login {
  
  margin: 0 auto;
  
  padding: 1rem;
  
}

.wrapper {	
margin-top: 80px;
margin-bottom: 80px;
}

.form-signin {
  max-width: 380px;
  padding: 15px 35px 45px;
  margin: 0 auto;
  
}
	
.btn{
   
  width: 10rem;
  background-color: #0079D3;
 
      
    }
p{
  padding-top: 20px;
  font-size: 12px;
 
}

.routlink{
    color: #DB7093;
}
h1{
  margin-bottom:18px;
  margin-top:8px;
  font-size: 18px;
  
}
img{
  width:20%;
 
}

.img-icon{
margin-left: -8px;
}


</style>
