<template>   

    <div class="row">
        <button type="button" class="col-sm-3 field btn" @click="popupTrigger = true">+ add new property</button>
    </div>

    <Popup v-if="popupTrigger == true" :formName="'addProperty'" @close-popup="closeAddForm"></Popup>

    <div class="row">
        <div class="col-sm-4 tableTitle">{{tabTitle}}</div>
        <div class="col">
            <FilterOption :filter="'me'" :tab-selected="title" @update-list="updateList"></FilterOption>
        </div>
    </div>

    <div class="tableContainer">
        <div class="row">
            <div :class="adjustHeaderSize(index)" v-for="(header, index) in headers" :key="index">
                {{ header.substring(0,1).toUpperCase() + header.substring(1,header.length) }} <div v-if="index ==2">&nbsp; (m<sup>2</sup>)</div>
            </div>
        </div>
        <div class='row dataRow' v-for="(property, index) in getItems" :key="index">
            <div :class="adjustColSize(index)" v-for="(prop, index) in property" :key="index">{{prop}}</div>
            <div class="col editBtnContainer">
                <button class='editButton' id='edit'>
                    <img src='../assets/img/edit_client_icon.png' id='editBtnIcon' alt='edit_client_btn'>
                </button>
            </div>
        </div>

        
        <!-- Vuejs Paginate -->
        <div class="row">
            <Paginate 
                :page-count="pageCount"    
                :page-range="5" 
                :margin-pages="1"
                :click-handler="clickCallback" 
                :prev-text=" 'Prev' " 		
                :next-text="'Next'" 
                :container-class="'pagination'" 
                :active-class="'currentPage'">
            </Paginate>
        </div>
    
    </div>

</template>
  
<script>
import db from "../firebase/index";
import Paginate from "../components/Paginate.js";
import { ref, set, onValue, update } from "firebase/database";
import FilterOption from '@/components/FilterOption.vue';
import Popup from "../components/Popup.vue";
export default {
    props: {
        title: String,
    },
    components:{
        FilterOption,
        Paginate, 
        Popup
    },
    data(){
        return{
            tabTitle: 'Properties listed by',
            popupTrigger: false,
            headers: ["type", "address", "size", "suburb", "agent",""],
            nodes: [],
            pageCount: 0,
            currentPage: 1,
            agentName: ''
        }
    },
    computed: {
        getItems: function() {
            this.pageCount = Math.ceil(this.nodes.length/5);
			let current = this.currentPage * 5; 
			let start = current - 5;
			return this.nodes.slice(start, current);
		}
    },
    methods:{
        adjustHeaderSize: function(index){
            if(index == this.headers.length-1){
                return 'col blank';
            }else if(index == 1){
                return 'col header headerLong';
            }else{
                return 'col header';
            }
        },
        adjustColSize: function(index){
            if(index == 1){
                return 'col dataCol headerLong';
            }else{
                return 'col dataCol';
            }
        },
        closeAddForm: function(e){
            this.popupTrigger = e;
        },
        updateList: function(e){
            this.nodes = [];
            var listRef = ref(db, this.title);
            onValue(listRef, (snapshot) => {
                var attr = e=="me"? 'agent' : 'agency';
                var value = e=="me"? this.currentUser.username : this.currentUser.agency;
                var node = [];
                snapshot.forEach(child => {
                    if(child.child(attr).val() == value){
                        for(let i=0; i<this.headers.length-1; i++){
                            var result = child.child(this.headers[i]).val();
                            if(i==this.headers.length-2){
                                this.getAgentName(result);
                                node.push(this.agentName);
                                this.nodes.push(node);
                                node = [];
                            }else{
                                node.push(result);
                            }
                        }
                    }
                });
            });
        },
        getAgentName: function(agent){
            var listRef = ref(db, 'agents/' + agent);
            onValue(listRef, (snapshot) => {
                this.agentName = snapshot.val().fname;
            });
        },
        //sets the clicked page
		clickCallback: function(pageNum) {
			this.currentPage = Number(pageNum);
		}
    }
};
</script>
  
<style scoped>
@import "vue-awesome-paginate/dist/style.css";
.tableTitle{
    font-family: NunitoSemiBold;
    font-size: 3vw;
    color: #5379F6;
    width: 35%;
}

.tableContainer{
    border: 0;
    border-collapse: collapse;
    outline: none;
    border-radius: 2vw;
    margin-top: 2vw;
}

/* || Button */
.btn{
    margin-left: auto;
    margin-bottom: 2vw;
}
.btn:hover{
    color: #5379F6;
    border: 0.2vw #5379F6 solid;
}


/* || Header */
.header{
    font-family: NunitoSemiBold;
    font-size: 2vw;
    color: #7A7A7A;
    padding-bottom: 1vw;
    display: flex;
    flex-direction: row;
}
.headerLong{
    flex-grow: 0;
    flex-basis: 30%;
}
.blank{
    flex-grow: 0;
    flex-basis: 7%;
}

/* || Data */
.dataRow{
    padding: 1vw 0vw 1vw 0vw;
}
.dataRow:hover{
    box-shadow: 0px 2px 3px #636363;
    border-radius: 2vw;
}
.dataCol{
    margin-top: 0.2vw;
    font-family: NunitoBold;
    font-size: 1.5vw;
}

/* || Edit Button */
.editBtnContainer{
    flex-grow: 0;
    flex-basis: 1%;
}
.editButton{
    border-radius: 5vw;
    background-color: #5379F6;
    width: 3vw;
    float: right;
    border-style: none;
}
#editBtnIcon{
    width: 70%;
    margin: 0.5vw 0vw 0.5vw 0.2vw;
}

.pagination{
    --bs-pagination-border-radius:2vw;
    --bs-pagination-font-size:1.5vw;
    --bs-pagination-padding-x: 0.8rem;
    --bs-pagination-color: #5379F6;
    --bs-pagination-bg:none;
    --bs-pagination-border-width: 0px;
    --bs-pagination-hover-color: white;
    --bs-pagination-hover-bg: #5379F6;
    --bs-pagination-disabled-bg:none;
}

@media (max-width: 1024px) {
    .tableTitle{
        width: 37%;
    }
    .editButton{
        border-radius: 5vw;
        background-color: #5379F6;
        width: 3vw;
        height: 3vw;
    }
    .blank{
        flex-grow: 0;
        flex-basis: 8%;
    }
    .headerLong{
        flex-grow: 0;
        flex-basis: 30%;
    }
    
    .dataCol{
        margin-top: 0.2vw;
        font-size: 2vw;
    }
    #editBtnIcon{
        width: 90%;
        margin-top: 0;
    }
}

.pagination-container {
    display: flex;
    column-gap: 10px;
  }
  .paginate-buttons {
    height: 40px;
    width: 40px;
    border-radius: 20px;
    cursor: pointer;
    background-color: rgb(242, 242, 242);
    border: 1px solid rgb(217, 217, 217);
    color: black;
  }
  .paginate-buttons:hover {
    background-color: #d8d8d8;
  }
  .active-page {
    background-color: #3498db;
    border: 1px solid #3498db;
    color: white;
  }
  .active-page:hover {
    background-color: #2988c8;
  }

@media (max-width: 800px) {
    #editBtnIcon{
        margin-top: -1vw;
    }
}

</style>
