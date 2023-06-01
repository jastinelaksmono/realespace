<template>
    <div class="label">{{priceMinMax }}</div>

    <Slider v-model="value" :min="0" :max="maxNum" :merge="10" :tooltips="isShow"  :tooltipPosition="'bottom'" class="slider-blue" @update="rangePrice()"></Slider>
</template>
  
<script>
    import Slider from "@vueform/slider";
    export default {
        components:{
            Slider
        },
        props: {
            timesNum: Number,
            name: String,
        },
        data(){
            return{
                minValue: 0,
                maxValue: 0,
                priceMinMax: "Any Price",
                value: [0, 0],
                maxNum: 0,
                format: function (value) {
                    if(value == 51){
                        return 'Any'
                    }else{
                        return `${Math.round(value * 100)} m `
                    }
                },
                isShow: false,
                
            }
        },
        created(){
            if(this.name == "price"){
                this.maxNum = 31;
                this.isShow = false;
            }else if(this.name == "size"){
                this.maxNum = 51;
                this.isShow = false;
            }
            this.value[1] = this.maxNum;
        },
        methods:{
            rangePrice: function(){

                this.minValue = this.value[0];
                this.maxValue = this.value[1];

                if(this.minValue == 0 && this.maxValue == this.maxNum){
                    this.priceMinMax = 'Any Price';
                }else if(this.minValue > 0 && this.maxValue < this.maxNum){
                    this.priceMinMax =  this.formatText(this.minValue) + " to " + this.formatText(this.maxValue);
                }else if(this.minValue > 0){
                    this.priceMinMax =  "More than " + this.formatText(this.minValue);
                }else{
                    this.priceMinMax =  "Up to " + this.formatText(this.maxValue);
                }

            },
            formatText: function(val){
                if(this.name == 'price'){
                    return "$"+ (val * this.timesNum).toLocaleString('en-US');
                }else{
                    return (val * this.timesNum).toLocaleString('en-US') + " m";
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