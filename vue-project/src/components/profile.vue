<template>
  <div class="profile mt-5 mb-5">
       <div class="row d-flex justify-content-center">
     <div class="card col-md-6" style="max-width: 18rem;">
            <div class="card-body">
                 <div class="img-prof"> <img class="rounded mx-auto img-fluid" src="../assets/icon.png"></div>
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
                              <input type="skills" class="form-control" v-model="profile.skills" title="enter your skills.">
                          </div>
                      </div>
                       <div class="form-group">
                           <div class="col-xs-12">
                                <br>
                              	<button @click="updateProfile" class="waves-effect waves-light btn light blue" type="submit"><i class="glyphicon glyphicon-ok-sign"></i> Save</button>
                               	
                            </div>
                      </div>
                      <p>Not happy with us?</p>
                      <button @click="deleteUser" class="waves-effect waves-light btn light blue">Delete your account</button>
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
          }
       
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
        updateProfile(){
            firebase.firestore().doc('profiles/' + this.profile.uid).update({
                name : this.profile.name,
                job: this.profile.job,
                skills: this.profile.skills
            });
            alert("Your profile has been saved successfully!");
        },

      deleteUser: function() {
        const user = firebase.auth().currentUser;

  Promise.all(user.delete(), firebase.firestore().doc('profiles/' + this.profile.uid).delete()).then(function() {
      alert('user deleted');
    // User deleted.
     
  }).catch(function(error) {
    // An error happened.
    console.log("User NOT deleted")
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


</style>