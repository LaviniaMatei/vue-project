<template>
  <div class="sign-up">
      <div class="wrapper">
   <div class ="form-signin">
      <img class="rounded mx-auto d-block img-fluid max-width: 100% height: auto" src="../assets/icon.png">
    <h3>Let's create a new account !</h3>
    <input class ="form-control" type="text" v-model="email" placeholder="Email"><br>
    <input class ="form-control" type="password" v-model="password" placeholder="Password"><br>
    <div class="row justify-content-center">
    <button @click="signUp" class="logbtn btn btn-primary btn-block">Sign Up</button>
  </div>
  <p>or go back to <router-link to="/login">login</router-link>.</p>
  </div>
  </div>
  </div>
</template>

 <script>
  import firebase from 'firebase';
  export default {
    name: 'signUp',
    data() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      signUp: function() {
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
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

 <style scoped>
  .signup{
  
  margin: 0 auto;
  place-items: center;
  padding: 1rem;
  color:#DB7093;
}

img{
    width:50%;
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
   color: #DB7093;
  
  
}


</style>