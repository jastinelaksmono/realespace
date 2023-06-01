<template>
    <div class="label">{{priceMinMax }}</div>
    
    
    <div class="wrap">
        <input type="range" v-model="minValue" min="0" max="30" class="slider s2" ref="sliderMin" :on-change="rangePrice()"/>
        <input type="range" v-model="maxValue" min="0" max="30" class="slider"   ref="sliderMax" :on-change="rangePrice()"/>
    </div>
    
</template>
  
<script>
    export default {
        components:{
        },
        props: {
        },
        data(){
            return{
                minValue: 0,
                maxValue: 30,
                priceMinMax: "Any Price",
            }
        },
        methods:{
            rangePrice: function(){
                
                //this.checkValid();

                if(this.minValue == 0 && this.maxValue == 30){
                    this.priceMinMax = 'Any Price';
                }else if(this.minValue > 0 && this.maxValue < 30){
                    this.priceMinMax =  "$" + (this.minValue * 500000).toLocaleString('en-US') + " to $" + (this.maxValue * 500000).toLocaleString('en-US');
                }else if(this.minValue > 0){
                    this.priceMinMax =  "More than $" + (this.minValue * 500000).toLocaleString('en-US');
                }else{
                    this.priceMinMax =  "Up to $" + (this.maxValue * 500000).toLocaleString('en-US');
                }

            },
            checkValid: function(){
                if(this.minValue >= this.maxValue){
                    this.$refs.input.sliderMin.disabled = true;
                }else{
                    //this.$refs.input.sliderMin.disabled = true;
                }
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
    text-align: center;
}


.wrap {
    display: grid;
    position: relative;
    background-color: #cecece;
    border-radius: 2vw;
    width: 100%;
}

.s2{
    position: absolute;
}


.slider{
    -webkit-appearance: none; 
    width: 100%;
    height: 100%;
    border-radius: 5vw;  
    background: none;
    outline: none;
    opacity: 1;
    -webkit-transition: .2s;
    transition: .2s;
}

.slider::-webkit-slider-thumb {
    -webkit-appearance: none; 
    width: 4vw;
    height: 4vw;
    border-radius: 50%; 
    background: #5379F6;
    pointer-events: auto;
    border: none;
}

.slider::-moz-range-thumb {
  width: 5vw;
  height: 5vw;
  border-radius: 50%;
  background: #5379F6;
  pointer-events: auto;
}

.slider::-webkit-slider-runnable-track, .slider::-moz-range-track {
    -webkit-appearance: none;
    background: none;
    pointer-events: none;
}

input[type='range']{
    background: none;
    pointer-events: none;
}



@media (max-width: 576px) {
    .label{
        font-size: 4vw;
    }
}


</style>