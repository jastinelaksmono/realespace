<template>

    <!-- Display message on searched result not found-->
    <div class="row" v-if="filtered.length == 0 && passedFilter.length != 0">
        <div class="messageContainer">
            <div class="col pageTitle">"Search not found!"</div>
            <img src="../assets/img/not_found.png" alt="search_pic" class="col pic"/>
        </div>
    </div>

    <!-- Display each property filtered -->
    <div class="col-lg-4 col-md-6 col-sm-6" v-for="(prop, index) in getItems" :key="index">
        <Property :details="prop" @update-favourites="updateFavourites"></Property>
    </div>

     <!-- Vuejs Paginate -->
     <Paginate v-if="getItems.length!=0"
        :page-count="pageCount"   
        :margin-pages="1"
        :click-handler="clickCallback" 
        :prev-text=" 'Prev' "       
        :next-text="'Next'" 
        :container-class="'pagination'" 
        :active-class="'active'">
    </Paginate>

</template>
  
<script>
import { compile } from 'vue';
import db from "../firebase/index";
import {ref, set, onValue, get} from "firebase/database";
import Property from '../components/Property.vue';
import Paginate from "vuejs-paginate-next";

export default {

    props:{
        selectedTab: String,            //the name of the property type passed
        passedFilter: Array,            //the data of the filter key and values inputted
    },
    components:{
        Property,                       //the property card component
        Paginate                        //imported pagination component
    },
    data(){
        return{
            properties: [],             //the list of properties unfiltered
            savedProperties: [],        //the list of saved properties by a seeker (seeker's favourites list)
            filtered: [],               //the list of filtered properties
            currentPage: 1,             //the pagination current page number
            pageCount: 0,               //pagination's number of page
            start: 0,                   //the start number of the property index
            end: 0                      //the end number of the property index to be shown in each page of pagination
        }
    },
    created(){
        this.selectedTab != "Favourites" ? this.readFilteredProperties() : this.readSavedProperties();
    },
    computed:{
        //The filtered or unfiltered properties
        getItems: function(){
            if(this.passedFilter.length == 0){
                //console.log(this.properties);
                this.getPageRange(this.properties.length);
                return this.properties.slice(this.start, this.end);
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
                this.getPageRange(this.filtered.length);
                return this.filtered.slice(this.start, this.end);
            }
        },
    },
    methods:{

        //sets the clicked page
        clickCallback: function(pageNum) {
            this.currentPage = Number(pageNum);
        },

        //Assign the start and end index number for each page in pagination
        getPageRange: function(arrayLength){
            this.pageCount = Math.ceil(arrayLength/9);
            this.end = this.currentPage * 9; 
            this.start = this.end - 9;
        },

        //call save properties on update favourit event listened
        updateFavourites: function(e){
            this.readSavedProperties();
        },

        //Retrieve and assign properties to the array from the database
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
        
        //Retrieve and assign saved properties to the array from the database
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

  .pagination{
    position: relative;
    margin-top: 2vw;
    font-family: NunitoSemiBold;
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
  