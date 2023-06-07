<template>   
    <!-- Display tab according to the chosen style -->
    <div :class="applyStyle()">{{ name != null ? name : num }}</div>
</template>
  
<script>

export default {
    props: {
        tabName: String,        //name of the tab
        tabNum: Number,         //number value of the tab
        tabStyle: Number        //number of chosen stye (1/2)
    },
    data(){
        return{

            //Assigning a null value to to null probs
            name: this.tabName == null ? null : this.tabName,
            num: this.tabNum == null ? null : this.tabNum,
            tab: this.tabStyle == null ? null : this.tabStyle,
        }
    },
    //Change 0 value to become 'Any'
    created(){
        if(this.num == 0){
            this.num = "Any";
        }else if(!isNaN(this.num)){
            this.num = this.num + "+";
        }
    },
    methods:{

        //Apply tab style according to the chosen style value passed
        applyStyle: function(){
            if(this.tab == 2){
                return "tabContainer2";
            }else{
                return "tabContainer";
            }
        },
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

.tabContainer2{
    background-color: #cecece;
    border-radius: 1.5vw;
    color: white;
    font-size: 2vw;
    font-family: NunitoSemiBold;
    padding: 1vw 3vw 1vw 3vw;
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

@media (max-width: 992px) {
    .tabContainer{
        font-size: 3vw;
    }
    .tabContainer2{
        font-size: 3vw;
    }
}

@media (max-width: 576px) {
    .tabContainer{
        font-size: 4vw;
    }
    .tabContainer2{
        font-size: 4vw;
        border-radius: 3vw;
    }
}

</style>