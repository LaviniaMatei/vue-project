<template>
    <div id="add-comment">
 <div class="wrapper">
     <h2>Create a post</h2>
<form >
    <div class="form-group">
    <input v-model="title" placeholder="title" class="form-control input-sm">
    </div>
    <div class="form-group">
    <textarea v-model="body" placeholder="Enter your comment" class="box" ></textarea>
    </div>
    <button @click="addComment(title, body)" type="button" class="btn btn-primary mt-3 btn-post" >Post </button>
</form>
</div>

<div>
  <article class="form-group preview" @click="markCommentRead(comment)"
        v-bind:class="{ unread: !comment.currentUserHasReadTheComment }" 
        v-for="(comment, idx) in comments" :key="idx">
   <h4>{{ comment.title }} - author: {{comment.userName}}</h4>
   <p>{{ comment.body }}</p>
  </article>
</div>

    </div>

    
    
</template>

<script>
import firebase from 'firebase';

    export default {
         name: 'add-comment',
 
  data () {
    return {
      comments: [],
      title: '',      
      body: '',
      profile: null 
    }
  },
  mounted () {
    const db = firebase.firestore();

    db.collection('profiles')
                .where('authId', '==', firebase.auth().currentUser.uid).get().then((profiles) => {
                    const profile = profiles.docs[0];
                    this.profile = {
                        uid: profile.id,
                        ...profile.data()
                    };

                    console.log(this.profile);
                }).then(() => {
                  this.reloadComments();
                });
    
  },
  methods: {
    markCommentRead(comment) {
      const db = firebase.firestore();

      const userIdsReadComment = {
        ...comment.userIdsReadComment // we take the current userIdsReadComment object values
      };
      userIdsReadComment[this.profile.uid] = true; // and we add the id of the current user to show that this user has read this comment
      db.doc('comments/' + comment.id).update({
        userIdsReadComment // we update the userIdsReadComment object to put there the info, that the user has read the comment
      });
      comment.currentUserHasReadTheComment = true; // we put this field to true, just because it's more convenient to use in the vue template
    },
    reloadComments() {
      const db = firebase.firestore();

      db.collection('comments').orderBy('createdAt','desc').get()
                          .then((querySnapshot) => {
                              const comments = querySnapshot.docs.map((doc) => {
                                const commentData = doc.data();
                                const comment =  {
                                    id: doc.id,
                                    ...commentData,
                                    currentUserHasReadTheComment: commentData.userIdsReadComment && commentData.userIdsReadComment[this.profile.uid] // we check if the current user has marked the comment as 'read'. in other words, we try to get the userid == in currentUserHasReadTheComment object
                                };

                                return comment;
                              });
                              this.comments = comments;
                          });
    },
    addComment (title, body) {    
      const db = firebase.firestore();
      const createdAt = new Date();
      const userIdsReadComment = {};
      userIdsReadComment[this.profile.uid] = true; // we just mark the  comment that the current user has read it, because he/she created it

      db.collection('comments').add(
        { 
          title, 
          body, 
          createdAt,
          userIdsReadComment,
          userId: this.profile.uid,
          userName: this.profile.name
        }
      ).then(() => {
        this.title = '';
        this.body ='';
        this.reloadComments()
      })
    }
  }
}
    
</script>

<style>

.wrapper {	
margin-top: 80px;
margin-bottom: 80px;
background-color:white;
padding: 10px;
border-radius: 10px;

}

#add-comment{
   background-color: #efe8e8;
   margin: 0 auto;
   padding: 1rem;

}

h2{
font-size: 18px;
font-weight: 500;
line-height: 22px;
color: rgb(28, 28, 28);
margin-bottom:15px;
    
}


.box {
background: none repeat scroll 0 0 #fff;
border: medium none;
-webkit-border-radius: 4px 4px 0 0;
-moz-border-radius: 4px 4px 0 0;
-ms-border-radius: 4px 4px 0 0;
-o-border-radius: 4px 4px 0 0;
border-radius: 4px 4px 0 0;
color: #777777;
float: left;
font-family: Lato;
font-size: 14px;
height: 142px;
letter-spacing: 0.3px;
padding: 20px;
width: 100%;
resize:vertical;
outline:none;
border: 1px solid #F2F2F2;
}

.preview{
background-color: white;
margin-top: 30px;
margin-bottom: 30px;
padding: 10px;
border-radius: 10px;

}

.unread {
  background-color:#e1e8f0;
}
.btn-post{
  margin-left:-1px;
  color:white;
}
</style>
