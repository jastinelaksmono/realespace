<template>
  <div class="container-fluid topPadding">
    <div class="row loginSignupContainer">
      <div class="col-sm">
        <img src="../assets/img/create_account.png" alt="pic" class="pic" />
      </div>
      <div class="col-sm">

        <div class="row rowContainer paddingTop" style="flex-direction: column;" >
          <div class="col title">
              Join Us! 
          </div>
          <div class="col subtitle">Create a new account or login to your existing account</div> 
        </div>

        <div class="row rowContainer" style="padding: 0vw 3vw 0vw 3vw; margin-bottom: 0vw;">
          <div class="col" v-for="(tab, index) in tabs" :key="index" >
            <Tab :tabName=tab v-model="currentTab" @click="changeTab(tab)" :class="changeStatus(tab, currentTab)?'active':''"></Tab>
          </div>
        </div>


        <LoginSignupForm :formName="currentTab" class="row rowContainer" style="margin-top: 0vw;" v-if="currentTab==tabs[0]"></LoginSignupForm>
        <LoginSignupForm :formName="currentTab" class="row rowContainer" style="margin-top: 0vw;" v-else-if="currentTab==tabs[1]"></LoginSignupForm>

      
      </div>
    </div>
  </div>

  
    <!--
      <div class="row titleContainer paddingTop" style="flex-direction: column;">
          <div class="col title">
            What role are you aiming?
          </div>
          <div class="col subtitle">Choose one of the option below</div> 
        </div>

        <div class="row">
          <div class="col-sm">
            <img src="../assets/img/agent.png" alt="pic" class="rolePic" />
          </div>
          <div class="col-sm">
            <img src="../assets/img/buyer_renter.png" alt="pic" class="rolePic" />
          </div>
        </div>
    -->
     

</template>
  
<script>
  import Tab from '../components/Tab.vue';
  import LoginSignupForm from '../process/LoginSignupForm.vue';
  export default {
    name: 'LoginSignup',
    components:{
      Tab,
      LoginSignupForm
    },
    data(){
      return{
        tabs: ["Login", "Signup"],
        currentTab: 'Login',
      }
    },
    methods:{
      changeTab: function(name){
        this.currentTab = name;
      },
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
  