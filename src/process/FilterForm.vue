<template>
    <form ref="filterProperty">
        <fieldset><legend class="formTitle">Filter properties located in "{{ passedData[1] }}"</legend></fieldset>
        <div class="row filterContainer">
            <div class="col-sm-4 col-4 px-0" v-for="(tab, index) in status" :key="index">
                <Tab :tabName=tab :tabStyle=2 v-model="filter[0][1]" @click="changeTab(tab, 0)" :class="changeStatus(tab, 0)"></Tab>
            </div>
        </div>

        <div class="row">
            <div class="label">Price Range</div>
            <Slider :slider-value="filter[2][1]"></Slider>

        </div>

        <div v-for="(label, idx) in labels" :key="idx">
            <div class="label">
            <img :src="require(`../assets/img/${label[1]}.png`)" alt="icon_pic" class="icon"/>
                {{label[0]}}
            </div>
            <div class="row filterContainer">
                <div class="col-sm-2 col-2 px-0" v-for="(tab,index) in 6" :key="index">
                    <Tab :tabName=index :tabStyle=2 v-model="filter[idx+3][1]" @click="changeTab(index, idx+3)" :class="changeStatus(index, idx+3)"></Tab>
                </div>
            </div>
        </div>
       
    </form>
</template>
<script>
import db from "../firebase/index";
import {ref, set, onValue, update } from "firebase/database";
import Tab from "../components/Tab.vue"
import Slider from "../components/Slider.vue"
export default {
    props:{
        passedData: Array, // structure -> [propertyStatus, searchOutput]
        
    },
    components:{
        Tab,
        Slider
    },
    data(){
        return{
            status: ["Buy", "Rent", "Sold"],
            labels: [
                ["Bedrooms", "bedroom"],
                ["Bathrooms", "bathroom"],
                ["Car Spaces", "carspace"],
            ],
            filter:[
                ["status",this.passedData[0]],      
                ["type",""],
                ["price",0, 0],
                ["bedroom",0],
                ["bathroom",0],
                ["car_spaces",0],
                ["size",0],
                ["sale_method",""],
            ],
            
        }
    },
    created(){

    },
    methods:{
        changeTab: function(name, index){
            this.filter[index][1] = name;
        },
        changeStatus: function(name, index){
            if(name == this.filter[index][1]){
                return "active";
            }else{
                return "";
            }
        },
    }
};
</script>

<style scoped>
.label{
    font-size: 3vw;
    font-family: NunitoSemiBold;
    color: #54575f;
    margin-bottom: 2vw;
}
.row{
    padding: 0.5vw;
    margin-bottom: 7vw;
}

.filterContainer{
    border-radius: 2vw;
    background-color: #cecece;
    padding: 0.5vw;
    margin-bottom: 7vw;
}

.icon{
  width: 7%;
  margin-bottom: 0.5vw;
}

@media (max-width: 576px){
    .formTitle, .label{
        font-size: 4vw;
    }
    .row{
        border-radius: 4vw;
        padding: 1vw;
    }
}
</style>