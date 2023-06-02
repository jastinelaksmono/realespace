<template>   

    <div class="row" v-if="currentUser.userType == 'agents'">
        <button type="button" class="col-sm-3 field btn" @click="openPopup('add')">+ add new property</button>
    </div>

    <!-- Pop up box -->
    <Popup v-if="popupTrigger == true" :formName="toggledButton" @close-popup="closePopup" @update-list="updateList"></Popup>

    <!-- Table title and filter -->
    <div class="row" v-if="currentUser.userType == 'agents'">
        <div class="col-sm-4 tableTitle">{{tableTitle}}</div>
        <div class="col">
            <FilterOption :filter="lister" :tab-selected="selectedTab" @update-list="updateList"></FilterOption>
        </div>
    </div>

    <!-- Table list of properties -->
    <div class="tableContainer"  v-if="currentUser.userType == 'agents'">
        <div class="row" style="paddingLeft: 2.5vw">
            <div :class="adjustColSize(index, 'header')" v-for="(header, index) in headers" :key="index">
                {{ formatHeader(header, index) }}
            </div>
        </div>
        <div class='row dataRow' v-for="(property, index) in getItems" :key="index">
            <div :class="adjustColSize(index, lister)" v-for="(prop, index) in property" :key="index">{{index != headers.length-1 ? prop: ''}}
                <button class='editButton' id='edit' v-if="index == headers.length-1 && lister == 'me'" @click="openPopup('edit ' + prop)">
                    edit
                </button>
            </div>

        </div>

    

    </div>

    <div class="row">
        <PropertiesList :selectedTab="selectedTab" :passed-filter="[]" v-if="selectedTab == 'Favourites'"></PropertiesList>
    </div>

    <!-- Vuejs Paginate -->
    <paginate 
            :page-count="2"    
            :page-range="5" 
            :margin-pages="1"
            :click-handler="clickCallback" 
            :prev-text=" 'Prev' "       
            :next-text="'Next'" 
            :container-class="'pagination'" 
            :active-class="'currentPage'">
        </paginate>

</template>
  
<script>
import db from "../firebase/index";
import { ref, set, onValue, update } from "firebase/database";
import FilterOption from '@/components/FilterOption.vue';
import Popup from "../components/Popup.vue";
import paginate from "vuejs-paginate-next";
import PropertiesList from "../process/PropertiesList.vue";
export default {
    props: {
        selectedTab: String,
    },
    components:{
        FilterOption,
        Popup,
        paginate,
        PropertiesList
    },
    data(){
        return{
            tableTitle: 'Properties listed by',
            popupTrigger: false,
            headers: ["type", "address", "size", "suburb", "agent", "propId"],
            nodes: [],
            pageCount: 0,
            currentPage: 1,
            agentName: '',
            toggledButton: '',
            lister: 'me',
        }
    },
    created(){
        this.selectedTab == "Properties" ? this.tableTitle = 'Properties listed by' : this.tableTitle = 'Saved Properties';
       
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
        adjustColSize: function(index, filter){
            var format = [];
            if(filter != 'me'){
                format[0] = "blank";
                format[1] = filter == 'header'? "header" : "dataCol";
            }else{
                format[0] = "editBtnContainer";
                format[1] = "dataCol";
            }
            
            if(index == 1){
                return 'col ' + format[1] + ' headerLong';
            }else if(index == 0 || index ==3){
                return 'col ' + format[1] + ' headerMedium';
            }
            else if(index == this.headers.length-1){
                return 'col ' + format[0];
            }
            else{
                return 'col ' + format[1];
            }
             
        },
        openPopup: function(selectedBtn){
            this.toggledButton=selectedBtn + " " + this.selectedTab + " " + this.lister;
            this.popupTrigger = true;
        },
        closePopup: function(e){
            this.popupTrigger = e;
        },
        updateList: function(e){
            this.lister = e;
            var listRef = ref(db, this.selectedTab.toLowerCase());
            onValue(listRef, (snapshot) => {
                var attr = this.lister=="me"? 'agent' : 'agency';
                var value = this.lister=="me"? this.currentUser.username : this.currentUser.agency;
                var node = [];
                if(snapshot.exists()){
                    this.nodes = [];
                }
                snapshot.forEach(child => {
                    if(child.child(attr).val() == value){
                        for(let i=0; i<this.headers.length-1; i++){
                            var result = child.child(this.headers[i]).val();
                            if(i==this.headers.length-2){
                                this.getAgentName(result);
                                node.push(this.agentName);
                            }else{
                                node.push(result);
                            }
                        }
                        node.push(child.key);
                        this.nodes.push(node);
                        node = [];
                    }
                });
            });
        },
        formatHeader: function(header, index){
            var headerTitle = "";
            if(index != this.headers.length-1){
                headerTitle = header.substring(0,1).toUpperCase() + header.substring(1,header.length);
                if(index == 2){
                    headerTitle  += " m" + decodeURI('%C2%B2');
                }
            }

            return headerTitle;
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

.tableTitle{
    font-family: NunitoSemiBold;
    font-size: 3vw;
    color: #5379F6;
    width: 40%;
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
    font-size: 2vw;
    width: 25vw;
}
.editButton:hover{
    color: #5379F6;
    border: 0.2vw #5379F6 solid;
    background-color: white;
}


/* || Header */
.header{
    font-family: NunitoSemiBold;
    font-size: 2vw;
    color: #7A7A7A;
    padding-bottom: 1vw;
    display: flex;
    flex-direction: row;
    padding-left: 0;
}
.headerLong{
    flex-grow: 0;
    flex-basis: 30%;
}

.headerMedium{
    flex-grow: 0;
    flex-basis: 18%;
}
.blank{
    flex-grow: 0;
    flex-basis: 12%;
}

/* || Data */
.dataRow{
    padding: 1vw 0vw 1vw 2.5vw;
}
.dataRow:hover{
    box-shadow: 0px 2px 3px #636363;
    border-radius: 2vw;
}
.dataCol{
    margin-top: 0.2vw;
    font-family: NunitoBold;
    font-size: 2vw;
    display: flex;
    flex-direction: row;
    padding-right: 0;
    padding-left: 0;
}

/* || Edit Button */
.editBtnContainer{
    flex-grow: 0;
    flex-basis: 1%;
}
.editButton{
    border-radius: 5vw;
    background-color: #5379F6;
    width: 7vw;
    float: right;
    border-style: none;
    font-family: NunitoRegular;
    color: white;
    font-size: 2vw;
    padding: 0.2vw 1vw 0.2vw 1vw;
}

.editButton:hover #editBtnIcon{
    content:url("../assets/img/edit_icon_blue.png");
}

#editBtnIcon{
    width: 70%;
    margin: 0.5vw 0vw 0.5vw 0.2vw;
}

@media (max-width: 992px) {
    
}

@media (max-width: 576px) {
    .header{
        font-size: 1.5vw;
    }

    .blank{
        flex-grow: 0;
        flex-basis: 14%;
    }

    .btn{
        width: 30vw;
        font-size: 2.5vw;
        border-radius: 3vw;
        margin-right: 2vw;
        margin-bottom: 4vw;
    }

    
}

</style>

