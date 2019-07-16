<template>
  <div class="profile mt-5 mb-5">
       <div class="row d-flex justify-content-center">
     <div class="card col-md-6" style="max-width: 18rem;">
            <div class="card-body">
                 <div class="img-prof"> <img class="rounded mx-auto img-fluid" src="../assets/icon.png" alt="Grupomania Logo"></div>
                        <h3>Your profile</h3>
                       <div class="form-group">
                          
                          <div class="col-xs-6">
                              <label for="name"><p>Name</p></label>
                              <input type="text" class="form-control" v-model="profile.name">
                          </div>
                      </div>

                      <div class="form-group">
                          
                          <div class="col-xs-6">
                            <label for="job"><p>Job</p></label>
                              <input type="text" class="form-control" v-model="profile.job">
                          </div>

                      </div>
                      <div class="form-group">
                          
                          <div class="col-xs-6">
                              <label for="skills"><p>Skills</p></label>
                              <input type="text" class="form-control" id="skills" autocomplete="off" v-model="profile.skills" title="enter your skills.">
                          </div>
                      </div>
                       <div class="form-group">
                           <div class="col-xs-12">
                                <br>
                              	<button @click="updateProfile" class="btn btn-primary btn-profile" type="submit"><i class="glyphicon glyphicon-ok-sign"></i> Save</button>
                              
                            </div>
                      </div>
                      <p>Not happy with us?</p>
                      <button @click="askDeleteUser" class="btn btn-primary btn-profile">Delete your account</button>

                      <div v-if="showConfirmDelete">
                        <div class="form-group">
                            <div class="col-xs-6">
                                <input style="opacity: 0;position: absolute; width: 0;">
                                <label for="password"><p>Password</p></label>
                                <input type="password" id="password" class="form-control" v-model="password" title="Enter the Password">
                            </div>
                        </div>
                        <button @click="deleteUser" class="btn btn-danger btn-profile">Confirm</button>
                      </div>
            </div>
            </div>
        </div>
        
        
    </div>
  
</template>

<script>
  import firebase from 'firebase';
  export default {
    name: 'deleteUser',
    data() {
      return {
          user:{ 
              user: ''
              },
          profile: {
              name: null,
              job: null,
              email: null,
              uid :null,
              skills: null
          },
          password: '',
          showConfirmDelete: false
      }
    },
    mounted() {
        console.log(firebase.auth().currentUser);
       firebase.firestore().collection('profiles')
                .where('authId', '==', firebase.auth().currentUser.uid).get().then((profiles) => {
                    const profile = profiles.docs[0];
                    this.profile = {
                        uid: profile.id,
                        ...profile.data()
                    };
                    console.log(this.profile);
                });

    },
    methods: {
      askDeleteUser() {
        this.showConfirmDelete = true;
      },
      updateProfile(){
          firebase.firestore().doc('profiles/' + this.profile.uid).update({
              name : this.profile.name,
              job: this.profile.job,
              skills: this.profile.skills
          });
          alert("Your profile has been saved successfully!");
      },
      reauthenticate() {
        const user = firebase.auth().currentUser;
        const cred = firebase.auth.EmailAuthProvider.credential(
              user.email, this.password);
        return user.reauthenticateWithCredential(cred);
      },
      deleteUser: function() {
        this.reauthenticate().then(() => {
          const user = firebase.auth().currentUser;

          const db = firebase.firestore();
          Promise.all([
            user.delete(), // we delete the user from the authentication
            db.doc('profiles/' + this.profile.uid).delete(), // we delete the user from the firestore database
            db.collection('comments') //we take the comments collection
              .where('userId', '==', this.profile.uid) // we filter it by the userId
              .get() // retrieve the collection to perform update on it
              .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    var commentRef = db.collection('comments').doc(doc.id);

                    return commentRef.update({
                        userName: '[deleted]'
                    });
                });
              })// we update the userName field to be '[deleted]
          ])
          .then(() => {
              alert('user deleted');
              this.$router.replace('/login');
            // User deleted.
            
          }).catch(function(error) {
            // An error happened.
            console.log("User NOT deleted")
          });
        });
      }
    }
  }

</script>

<style scoped>
.profile {
  margin: 0 auto;
  padding: 1rem;
  
  
}

.img-prof img{
  width:20%;
  margin-left: -8px;
}

.img-prof{
 
  margin-left: -8px;
}
.btn{
    color:white;
}
h3{
    font-size: 1.50rem;
}

.btn-profile{
  margin-left: -1px;
}
</style>