<template>

    <div class="col-lg-4 col-md-6 col-sm-6" v-for="(prop, index) in getItems" :key="index">
        <Property :details="prop" @update-favourites="updateFavourites"></Property>
    </div>

</template>
  
<script>
import { compile } from 'vue';
import db from "../firebase/index";
import {ref, set, onValue, get} from "firebase/database";
import Property from '../components/Property.vue'

export default {

    props:{
        selectedTab: String,
    },
    components:{
        Property, 
    },
    data(){
        return{
            properties: [],
            savedProperties: [],
            popupTrigger: false,
            toggledButton: '',
        }
    },
    created(){
        this.selectedTab != "Favourites" ? this.readFilteredProperties() : this.readSavedProperties();
    },
    computed:{
        getItems: function(){
            return this.properties;
        }
    },
    methods:{
        updateFavourites: function(e){
            this.readSavedProperties();
        },
        readFilteredProperties: function(){
            var propRef = ref(db, 'properties');
            onValue(propRef, (snapshot) => {
                if(snapshot.exists()){
                    this.properties = [];
                }
                snapshot.forEach(child => {
                    if(this.selectedTab == "Favourites"){
                        if(this.savedProperties.includes(child.key)){
                            this.properties.push([child.key, child.val()]);
                           
                        }
                    }else{
                        if(child.child("status").val() == this.selectedTab.toLowerCase()){
                            this.properties.push([child.key, child.val()]);
                        }
                    }
                });
            });
        },
        readSavedProperties: function(){
            this.savedProperties = [];
            var propRef = ref(db, 'seekers/' + this.currentUser.username + "/favourites");
            onValue(propRef, (snapshot) => {
                snapshot.forEach(child => {
                    this.savedProperties.push(child.key);
                });
            });
            this.readFilteredProperties();
        },
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
    border-radius: 5vw;
    background-color: white;
  }

  .tabPageContainer{
    background-color: white;
    border-radius: 2vw;
    box-shadow: 0px 2px 2px 1px rgba(0, 0, 0, 0.2);
    padding: 5vw;
  }
  

@media (max-width: 992px) {
  .topPadding{
    padding-top: 10vw;
  }
}

@media (max-width: 576px) {
  .field{
    font-size: 3vw;
  }
}
</style>
  