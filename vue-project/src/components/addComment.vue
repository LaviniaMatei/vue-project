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
    <button @click="addComment(title, body)" type="button" class="btn btn-primary mt-3" >Post </button>
</form>
</div>

<div>
  <article class="form-group preview" v-for="(comment, idx) in comments" :key="idx">
   <h4>{{ comment.title }}</h4>
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
      body: '' 
    }
  },
  mounted () {
    const db = firebase.firestore();
    db.collection('comments').orderBy('createdAt').get()
        .then((querySnapshot) => {
            const comments = querySnapshot.docs.map(function(doc) {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            });
            this.comments = comments;
        })
  },
  methods: { 
    addComment (title, body) {    
        const db = firebase.firestore();
      const createdAt = new Date()
      db.collection('comments').add({ title, body, createdAt })
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

</style>
