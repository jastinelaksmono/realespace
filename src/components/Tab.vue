<template>   
    <div class="tabContainer">{{ name }}</div>
</template>
  
<script>
export default {
    props: {
        tabName: String
    },
    data(){
        return{
           name: this.tabName == null ? 'null' : this.tabName
        }
    },
    methods:{
        adjustActiveClass: function(){
            if(this.currentTab == this.name){
                return "tabContainer active";
            }else{
                return "tabContainer";
            }
        }
    }
};
</script>
  
<style scoped>
.tabContainer{
    background-color: #cecece;
    border-radius: 2vw 2vw 0vw 0vw;
    color: white;
    font-size: 2vw;
    font-family: NunitoSemiBold;
    padding: 1vw 2vw 1vw 2vw;
    text-align: center;
}

.tabContainer:hover{
    background-color: #5379F6;
    color: white;
}
.active{
    background-color: white;
    color: #5379F6;
}

@media (max-width: 1024px) {
    .tabContainer{
        font-size: 4vw;
    }
}

</style>