<template>
    <div class="container-fluid topPadding">

      <!-- The tabs for different property statuses -->
      <div class="row group mt-4 mx-5">
        <div class="col" v-for="(tab, index) in tabs" :key="index">
            <Tab :tabName=tab v-model="currentTab" @click="changeTab(tab)" :class="changeStatus(tab)"></Tab>
        </div>
      </div>

      <!--The search container for property suburb-->
      <div class="row group">
        <div class="col">
          <div class="tabPageContainer">
            <img src="../assets/img/search.png" alt="search_pic" class="searchIcon"/>
            <input type="text" @keyup.enter="openPopup(search)" v-model="search" class="field search" placeholder="Search property by suburb"/>
          </div>
        </div>
      </div>

      <!-- Pop up box -->
     <Popup v-if="popupTrigger == true" :formName="inputInformation" @close-popup="closePopup" @update-property="updateProperty"></Popup>

     <!-- Display list of properties according to the property status selected (the tab above)-->
      <div class="row group mt-4">
        <PropertiesList :selectedTab="currentTab" :passed-filter="filter" v-if="currentTab == 'Buy'"/>
        <PropertiesList :selectedTab="currentTab" :passed-filter="filter" v-else-if="currentTab == 'Rent'"/>
        <PropertiesList :selectedTab="currentTab" :passed-filter="filter" v-else/>
      </div>

    </div>
</template>
  
<script>
import { compile } from 'vue';
import Tab from '../components/Tab.vue'
import PropertiesList from '../process/PropertiesList.vue'
import Popup from '../components/Popup.vue'

export default {
  components:{
    PropertiesList,               //The list of properties
    Tab,                          //the tabs for property's statuses
    Popup,                        //the pop up panel to display filter form
  },
  data(){
    return{
      name: 'ListingsPage',                 //the name of the page
      tabs: ["Buy", "Rent", "Sold"],        //the property statuses
      currentTab: 'Buy',                    //current selected tab name
      popupTrigger: false,                  //Pop up trigger button
      inputInformation: '',                 //the content to be passed to popup
      search: '',                           //the value (property suburb) of the search container to be filtered
      filter: [],                           //the filter value
    }
  },
  methods:{
    //assign current tab name
    changeTab: function(name){
      this.currentTab = name;
    },

    //change the status of the selected tab
    changeStatus: function(tabName){
      if(tabName == this.currentTab){
        return "active";
      }else{
        "";
      }
    },

    //Display or open the pop up panel
    openPopup: function(search){
        this.inputInformation=this.currentTab + " " + search;
        this.popupTrigger = true;
        console.log(this.popupTrigger);
    },

    //Hide or close the popup panel
    closePopup: function(e){
        this.popupTrigger = e;
    },

    //assign filter from the passed event (update-property)
    updateProperty: function(e){
      //console.log(e);
      this.currentTab = e[0][1];
      this.filter = e;
    }
  }
}

</script>
  
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .border{
    border: 1px black solid;
  }

  .group{
    margin: 0vw 2vw 0vw 2vw;
  }

  .field{
    width: 100%;
    font-size: 2vw;
    border-radius: 2vw;
    background-color: white;
    padding: 1vw 2vw 1vw 2vw;
    border: none;
  }

  .tabPageContainer{
    background-color: white;
    border-radius: 2vw;
    box-shadow: 0px 2px 2px 1px rgba(0, 0, 0, 0.2);
    padding: 2vw;
    display: flex;
    flex-direction: row;
  }

  .searchIcon{
    width: 3%;
    height: 3%;
    margin-left: 2vw;
    margin-top: 1.2vw;
  }
  

@media (max-width: 992px) {
  .topPadding{
    padding-top: 10vw;
  }
}

@media (max-width: 576px) {
  .field{
    font-size: 4vw;
  }

  .searchIcon{
    width: 5%;
    height: 5%;
    margin-left: 4vw;
    margin-top: 2vw;
  }
}
</style>
  