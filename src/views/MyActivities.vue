<template>
  <div class="container-fluid topPadding">
    <div class="row activitiesContainer">

      <!--Displaying the page title-->
      <div class="pageTitle">My Activities</div>

      <!-- Displaying maintainable tabs of users' activities-->
      <div class="row group px-5">
        <div class="col" v-for="(tab, index) in tabs" :key="index">
          <Tab :tabName=tab v-model="currentTab" class="active" v-single-tab></Tab>
        </div>
      </div>

      <div class="row group tabPageContainer">
          <!--Display added properties list by an agent/agency-->
          <div class="col"  v-if="currentTab == 'Properties'">
            <ListForm :selectedTab="currentTab"></ListForm>
          </div>

          <!--Display the logged in seekers favourite properties list-->
          <div class="row" v-else>
            <PropertiesList :selectedTab="currentTab" :passed-filter="[]"></PropertiesList>
          </div>
      </div>
    </div>
    
  </div>
  </template>
  
  <script>
  import Tab from '../components/Tab.vue'
  import ListForm from "../process/ListForm.vue"
  import PropertiesList from '@/process/PropertiesList.vue'

  export default {
    components:{
      Tab,               //the tab component
      ListForm,          //the list of properties component
      PropertiesList     //the list of saved properties list templates (favourites)
    },
    data(){
      return{
        name: 'MyActivities',         //the title of the page
        tabs: ["Properties"],         //the tab's name
        currentTab: "",               //current tab
      }
    },
    //set up the tab configuration based on user type
    created(){
      if(this.currentUser.userType == "agents"){
        this.tabs[0] = "Properties";
      }else{
        this.tabs[0] = "Favourites";
      }
      this.currentTab = this.tabs[0];
    },
    methods:{
      //Used if more than one tabs want to be added
      changeTab: function(name){
        this.currentTab = name;
      },

      //Used if more than one tabs want to be added
      changeStatus: function(tabName, currentTab){
        return tabName == currentTab;
      }
    }
    
    
  }
  </script>
  
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


.activitiesContainer{
  padding: 2vw 4vw 2vw 4vw;
}

.tabPageContainer{
  background-color: white;
  border-radius: 2vw;
  box-shadow: 0px 2px 2px 1px rgba(0, 0, 0, 0.2);
  padding: 5vw 5vw 2vw 5vw;
}
.group{
  margin-left: 0;
}

@media (max-width: 992px) {
  .topPadding{
    padding-top: 14vw;
  }
}

</style>
  