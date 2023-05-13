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
		path: '/App',
        name: "App",
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

app.config.globalProperties.currentUser = currentUser;
app.use(router).mount('#app');