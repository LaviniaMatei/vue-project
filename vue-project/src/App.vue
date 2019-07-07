<template>
<div id="app">
 <navbar />

<router-view></router-view>

</div>
  
</template>

<script>
import addComment from'./components/addComment.vue'
import showPosts from'./components/showPosts.vue'
import login from'./components/login.vue'
import signup from'./components/signup.vue'
import profile from'./components/profile.vue'
import navbar from'./components/navbar.vue'



export default {
  components:{
    'log-in': login,
    'add-comment': addComment,
     'sign-up': signup, 
    'show-posts': showPosts,
    'navbar': navbar, 
    'profile-user': profile

  },

  data(){
    return{

    }
  },

  methods:{

  }
  
}
</script>

<style>

</style>
