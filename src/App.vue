<template>
  <div id="sidebarContainer"  v-bind:style="{marginLeft: checkMenu()}">

    <!-- Display the navbar -->
    <nav id = "sidenav">
      <router-link  to="/App" replace>
          <img src="./assets/img/dashboard_grey.png" class="dashboardIcon" alt="dashboard_icon">
          <div class = "navName">Dashboard</div>
          <div class="activeSign"></div>
      </router-link>
      <router-link  to="/ListingsPage" replace>
          <img src="./assets/img/listings_grey.png" class="listingsIcon" alt="listings_icon">
          <div class = "navName">Listings</div>
          <div class="activeSign"></div>
      </router-link>
      <router-link v-if="currentUser.username != ''" to="/MyActivities" replace>
          <img src="./assets/img/all_clients_grey.png" class="allClientsIcon" alt="all_clients_icon">
          <div class = "navName">My Activities</div>
          <div class="activeSign"></div>
      </router-link>
    </nav>
  </div>

  <div id="topnavContainer">
    <div class="row">
      <div class="col-sm menuContainer" v-on:click="openCloseMenu()"> 
        <img src="./assets/img/menu_grey.png" class="openCloseIcon" alt="close_icon">
        Menu 
      </div>
      <div class="col-sm">
        <h4 class="topnavTitle">realespace</h4>
      </div>
      <div class="col-sm menuContainer textPosition">
        <router-link  to="/LoginSignup" @click="logout()" replace>{{isLoggedIn()}}</router-link>
      </div>
    </div>
  </div>

  <div class="temp">
    <router-view></router-view>
  </div>
  
</template>

<script>

export default {
  name: 'App',
  data(){
    return{
      menu: 'closed',
    }
  },
  methods:{
    isLoggedIn: function(){
      if(this.currentUser.username == ''){
        return "Login/Signup"
      }else{
        return "Logout";
      }
    },
    logout: function(){
      if(this.currentUser.username != ''){
        this.currentUser.resetAll();
      }
    },
    openCloseMenu: function(){
      //this.$refs.sidebarContainer
      if(this.menu == 'closed'){
        this.menu = 'opened';
      }else{
        this.menu = 'closed';
      }
    },
    checkMenu: function(){
      if(this.menu == 'opened'){
        if(window.innerWidth>1024){
          return "0";
        }else{
          return "20vw"
        }
        
      }else{
        if(window.innerWidth>1024){
          return "-40vw";
        }else{
          return "-20vw";
        }
        
      }
    }
  }
}
</script>

<style>
@import "./assets/style.css";
/* || Topnav */
#topnavContainer
{
  position: fixed;
  background-color: #ffffff;
  padding: 1.3vw 2vw 1vw 2vw;
  width: 100%;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.topnavTitle{
  font-family: NunitoBold;
  font-size: 2vw;
  background: linear-gradient(0.25turn, #0035e4, #0035e4, #D0DDFF, #0035e4, #0035e4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
}

.menuContainer, .menuContainer a{
  color: #858282;
  font-size: 1.5vw;
  font-family: NunitoSemiBold;
  text-decoration: none;
}

.menuContainer:hover, .menuContainer a:hover
{
  color: #5379F6;
}

.openCloseIcon{
  width: 7%;
  margin: 0.7vw 1.5vw 1vw 0.5vw;
}

.menuContainer:hover .openCloseIcon{
  content:url("assets/img/menu_blue.png");
}

.textPosition{
  text-align: end;
  margin-right: 0.5vw;
}


/* || Sidebar */
#sidebarContainer{
  position: fixed;
  background-color: #ffffff;
  border-radius: 0vw;
  width: 20vw;
  height: 100%;
  top: 0;
  left: 0;
  overflow-x: hidden;
  transition: .5s ease;
  z-index: 1;
}

#sidenav{
  padding-top: 5vw;
}

/*The sidenav texts for each page*/
#sidenav a
{
  color: #858282;
  font-size: 1.5vw;
  text-decoration: none;
  font-family: NunitoSemiBold;
  display: flex;
  padding: 2.5vw 0px 0px 2vw;
}

.navName
{
  padding-top: 0.3vw;
}

/*Settings for the nav when in hover for each page*/
/*When the current page clicked, the nav for that page is activated*/
#sidenav a:hover
{
  color: #5379F6;
}

#sidenav a:hover .dashboardIcon, a.router-link-active .dashboardIcon, a.router-link-active .activeSign
{
  content:url("assets/img/dashboard_blue.png");
  opacity: 1;
}

#sidenav a:hover .listingsIcon, a.router-link-active .listingsIcon
{
  content:url("assets/img/listings_blue.png");
}

#sidenav a:hover .allClientsIcon, a.router-link-active .allClientsIcon
{
  content:url("assets/img/all_clients_blue.png");
}

#sidenav a.router-link-active
{
  color: #5379F6;
}


.dashboardIcon, .listingsIcon, .allClientsIcon{ 
  width: 25%;
  height: 25%;
  padding-right: 1.5vw;
}


.activeSign{
  width: 4%;
  height: 3vw;
  background-color: #5379F6;
  border-radius: 0.5vw 0vw 0vw 0.5vw;
  margin-left: auto;
  opacity: 0;
}

@media (max-width: 1024px) {
  .topnavTitle{
    font-size: 5vw;
    background: linear-gradient(0.25turn, #4b68c8, #D0DDFF, #4b68c8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .menuContainer, .menuContainer a{
    font-size: 3vw;
    padding-top: 1vw;
  }
  #sidebarContainer{
    width: 40vw;
    top: 0;
    left: -20vw;
  }
  .openCloseIcon{
    width: 12%;
  }
  #sidenav{
    padding-top: 10vw;
  }
  #sidenav a
  {
    font-size: 3vw;
    padding: 4vw 0vw 2vw 0vw;
  }
  .dashboardIcon, .listingsIcon, .allClientsIcon{ 
    width: 17%;
    height: 10%;
    margin-left: 5vw;
    margin-right: 2vw;
  }
  .activeSign{
    width: 4%;
    height: 6vw;
    border-radius: 1.5vw 0vw 0vw 1.5vw;
  }
}
</style>
