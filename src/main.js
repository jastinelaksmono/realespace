import { createApp, provide } from 'vue'
import App from './App.vue'
import { createRouter , createWebHistory} from "vue-router";
import HomePage from './views/HomePage.vue'
import MyActivies from './views/MyActivities.vue'
import ListingsPage from './views/ListingsPage.vue'
import LoginSignup from './views/LoginSignup.vue'
import './firebase/index.js';

const router = createRouter({
    history: createWebHistory(),
	routes: [
	{
		path: '/',
        name: "",
        component: HomePage,
	},
	{
		path: '/LoginSignup',
        name: "LoginSignup",
        component: LoginSignup,
	},
	{
		path: '/ListingsPage',
        name: "ListingsPage",
        component: ListingsPage,
	},
	{
		path: '/MyActivities',
		name:  "MyActivities",
        component: MyActivies,
	}
  ]
})



const currentUser = {
	userType: '',
	username: '',
	fullname: '',
	agency: '',
	setAll(uType, uName, fName, agencyName){
		this.userType = uType;
		this.username = uName;
		this.fullname = fName;
		this.agency = agencyName;
	},
	resetAll(){
        this.userType = '';
        this.username = '';
        this.fullname = '';
		this.agency = '';
    }

}


const app = createApp(App)
//create new vue instance  

// global object for current user logged in
app.config.globalProperties.currentUser = currentUser;

// global custom directive for show and hide password
app.directive('password', (el, binding) => {
	const inputType = el.getAttribute('type');
		el.setAttribute('type', binding.value ? 'text' : 'password');
		console.log(inputType);
})

// global custom directive for single active tab
app.directive('single-tab', (el) => {
	el.style.color = "#ffffff"
	el.style.background = "#5379F6";
})

app.use(router).mount('#app');