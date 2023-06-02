<template>
  <div class="container-fluid topPadding">
    <div class="row activitiesContainer">
      <div class="pageTitle">My Activities</div>

      <div class="row group px-5">
        <div class="col" v-for="(tab, index) in tabs" :key="index">
          <Tab :tabName=tab v-model="currentTab" @click="changeTab(tab)" :class="changeStatus(tab, currentTab)?'active':''"></Tab>
        </div>
      </div>

      <div class="row group" >
          <div class="col tabPageContainer">
            <ListForm :selectedTab="currentTab" v-if="currentTab == tabs[0]"></ListForm>
          </div>
      </div>

    </div>
    
  </div>
  </template>
  
  <script>
  import Tab from '../components/Tab.vue'
  import ListForm from "../process/ListForm.vue"

  export default {
    components:{
      Tab,
      ListForm
    },
    data(){
      return{
        name: 'MyActivities',
        tabs: ["Properties", "Inspections"],
        currentTab: "",
      }
    },
    created(){
      if(this.currentUser.userType == "agents"){
        this.tabs[0] = "Properties";
      }else{
        this.tabs[0] = "Favourites";
      }
      this.currentTab = this.tabs[0];
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
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
.activitiesContainer{
  padding: 2vw 4vw 2vw 4vw;
}

.tabPageContainer{
  background-color: white;
  border-radius: 2vw;
  box-shadow: 0px 2px 2px 1px rgba(0, 0, 0, 0.2);
  padding: 5vw;
}

.group{
  margin-left: 0;
}

@media (max-width: 992px) {
  .pageTitle{
    margin-top: 4vw;
  }
}

</style>
  