<template>
  <div class="profile">
     <div class="card bg-light ml-5" style="max-width: 18rem;">
            <div class="card-body">
                        <h2>Your profile</h2>
                       <div class="form-group">
                          
                          <div class="col-xs-6">
                              <label for="name"><p>Name</p></label>
                              <input type="text" class="form-control" v-model="profile.name" placeholder="name" title="enter your first name if any.">
                          </div>
                      </div>

                      <div class="form-group">
                          
                          <div class="col-xs-6">
                            <label for="job"><p>Job</p></label>
                              <input type="text" class="form-control" v-model="profile.job" placeholder="job" title="enter your last name if any.">
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
                              	<button @click="updateProfile" class="btn btn-lg btn-success" type="submit"><i class="glyphicon glyphicon-ok-sign"></i> Save</button>
                               	
                            </div>
                      </div>
                      <p>Not happy with us?</p>
                      <button @click="deleteUser" class="logbtn btn btn-primary btn-block">Delete your account</button>
            </div>
        </div>
        <hr>
        
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
        },

      deleteUser: function() {
        const user = firebase.auth().currentUser;

  user.delete().then(function() {
    // User deleted.
     alert('User deleted')
  }).catch(function(error) {
    // An error happened.
    console.log("User NOT deleted")
  });

      }

    }
  }
</script>
<style>
#show-blogs{
    max-width: 800px;
    margin: 0px auto;
}
.single-blog{
    padding: 20px;
    margin: 20px 0;
    box-sizing: border-box;
    background: #eee;
    
}
</style>