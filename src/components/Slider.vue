<template>
    <div class="label">{{"$" + (labelValue * 500000).toLocaleString('en-US')}}</div>
    <input type="range" v-model="labelValue" min="0" max="30" class="slider" />
</template>
  
<script>
  export default {
    props: {
        sliderValue: Number
    },
    data(){
        return{
            labelValue: this.sliderValue,
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

.slider {
  -webkit-appearance: none;
  width: 100%;
  height: 2vw;
  border-radius: 2vw;  
  background: #d3d3d3;
  outline: none;
  opacity: 1;
  -webkit-transition: .2s;
  transition: .2s;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 100%;
  border-radius: 50%; 
  background: #5379F6;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 4vw;
  height: 4vw;
  border-radius: 50%;
  background: #5379F6;
  cursor: pointer;
}

@media (max-width: 576px) {
    .label{
        font-size: 4vw;
    }
}

</style>