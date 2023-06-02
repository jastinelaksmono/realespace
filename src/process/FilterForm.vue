<template>
    <form ref="filterProperty">
        <fieldset><legend class="formTitle">Filter properties located in "{{ passedData[1] }}"</legend></fieldset>
        
        <div class="row filterContainer">
            <div class="col-sm-4 col-4 px-0" v-for="(tab, index) in status" :key="index">
                <Tab :tabName=tab :tabStyle=2 v-model="filter[0][1]" @click="changeTab(tab, 0)" :class="changeStatus(tab, 0)"></Tab>
            </div>
        </div>

        <div class="row">
            <div class="label">Property Type</div>
            <div class="col-sm col py-2" v-for="(tab, index) in types" :key="index">
                <IconTab @click="changeTab(tab, 1)" :class="changeStatus(tab, 1)" :name="tab" :fileName="iconFile"> </IconTab>
                <div class="squareText">{{tab}}</div>
            </div>
        </div>

        <div class="row">
            <div class="label">Price Range</div>
            <CustomSlider :times-num="500000" :name="'price'" @change-range="changeRange"></CustomSlider>
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

        <div class="row">
            <div class="label">Land Size</div>
            <CustomSlider :times-num="100" :name="'size'" @change-range="changeRange"></CustomSlider>
        </div>

        <div class="row">
            <div class="label">Sale Method</div>
            <div class="col-sm col py-2" v-for="(tab, index) in sales" :key="index">
                <IconTab @click="changeTab(tab, 7)" :class="changeStatus(tab, 7)" :name="tab" :fileName="iconFile"> </IconTab>
                <div class="squareText">{{tab}}</div>
            </div>
        </div>

        <div class="row">
            <button type="button" class="col field btn" @click="searchFiltered()">Search</button>
        </div>
       
    </form>
</template>
<script>
import db from "../firebase/index";
import {ref, set, onValue, update, off } from "firebase/database";
import Tab from "../components/Tab.vue";
import CustomSlider from "../components/CustomSlider.vue";
import IconTab from "../components/IconTab.vue";
export default {
    props:{
        passedData: Array, // structure -> [propertyStatus, searchOutput]
        
    },
    components:{
        Tab,
        CustomSlider,
        IconTab
    },
    data(){
        return{
            status: ["Buy", "Rent", "Sold"],
            types: ["All", "House", "Apartment"],
            sales: ["All", "Private Sale", "Auction"],
            labels: [
                ["Bedrooms", "bedroom"],
                ["Bathrooms", "bathroom"],
                ["Car Spaces", "carspace"],
            ],
            filter:[
                ["status",this.passedData[0]],      
                ["type","All"],
                ["price",0, 0],
                ["bedrooms",0],
                ["bathrooms",0],
                ["car_spaces",0],
                ["size",0, 0],
                ["sale_method","All"],
                ["suburb",this.passedData[1]],
            ],
            iconFile:'',
            
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
                this.iconFile = name + "_white";
                return "active";
            }else{
                this.iconFile = name + "_icon";
                return "";
            }
        },
        changeRange: function(e){
            // e[] => index, min value, max value
            this.filter[e[0]][1] = e[1];
            this.filter[e[0]][2] = e[2];
        },
        searchFiltered: function(){
            //console.log(this.filter);
            this.$emit("execute-filter", this.filter);
        }
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

.formTitle{
    margin-bottom: 4vw;
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

.field{
    font-size: 3vw;
    border-radius: 5vw;
}

.right{
  margin-left: 2vw;
}

.squareText{
    font-size: 2vw;
    font-family: NunitoSemiBold;
    color: #54575f;
    text-align: center;
}

@media (max-width: 576px){
    .formTitle{
        font-size: 5vw;
    }
    .label, .field{
        font-size: 4vw;
    }
    .row{
        border-radius: 4vw;
        padding: 1vw;
    }
    .right{
        margin-left: 4vw;
    }

    .squareText{
        font-size: 3vw;
    }
     
}
</style>