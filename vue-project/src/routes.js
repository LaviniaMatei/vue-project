import addComment from'./components/addComment.vue'
import showPosts from'./components/showPosts.vue'
import login from'./components/login.vue'
import signup from'./components/signup.vue'
import profile from'./components/profile.vue'



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
    path:'/profile', 
    component: profile
},
{
    path:'/addComment', 
    component: addComment
},
    {   
        path:'/post/:id',
        component:addComment, 
        meta: {
            requiresAuth: true
        }
    }
];