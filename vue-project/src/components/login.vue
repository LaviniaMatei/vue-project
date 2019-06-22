<template>
  <div class="login">
  <div class="wrapper">
  <div class ="form-signin">
      <img class="rounded mx-auto d-block img-fluid max-width: 100% height: auto" src="../assets/icon.png">
       <h3>Sign In</h3>
    <input class ="form-control" type="text" v-model="email" placeholder="Email"><br>
    <input class ="form-control" type="password" v-model="password" placeholder="Password"><br>
    <div class="row justify-content-center">
    <button @click="login" class="logbtn btn btn-primary btn-block">Connection</button>
    <p>You don't have an account ? You can <router-link to="/sign-up">create one</router-link></p>
  </div>
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
  place-items: center;
  padding: 1rem;
  color:#DB7093;
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
	
.logbtn{
   background-color: 	#C71585;   
   border: none;
  border-radius: 5rem;
  color: white;
  cursor: pointer;
  font: 1.5em Raleway, sans-serif;
  letter-spacing: .05em;
  margin-top: 8px;
  margin-bottom:8px;
  height:4.2rem;
  width: 15rem;
 
      
    }
p{
  padding-top: 10px;
  color: #DB7093;
}

.routlink{
    color: #DB7093;
}
h3{
  margin-bottom:16px;
  
}
img{
  width:50%;
}


</style>
