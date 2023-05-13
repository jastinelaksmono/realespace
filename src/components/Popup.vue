<template>
    <div class="popup">
		<div class="popup-inner">

            <div class="row">
                <div class="col closeText" @click="closePopup()">close
                    <img src="../assets/img/close_grey.png" class="closeIcon" alt="close_icon">
                </div>
                
            </div>
            
            <AddPropertyForm></AddPropertyForm>

		</div>
	</div>
</template>

<script>
import AddPropertyForm from '@/process/AddPropertyForm.vue';
export default {
    props:{
        formName: String,
    },
    components:{
        AddPropertyForm
    },
    data(){
        return{
            
        }
    },
    methods:{
       closePopup: function(){
            this.$emit("close-popup", false)
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
    width:50vw;
    border-radius: 2vw;
    overflow-y: scroll;
    height: 40vw;
}
.closeText{
    font-family: NunitoSemiBold;
    font-size: 1.5vw;
    margin-left: 33vw;
    margin-top: 1vw;
    text-align: right;
    color: #858282;
}
.closeIcon{
    float: right;
    margin-left: 1vw;
    width: 20%;
}

.closeText:hover{
    color: #5379F6;
}

.closeText:hover .closeIcon{
  content:url("../assets/img/close_blue.png");
}


@media (max-width: 1024px) {
    .popup-inner {
        padding: 5vw;
        width:75vw;
        height: 70vw;
    }

    .closeText{
        font-size: 3vw;
        margin-left: 43vw;
    }
    .closeIcon{
        width: 15%;
        margin-top: 1vw;
    }
}
</style>