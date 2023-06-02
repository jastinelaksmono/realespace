<template>

    <div class="row" v-if="filtered.length == 0 && passedFilter.length != 0">
        <div class="messageContainer">
            <div class="col pageTitle">"Search not found!"</div>
            <img src="../assets/img/not_found.png" alt="search_pic" class="col pic"/>
        </div>
        <!--
            <div class="col" v-if="filtered.length != 0">{{passedFilter}}</div>
        -->
    </div>

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
        passedFilter: Array,
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
            filtered: [],
        }
    },
    created(){
        this.selectedTab != "Favourites" ? this.readFilteredProperties() : this.readSavedProperties();
    },
    computed:{
        getItems: function(){
            if(this.passedFilter.length == 0){
                console.log(this.properties);
                return this.properties;
            }else{
                this.filtered = this.properties.filter(prop => 
                    (prop[1]["type"].toLowerCase().match(this.passedFilter[1][1].toLowerCase()) || this.passedFilter[1][1].match("All")) &&
                    (prop[1]["sale_method"].toLowerCase().match(this.passedFilter[7][1].toLowerCase()) || this.passedFilter[7][1].match("All")) &&
                    prop[1]["suburb"].toLowerCase().match(this.passedFilter[8][1].toLowerCase()) &&
                    prop[1]["bedrooms"] >= this.passedFilter[3][1] && prop[1]["bathrooms"] >= this.passedFilter[4][1] && prop[1]["car_spaces"] >= this.passedFilter[5][1] &&
                    (
                        (prop[1]["price"] >= this.passedFilter[2][1] && prop[1]["price"] <= this.passedFilter[2][2]) ||
                        (prop[1]["price"] >= this.passedFilter[2][1] && this.passedFilter[2][2] == 0) ||
                        (prop[1]["price"] <= this.passedFilter[2][2] && this.passedFilter[2][1] == 0) ||
                        (this.passedFilter[2][1] == 0 && this.passedFilter[2][2] == 0) 
                    ) &&
                    (
                        (prop[1]["size"] >= this.passedFilter[6][1] && prop[1]["size"] <= this.passedFilter[6][2]) ||
                        (prop[1]["size"] >= this.passedFilter[6][1] && this.passedFilter[6][2] == 0) ||
                        (prop[1]["size"] <= this.passedFilter[6][2] && this.passedFilter[6][1] == 0) ||
                        (this.passedFilter[6][1] == 0 && this.passedFilter[6][2] == 0) 
                    )
                );
                return this.filtered;
            }
        },
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

  .messageContainer{
    padding-top: 3vw;
    text-align: center;
  }

  .pic{
    width: 80vw;
  }

  .row{
    margin: 0;
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
    .pic{
       width: 87vw;
       margin-left: -2vw;
    }
}
</style>
  