<template>
    <div class="popup">
		<div :class="adjustPanelSize()">

            <div class="row">
                <div class="col closeText" @click="closePopup()">close
                    <img src="../assets/img/close_grey.png" :class="adjustCloseSize()" alt="close_icon">
                </div>
                
            </div>

            <div class="row formTitle" v-if="notif == true">{{ msg }}</div>
            
            <div class=" row formScroll" v-if="notif == false && passedTab.includes(arrayInputs[0]) ">
                <AddEditProperty :passed-data="arrayInputs" @execute-operation="executeOperation"></AddEditProperty>     
            </div>

            <div class="row formScroll" v-if="!passedTab.includes(arrayInputs[0])">
                <FilterForm :passed-data="arrayInputs"></FilterForm>
            </div>

		</div>
	</div>
</template>

<script>
import AddEditProperty from '@/process/AddEditProperty.vue';
import Tab from '../components/Tab.vue';
import FilterForm from '@/process/FilterForm.vue';

export default {
    props:{
        formName: String,
    },
    components:{
        AddEditProperty,
        Tab,
        FilterForm
    },
    data(){
        return{
            arrayInputs: this.formName.split(" "),
            notif: false,
            msg: '',
            passedTab:["add", "edit"],
        }
    },
    created(){

    },
    methods:{
        closePopup: function(){
            this.notif = false;
            this.$emit("close-popup", false);
        },
        executeOperation: function(e){
            console.log(e[0]);
            this.$emit("update-list", e[0]);
            this.notif = true;
            this.msg = e[1];
        },
        adjustPanelSize: function(){
            if(this.notif){
                return 'popup-inner notifPanel';
            }else{
                return 'popup-inner';
            }
        },
        adjustCloseSize: function(){
            if(window.innerWidth<=576 && this.notif){
                return 'closeIcon iconLarger';
            }else{
                return 'closeIcon';
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
        height: 92vh;
        padding-right: 0;
    }

    .notifPanel{
        width: 80%;
        height: 25vw;
    }

    .row{
        width: 100%;
    }

    .formScroll{
        height: 95%;
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