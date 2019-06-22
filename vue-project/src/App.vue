<template>
<div>
<router-view></router-view>
</div>
  
</template>

<script>
import addComment from'./components/addComment.vue'
import showPosts from'./components/showPosts.vue'
import login from'./components/login.vue'
import signup from'./components/signup.vue'


export default {
  components:{
    'log-in': login,
    'add-comment': addComment,
     'sign-up': signup, 
    'show-posts': showPosts

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
