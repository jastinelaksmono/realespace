<template>
  <div class="container-fluid topPadding">

    <!-- Stages of real estate displayed in carousel-->
    <Carousel
      :navigation="true"
      :pagination="true"
      :startAutoPlay="false"
      :timeout="5000"
      class="carousel"
      v-slot="{ currentSlide }"
    >
      <Slide v-for="(slide, index) in carouselSlides" :key="index">
        <div v-show="currentSlide === index + 1" class="row slideInfo">
          <div class="col-sm-6">
            <img :src="require(`../assets/img/${slide}`)" alt="pic" class="pic" />
          </div>
          <div class="col-sm-5 titleContainer">
            <div class="pageTitle carouselTitle">{{titles[index]}}</div>
          </div>
        </div>
      </Slide>
    </Carousel>

    <!-- Section title -->
    <div class="row cardContainer topPadding" style="flex-direction: column;">
      <div class="col cardTitle">
        What are your goals?
      </div>
      <div class="col cardSubtitle">Choose which action option are you looking for</div> 
    </div>

    <!-- Cards of section options-->
    <div class="row cardContainer">
      <Card :title="'Buy'" :fileName="'for_sale.png'" :desc="actionDesc[0]"></Card>
      <Card :title="'Rent'" :fileName="'rent.png'" class="middleContainer" :desc="actionDesc[1]"></Card>
      <Card :title="'Sell'" :fileName="'sell.png'" :desc="actionDesc[2]"></Card>
    </div>

  </div>

</template>

<script>
import Carousel from '../components/Carousel.vue';
import Slide from '../components/Slide.vue';
import Card from '../components/Card.vue';

export default {
  name: 'HomePage',
  components: {
    Carousel,             //The carousel component
    Slide,                //The slide Component
    Card                  //The container to show existing property statuses and descriptions
  },
  setup() {
    const carouselSlides = ["search_property.png", "open_house.png", "home_cover.png"]; //the images' file name to be displayed in carousel
    return { 
      carouselSlides 
    };
  },
  data(){
    return{
      // The title of each slide in carousel
      titles: ["Search for properties", "Come for an inspection", "Get your own living space"],

      //the property statuses' description
      actionDesc: ["We provide the flexibility for you to find the right properties based on your preferences. Make your own account with us now and get notified for latest properties!",
                  "To rent a property, our platform provides ranges of prices according to your budget and requirements. Make your own account with us now and get notified for latest properties!",
                  "To sell a property, our platform is able to differ selling type. Seller can do an auction or private sale to interested buyers. Get your agency's code and create an account with us as an agent!"]
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

/* || Cards */
.cardTitle{
  font-size: 3vw;
  font-family: NunitoBold;
  color: #5379F6;
  text-align: center;
}
.cardSubtitle{
  font-size: 2vw;
  font-family: NunitoBold;
  color: #54575f;
  text-align: center;
}

/* || Carousel */
.carousel {
  background-color: white;
  margin: 2vw 2vw 0vw 2vw;
  border-radius: 3vw;
  position: relative;
  height: 50vw;
  max-height: 50vw;
  z-index: 0;
  box-shadow: 0px 2px 2px 1px rgba(0, 0, 0, 0.2);
}
.carousel .slideInfo {
  position: absolute;
  display: flex;
  flex-direction: row;
}
.pic{
  width: 80vw;
  margin-left: 7vw;
  margin-top: 4vw;
}

.titleContainer{

  margin: 4vw 0vw 1vw 2.5vw;
  position: relative;
}
.carouselTitle{
  text-align: right;
}
  
.loginBtn{
  width: 30vw;
  border-radius: 5vw;
  background-color: #5379F6;
  color: white;
  font-size: 2vw;
  font-family: NunitoSemiBold;
  padding: 1vw;
  text-align: center;
  margin: 3vw 0vw 1vw 0vw;
}

/* || Card Container */
.cardContainer{
  display: flex;
  position: relative;
  margin: 3vw 2vw 3vw 2vw;
}

.middleContainer{
  margin-left: 4vw; 
  margin-right: 4vw;
}

@media (max-width: 992px) {
  .cardContainer{
    flex-direction: column;
  }
  .middleContainer{
    margin: 4vw 0vw 4vw 0vw;
  }
  .carousel {
    margin-top: 7vw;
  }
  .pic{
    width: 70vw;
    margin-left: 11vw;
    margin-top: 6vw;
  }

}

@media (max-width: 576px) {
  .titleContainer{
    margin: 2vw 0vw 0vw 4vw;
    position: absolute;
  }

  .cardTitle{
    font-size: 4vw;
  }

  .cardSubtitle{
    font-size: 3vw;
  }

  .topPadding{
    padding-top: 9vw;
  }
  
}

</style>
