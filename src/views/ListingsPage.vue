<template>
    <div class="container-fluid topPadding">
      <div class="row group mt-4 mx-5">
        <div class="col" v-for="(tab, index) in tabs" :key="index">
            <Tab :tabName=tab v-model="currentTab" @click="changeTab(tab)" :class="changeStatus(tab)"></Tab>
        </div>
      </div>

      <div class="row group">
        <div class="col">
          <div class="tabPageContainer">
            <img src="../assets/img/search.png" alt="search_pic" class="searchIcon"/>
            <input type="text" @keyup.enter="openPopup(search)" v-model="search" class="field search" placeholder="Search property by suburb"/>
          </div>
        </div>
      </div>

      <!-- Pop up box -->
     <Popup v-if="popupTrigger == true" :formName="toggledButton" @close-popup="closePopup" @update-property="updateProperty"></Popup>

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
    PropertiesList, 
    Tab,
    Popup,
  },
  data(){
    return{
      name: 'ListingsPage',
      tabs: ["Buy", "Rent", "Sold"],
      currentTab: 'Buy',
      popupTrigger: false,
      toggledButton: '',
      search: '',
      filter: [],
    }
  },
  computed:{

  },
  methods:{
    changeTab: function(name){
        this.currentTab = name;
      },
    changeStatus: function(tabName){
      if(tabName == this.currentTab){
        return "active";
      }else{
        "";
      }
    },
    openPopup: function(search){
            this.toggledButton=this.currentTab + " " + search;
            this.popupTrigger = true;
            console.log(this.popupTrigger);
        },
    closePopup: function(e){
        this.popupTrigger = e;
    },
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
  