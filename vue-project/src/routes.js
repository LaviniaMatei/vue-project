import addComment from'./components/addComment.vue'
import showPosts from'./components/showPosts.vue'
import login from'./components/login.vue'
import signup from'./components/signup.vue'



export default[
    {
        path: '/', 
        component: showPosts, 
        meta: {
            requiresAuth: true
        }
    },
    {
        path:'/login', 
        component: login
    },
    {
        path:'/signup', 
        component: signup
    },
    {   
        path:'/post/:id',
        component:addComment, 
        meta: {
            requiresAuth: true
        }
    }
];