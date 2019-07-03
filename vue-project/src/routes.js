import addComment from'./components/addComment.vue'
import showPosts from'./components/showPosts.vue'
import login from'./components/login.vue'
import signup from'./components/signup.vue'
import profile from'./components/profile.vue'
import navbar from'./components/navbar.vue'



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
    path:'/navbar', 
    component: navbar
},
    {   
        path:'/post/:id',
        component:addComment, 
        meta: {
            requiresAuth: true
        }
    }
];