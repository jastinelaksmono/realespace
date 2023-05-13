<template>
  <div class="container-fluid topPadding">
    <div class="row activitiesContainer">
      <div class="pageTitle">My Activities</div>

      <div class="row tabContainer">
        <div class="col" v-for="(tab, index) in tabs" :key="index">
          <Tab :tabName=tab v-model="currentTab" @click="changeTab(tab)" :class="changeStatus(tab, currentTab)?'active':''"></Tab>
        </div>
      </div>

      <div class="row">
          <div class="col tabPageContainer">
            <ListForm :title="'properties'" v-if="currentTab == 'Properties'"></ListForm>
          </div>
      </div>

    </div>
    <!--
      <h1>My Activities</h1>
        <h3>{{ currentUser.userType }}</h3>
        <h3>{{ currentUser.username }}</h3>
        <h3>{{ currentUser.fullname }}</h3>
        
        <label for="status">Status: </label>
		    <input type="text" id="status" v-model="status">
        <button v-on:click="addStatus()">Post</button>
        
        <div v-for="(s, index) in statuses" v-bind:key="s">
            {{s}}
            <button v-on:click="delStatus(index)">Del</button>
        </div>
    -->
    
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
        tabs: ["Inspections", "Properties"],
        currentTab: 'Inspections',
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
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
.activitiesContainer{
  margin: 2vw;
}

.tabContainer{
  padding-left: 5vw;
  padding-right: 5vw;
}

.tabPageContainer{
  background-color: white;
  border-radius: 2vw;
  box-shadow: 0px 2px 2px 1px rgba(0, 0, 0, 0.2);
  padding: 5vw;
}

@media (max-width: 1024px) {
  .pageTitle{
    margin-top: 4vw;
  }
}
</style>
  