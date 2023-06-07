<template>

    <!--Displaying the range of the slider value-->
    <div class="label">{{ priceMinMax }}</div>
    <Slider v-model="value" :min="0" :max="maxNum" :merge="10" :tooltips="false"  :tooltipPosition="'bottom'" class="slider-blue" @update="rangeValue"></Slider>

</template>
  
<script>
    import Slider from "@vueform/slider";
    export default {
        components:{
            Slider
        },
        props: {
            timesNum: Number,                                           //the multiplication of the slider value
            name: String,                                               //the name of the slider is used for (price/land size)
        },
        data(){
            return{
                minValue: 0,                                             //minimal value of the slider
                maxValue: 0,                                             //maximal value of the slider
                priceMinMax: "Any Price",                                //the initial display of the slider range value
                value: [0, 0],                                           //the min and max value of the current slider 
                maxNum: 0,                                               //maximum slider value according to the input name
                index: 0,                                                //index of the filtering form order
                
            }
        },
        //set up the configuration of the slider accoring to its name/type (price/land size)
        created(){
            if(this.name == "price"){
                this.maxNum = 31;
                this.priceMinMax = "Any Price";
                this.index = 2;
            }else if(this.name == "size"){
                this.maxNum = 21;
                this.priceMinMax = "Any Size";
                this.index = 6;
            }
            this.value[1] = this.maxNum;
        },
        methods:{
            //passing the current range value of the slider inputted by the user
            rangeValue: function(){

                this.minValue = this.value[0];
                this.maxValue = this.value[1];

                if((this.minValue == 0 && this.maxValue == this.maxNum) || (this.minValue == this.maxValue)){
                    this.priceMinMax = this.name == "price" ? 'Any Price' : 'Any Size';
                }else if(this.minValue > 0 && this.maxValue < this.maxNum){
                    this.priceMinMax =  this.formatText(this.minValue) + " to " + this.formatText(this.maxValue);
                }else if(this.minValue > 0){
                    this.priceMinMax =  "More than " + this.formatText(this.minValue);
                }else{
                    this.priceMinMax =  "Up to " + this.formatText(this.maxValue);
                }

                let realMinValue = this.minValue != 0 && this.minValue != this.maxNum ? this.minValue*this.timesNum : 0;
                let realMaxValue = this.maxValue != 0 && this.maxValue != this.maxNum ? this.maxValue*this.timesNum : 0;

                this.$emit("change-range", [this.index, realMinValue, realMaxValue]);

            },
            //format teh text to be displayed to show the range of the slider value
            formatText: function(val){
                if(this.name == 'price'){
                    return "$"+ (val * this.timesNum).toLocaleString('en-US');
                }else{
                    return (val * this.timesNum).toLocaleString('en-US') + "m" + decodeURI('%C2%B2');
                }
            }
        }
    };
</script>

<style scoped>
@import '@vueform/slider/themes/default.css';
.label{
    font-size: 3vw;
    font-family: NunitoSemiBold;
    color: #54575f;
    margin-bottom: 2vw;
    text-align: center;
}

.slider-blue {
  --slider-connect-bg: #5379F6;
  --slider-tooltip-bg: #5379F6;
  --slider-handle-ring-color: #5b44ef30;
  --slider-tooltip-color: #fff;
}


@media (max-width: 576px) {
    .label{
        font-size: 4vw;
    }
}


</style>