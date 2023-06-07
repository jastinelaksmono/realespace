<template>
  <div class="container-fluid topPadding">
    <div class="row loginSignupContainer">

      <!--Display image for creating an account-->
      <div class="col-sm">
        <img src="../assets/img/create_account.png" alt="pic" class="pic" />
      </div>

      <div class="col-sm">

        <!--Display the page text-->
        <div class="row rowContainer paddingTop" style="flex-direction: column;" >
          <div class="col title">
              Join Us! 
          </div>
          <div class="col subtitle">Create a new account or login to your existing account</div> 
        </div>

        <!--Display the tab options for login or signup-->
        <div class="row rowContainer" style="padding: 0vw 3vw 0vw 3vw; margin-bottom: 0vw;">
          <div class="col" v-for="tab in tabs">
            <Tab :tabName=tab v-model="currentTab" @click="changeTab(tab)" :class="changeStatus(tab, currentTab)?'active':''"></Tab>
          </div>
        </div>

        <!-- Display the registration form-->
        <Registration :formName="currentTab" class="row rowContainer" style="margin-top: 0vw;" v-if="currentTab==tabs[0]"></Registration>
        <Registration :formName="currentTab" class="row rowContainer" style="margin-top: 0vw;" v-else-if="currentTab==tabs[1]"></Registration>
      
      </div>

    </div>
  </div>
</template>
  
<script>
  import Tab from '../components/Tab.vue';
  import Registration from '../process/Registration.vue';
  export default {
    name: 'LoginSignup',
    components:{  
      Tab,                      //the tab component for the registration form options
      Registration              //the login/signup form
    },
    data(){
      return{
        tabs: ["Login", "Signup"],      //the form names
        currentTab: 'Login',            //the current tab selected
      }
    },
    methods:{
      //assign current tab name
      changeTab: function(name){
        this.currentTab = name;
      },

      //change the status of the selected tab
      changeStatus: function(tabName, currentTab){
        return tabName == currentTab;
      }
    }
    
  }
</script>

<style scoped>

.rowContainer{
  margin: 4vw 4vw 2vw 0vw;
}

.title{
  font-size: 3vw;
  font-family: NunitoBold;
  color: #5379F6;
  text-align: center;
}
.subtitle{
  font-size: 2vw;
  font-family: NunitoBold;
  color: #54575f;;
  text-align: center;
}

.pic{
  width: 100%;
}

.rolePic{
  width: 80%;
}


@media (max-width: 992px) {
  .topPadding{
    padding-top: 14vw;
  }
  .pic{
    width: 50%;
    display: block;
    margin-top: 4vw;
    margin-left: auto;
    margin-right: auto;
  }
  .title{
    font-size: 5vw;
  }
  .subtitle{
    font-size: 4vw;
  }
  .loginSignupContainer{
    display: flex;
    flex-direction: column;
  }
  .rowContainer{
    margin-left: 4vw;
  }
}

</style>
  