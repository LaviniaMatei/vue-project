<template>
  <div class="sign-up" >
      <div class="wrapper">
   <div class ="form-signin">
     <div class = "img-icon"> <img class="rounded mx-auto img-fluid max-width: 100% height: auto" src="../assets/icon.png"></div>
    <h1>Let's create a new account !</h1>
    <input class ="form-control" type="text" v-model="name" placeholder="name"><br>
    <input class ="form-control" type="text" v-model="email" placeholder="Email"><br>
    <input class ="form-control" type="password" v-model="password" placeholder="Password"><br>
    <button @click="signUp" class="btn btn-primary">SIGN UP</button>
    <p>or go back to <router-link to="/login">LOG IN</router-link></p>
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
        name: '',
        email: '',
        password: ''
      }
    },
    methods: {
      signUp: function() {
        const db = firebase.firestore();
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
          (user) => { 
              console.log(user.user.uid);
                return db.collection("profiles").add({
                    authId: user.user.uid,
                    name: this.name,
                    email: this.email
                })
                .then(() => {
                    console.log("Document successfully written!");
                    this.$router.replace('/');
                })
                .catch(function(error) {
                    console.error("Error writing document: ", error);
                });
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
  .signup {
  
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