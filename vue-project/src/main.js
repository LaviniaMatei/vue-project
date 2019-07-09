import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Routes from './routes'
import firebase from 'firebase'


const firebaseConfig = {
  apiKey: "AIzaSyAD94EufDjA35XQhhJmlhkBmEtVBl3S_KY",
  authDomain: "vue-reddit-cf12c.firebaseapp.com",
  databaseURL: "https://vue-reddit-cf12c.firebaseio.com",
  projectId: "vue-reddit-cf12c",
  storageBucket: "vue-reddit-cf12c.appspot.com",
  messagingSenderId: "37357192746",
  appId: "1:37357192746:web:8b86a48348db52a8"
};

firebase.initializeApp(firebaseConfig);

Vue.use(VueResource);
Vue.use(VueRouter);
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const router = new VueRouter({
  routes:Routes,
  mode:'history'
});


router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) {
    next('login')
  } else {
    next()
  }
});

let app = '';
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
    el: '#app',
    render: h => h(App),
    router:router
  })
  }
})
