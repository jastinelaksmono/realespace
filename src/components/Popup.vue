<template>
    <!--Display pop up-->
    <div class="popup">

        <!-- Adjust panel size according to its use (form/notification popup)-->
		<div :class="adjustPanelSize()">


            <!--The close button of the panel-->
            <div :class="adjustClosePadding()">
                <div class="col closeText" @click="closePopup()">close
                    <img src="../assets/img/close_grey.png" :class="adjustCloseSize()" alt="close_icon">
                </div>
            </div>

            <!-- The message of the notification-->
            <div class="row formTitle" v-if="notif == true">{{ msg }}</div>
            
            <!--The add/edit/delete property form-->
            <div class=" row formScroll" v-if="notif == false && passedTab.includes(arrayInputs[0]) ">
                <AddEditProperty :passed-data="arrayInputs" @execute-operation="executeOperation"></AddEditProperty>     
            </div>

            <!--The filter property form-->
            <div class="row formScroll" v-else-if="!passedTab.includes(arrayInputs[0])">
                <FilterForm :passed-data="arrayInputs" @execute-filter="executeFilter"></FilterForm>
            </div>

		</div>
	</div>
</template>

<script>
import AddEditProperty from '@/process/AddEditProperty.vue';
import FilterForm from '@/process/FilterForm.vue';

export default {
    props:{
        formName: String,       //The passed form name
    },
    components:{
        AddEditProperty,        //the form for add/edit/delete proeprty
        FilterForm              //the form for filter property
    },
    data(){
        return{
            arrayInputs: this.formName.split(" "),         // if add  -> [btnName, selectedTab, currentFilter]
                                                           // if edit -> [btnName, dataId, selectedTab, currentFilter]
                                                           // if buy/rent/sold -> [propertyStatus, searchOutput]
            notif: false,                                  // the notification status
            msg: '',                                       // the message of the notification to be displayed
            passedTab:["add", "edit"],                     // the valid tab names for add/edit/delete property form
        }
    },
    methods:{
        //send event to close the pop up
        closePopup: function(){
            this.notif = false;
            this.$emit("close-popup", false);
        },

        //send event to execute add/update/delete property and display notification
        executeOperation: function(e){
            //console.log(e[0]);
            this.$emit("update-list", e[0]);
            this.notif = true;
            this.msg = e[1];
        },

        //send event to update property list by passing the filtered attributes and close the popup
        executeFilter: function(e){
            this.$emit("update-property", e);
            this.$emit("close-popup", false);
        },

        //adjust the notification panel size
        adjustPanelSize: function(){
            if(this.notif){
                return 'popup-inner notifPanel';
            }else{
                return 'popup-inner';
            }
        },

        //asjust the close panel based on screen width 
        adjustCloseSize: function(){
            if(window.innerWidth<=576 && this.notif){
                return 'closeIcon iconLarger';
            }else{
                return 'closeIcon';
            }
        },

        //adjust the padding of the close panel according to the panel type
        adjustClosePadding: function(){
            if(!this.notif){
                return 'row topPadding';
            }else{
                return 'row';
            }
        }
    }
  };
</script>

<style lang="scss" scoped>
.popup {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 99;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
}
.popup-inner {
    background: #FFF;
    padding: 3vw;
    border-radius: 2vw;
}

.notifPanel{
    height: 25vw;
}
.topPadding{
    padding-top: 0vw;
    padding-bottom: 2vw;
}
.row{
    width:60vw;
}

.formScroll{
    overflow-y: scroll;
    height: 35vw;
}

.closeText{
    font-family: NunitoSemiBold;
    font-size: 3vw;
    margin-left: 33vw;
    margin-bottom: 1vw;
    text-align: right;
    color: #858282;
}
.closeIcon{
    float: right;
    margin-left: 1vw;
    width: 15%;
    margin-top: 0.5vw;
}

.closeText:hover{
    color: #5379F6;
}

.closeText:hover .closeIcon{
  content:url("../assets/img/close_blue.png");
}


@media (max-width: 992px) {

    .closeText{
        font-size: 4vw;
        margin-left: 43vw;
    }
    .closeIcon{
        width: 15%;
        margin-top: 1vw;
    }

    .popup-inner {
        padding: 5vw;
    }

    .row{
        width:70vw;
    }

    .formScroll{
        overflow-y: scroll;
        height: 40vw;
    }
}

@media (max-width: 576px) {
    .popup-inner{
        width: 100%;
        height: 100vh;
        padding-right: 0;
    }

    .notifPanel{
        width: 80%;
        height: 25vw;
    }

    .topPadding{
        padding-top: 8vw;
        padding-bottom: 4vw;
    }

    .row{
        width: 100%;
    }

    .formScroll{
        height: 80%;
    }

    .closeIcon{
        width: 10%;
        margin-top: 1vw;
    }

    .iconLarger{
        width: 15%;
    }
}
</style>