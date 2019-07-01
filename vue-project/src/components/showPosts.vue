<template>
    <div id="show-comments">
  <div class="card" style="width: 18rem;">
  <div class="card-body">
    <img class="rounded mx-auto d-block img-fluid max-width: 100% height: auto" src="../assets/icon.png">
    <h6 class="card-subtitle mb-2 text-muted">Home</h6>
    <p class="card-text">Your personal Grupomania frontpage. Come here to be part of our growing community.</p>
     <router-link to="/addComment"><button type="button" class="btn btn-primary btn-block">Create Post</button></router-link>
   </div>
  </div>

    <h3>All blog comments</h3>
</div>
       
    
</template>

 <script>
  import firebase from 'firebase';
  export default {
   
    data() {
      return { 
          
       
      }
    },
    
        
    }
    methods: {
       
  }
</script>
<style>
.card {
        margin: 0 auto;
        float: none;
        margin-bottom: 10px;
        margin-top: 30px;
}

img{
    width: 50%;
}

</style>