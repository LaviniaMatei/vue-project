<template>
<div>
<router-view></router-view>
</div>
  
</template>

<script>
import homeInput from './components/homeInput.vue'
import addComment from './components/addComment.vue'
import showComments from './components/showComments.vue'

export default {
  components:{
    'home-input': homeInput,
    'add-comment': addComment,
    'show-comments': showComments

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
