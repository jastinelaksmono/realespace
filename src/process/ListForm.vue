<template>   

    <!--Display add new property button-->
    <div class="row" v-if="currentUser.userType == 'agents'">
        <button type="button" class="col-sm-3 field btn" @click="openPopup('add')">+ add new property</button>
    </div>

    <!-- Pop up box -->
    <Popup v-if="popupTrigger == true" :formName="inputInformation" @close-popup="closePopup" @update-list="updateList"></Popup>

    <!-- Table title and filter -->
    <div class="row" v-if="currentUser.userType == 'agents'">
        <div class="col-sm-4 tableTitle">{{tableTitle}}</div>
        <div class="col">
            <FilterOption :filter="lister" :tab-selected="selectedTab" @update-list="updateList"></FilterOption>
        </div>
    </div>

    <!-- Table list of properties added by a logged in agent/their agency-->
    <table v-if="currentUser.userType == 'agents'" class="container-fluid mt-3">
        <tr>
            <td :class="isFirstCol(index) + ' headerText'" v-for="(header, index) in headers" :key="index">
                {{ formatHeader(header, index) }}
            </td>
        </tr>

        <tr class='dataRow px-5' v-for="(property, index) in getItems" :key="index">
            <td v-for="(prop, index) in property" :key="index" :class="isFirstCol(index)">{{index != headers.length-1 ? prop: ''}}
                <button class='editButton' id='edit' v-if="index == headers.length-1 && lister == 'me'" @click="openPopup('edit ' + prop)">
                    edit
                </button>
            </td>
        </tr>
    </table>

    <!-- Vuejs Paginate list of properties-->
    <Paginate v-if="selectedTab == 'Properties' && getItems.length!=0"
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
import db from "../firebase/index";
import { ref, set, onValue, update } from "firebase/database";
import FilterOption from '@/components/FilterOption.vue';
import Popup from "../components/Popup.vue";
import Paginate from "vuejs-paginate-next";
export default {
    props: {
        selectedTab: String,        //the selected tab name
    },
    components:{
        FilterOption,               //the dropdown component
        Popup,                      //pop up component
        Paginate,                   //imported pagination component
    },
    data(){
        return{
            tableTitle: 'Properties listed by',                                     //The table title
            popupTrigger: false,                                                    //Pop up trigger button
            headers: ["type", "address", "size", "suburb", "agent", "propId"],      //list of the property headers
            nodes: [],                                                              //the list of filtered properties added
            pageCount: 0,                                                           //pagination's number of page
            currentPage: 1,                                                         //the pagination current page number
            agentName: '',                                                          //the current logged in agent name
            inputInformation: '',                                                   //the content to be passed to popup
            lister: 'me',                                                           //the chosen lister of the properties (an agent/agency name)
        }
    },
    //Set the title of the list
    created(){
        this.selectedTab == "Properties" ? this.tableTitle = 'Properties listed by' : this.tableTitle = 'Saved Properties';
    },
    computed: {
        //List of properties as filtered and sliced according pagination page count
        getItems: function() {
            this.pageCount = Math.ceil(this.nodes.length/5);
            let current = this.currentPage * 5; 
            let start = current - 5;
            return this.nodes.slice(start, current);
        }
    },
    methods:{
        //sets the clicked page
        clickCallback: function(pageNum) {
            this.currentPage = Number(pageNum);
        },

        //sets the padding of the first column of the list
        isFirstCol: function(index){
            if(index == 0){
                return "text paddingLeft";
            }else{
                return "text";
            }
        },

        //Display or open the popup panel
        openPopup: function(selectedBtn){
            this.inputInformation=selectedBtn + " " + this.selectedTab + " " + this.lister;
            this.popupTrigger = true;
        },

        //Hide or close the popup panel
        closePopup: function(e){
            this.popupTrigger = e;
        },

        //update the added properties list
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
        
        //format the header text of the table/list of added properties
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

        //Retrieve existing agents' name of the same agency of teh current logged in agent
        getAgentName: function(agent){
            var listRef = ref(db, 'agents/' + agent);
            onValue(listRef, (snapshot) => {
                this.agentName = snapshot.val().fname;
            });
        },
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

/* || Data */
.dataRow{
    padding: 1vw 2vw 1vw 2.5vw;
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
    padding: 0.5vw 1vw 0.5vw 1vw;
    margin: 0vw 1vw 0vw 0vw;
}

.editButton:hover #editBtnIcon{
    content:url("../assets/img/edit_icon_blue.png");
}

#editBtnIcon{
    width: 70%;
    margin: 0.5vw 0vw 0.5vw 0.2vw;
}


/** Table text */
.headerText{
    font-size: 1.5vw;
    color: #7A7A7A;
}
.text{
    font-family: NunitoBold;
    font-size: 2vw;
    padding-top: 2vw;
    padding-bottom: 2vw;
}

.paddingLeft{
    padding-left: 1.5vw;
}

.pagination{
  position: relative;
  margin-top: 4vw;
  font-family: NunitoSemiBold;
}

@media (max-width: 992px) {
    
}

@media (max-width: 576px) {

    .btn{
        width: 30vw;
        font-size: 2.5vw;
        border-radius: 3vw;
        margin-right: 2vw;
        margin-bottom: 4vw;
    }

    
}

</style>

