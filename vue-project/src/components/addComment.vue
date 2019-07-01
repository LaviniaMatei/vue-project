<template>
    <div id="add-comment">
     <h2>Add a new post</h2>
         
    
<div>
  <article v-for="(comment, idx) in comments" :key="idx">
   <h1>{{ comment.title }}</h1>
   <p>{{ comment.body }}</p>
  </article>
</div>

<form >
    <input v-model="title" placeholder="title">
    <input v-model="body" placeholder="body">
    <button @click="addComment(title, body)" type="button">Add your comment</button>
</form>

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


</style>
