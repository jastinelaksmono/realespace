<template>

  <!-- The property card container -->
  <div class="container cardContainer">

    <!-- Displaying the image according to the property type (house/apartment)-->
    <img :src="require(`../assets/img/${details[1].type}_1.png`)" alt="house_pic" class="propPic">

    <!-- Displaying the property's sale method (all/auction/private sale))-->
    <div class="propSaleMethod" v-if="details[1].status != 'rent'">{{ details[1].sale_method }}</div>

    <!-- Displaying the properrt price and favourite buttton -->
    <div class="row" style="text-align: left;">
      <div class="col desc">
        <div class="address">${{ details[1].price.toLocaleString('en-US') }}</div>
      </div>
      <div class="col desc" v-if="currentUser.userType == 'seekers'">
        <img :src="require(`../assets/img/${iconIndicator}.png`)" @click="saveProperty()"  alt="favourite_icon" class="favourite">
      </div>
    </div>

    <!-- Displaying the property's further descriptions -->
    <div class="row">
      <div class="col desc">
        {{ details[1].type }}<br>
        
        {{ details[1].address + ", " + details[1].suburb}}<br>

        <img src="../assets/img/bedroom.png" alt="bedroom_pic" class="icon"/>
        {{ isZero(details[1].bedrooms) }} &nbsp;

        <img src="../assets/img/bathroom.png" alt="bathroom_pic" class="icon"/>
        {{ isZero(details[1].bathrooms) }} &nbsp;

        <img src="../assets/img/carspace.png" alt="carspace_pic" class="icon"/>
        {{ isZero(details[1].car_spaces) }} &nbsp; 

        <img src="../assets/img/landsize.png" alt="landsize_pic" class="icon"/>
        {{ isZero(details[1].size) }}m<sup>2</sup>
      </div>
    </div>
  </div>     

</template>
  
<script>
  import db from "../firebase/index";
  import { getDatabase, ref, set, onValue, update } from "firebase/database";

  export default {
    props: {
      details: Array                  //The property details or information
    },
    data(){
        return{
          iconIndicator: "star",      //The favourite icon indicator (star image)
        }
    },
    created(){
        this.checkFavourite();        //Check if property is saved in property seeker's favourite
      },
    methods:{

      //Display '-' symbol on xero bedroom/bathroom/carspaces amount of the property
      isZero: function(amount){
        if (amount == 0){
          return "-";
        }else{
          return amount;
        }
      },

      //Check the star icon image of a property
      isFavourite: function(){
        if(this.iconIndicator == "star"){
          return false;
        }else{
          return true;
        }
      },

      //Add property to property seeker's favourites list
      saveProperty: function(){
        const updates = {};
        if(!this.isFavourite()){
          updates['/seekers/' + this.currentUser.username + '/favourites/' + this.details[0]] = "";
          this.iconIndicator = "star_clicked";
          update(ref(db), updates);
        }else{
          updates['/seekers/' + this.currentUser.username + '/favourites/' + this.details[0]] = null;
          this.iconIndicator = "star";
          update(ref(db), updates);
        }
        this.$emit('update-favourites', "");
      },

      //Check if property is saved in property seeker's favourite
      checkFavourite: function(){
        var seekerRef = ref(db, 'seekers/'+ this.currentUser.username + "/favourites");
          onValue(seekerRef, (snapshot) => {
              snapshot.forEach(child => {
                  if(child.key == this.details[0]){
                    this.iconIndicator = "star_clicked";
                  }
              });
          });
      }

    }
  };
</script>
  
<style scoped>

.propPic{
  width:90%;
  border-radius: 1vw;
  margin-bottom: 2vw;
}
.cardContainer{
  box-shadow: 5px 5px rgba(165, 165, 165, 0.2);
  background-color: white;
  border-radius: 2vw;
  text-align: center;
  margin-bottom: 2vw;
  position: relative;
  padding: 2vw 1vw 2vw 1vw;
  height: 30vw;
}

.propSaleMethod{
  font-family: NunitoSemiBold;
  color: white;
  background-color: rgb(128, 128, 128, 0.5);
  border-radius: 2vw;
  padding: 0.2vw 1vw 0.2vw 1vw;
  position: absolute;
  top: 3vw;
  font-size: 1.5vw;
  right: 3.5vw;
}

.address{
  font-family: NunitoSemiBold;
  color: black
}

.desc{
  font-size: 1.5vw;
  font-family: NunitoRegular;
  margin-left: 2vw;
  color: #858282;
  text-align: left;
}
.icon{
  width: 7%;
  margin-bottom: 0.5vw;
}

.favourite{
  width:15%;
  float: right;
  margin-right: 2vw;
}

/*
.favourite:hover{
  content:url("../assets/img/star_clicked.png");
}
 */


@media (max-width: 992px) {
  .propPic{
    margin-top: 1vw;
  }

  .propSaleMethod{
    top: 4vw;
    right: 4.5vw;
    border-radius: 2vw;
    padding: 0.5vw 1vw 0.5vw 1vw;
  }

  .cardContainer{
    margin-bottom: 4vw;
    height: 45vw;
  }

  .desc{
    font-size: 2vw;
  }

}

@media (max-width: 576px) {
  .propPic{
    margin-top: 2vw;
  }

  .propSaleMethod{
    top: 7vw;
    right: 9vw;
    font-size: 3vw;
    border-radius: 3vw;
    padding: 0.2vw 1.5vw 0.2vw 1.5vw;
  }

  .cardContainer{
    margin-bottom: 7vw;
    padding-bottom: 4vw;
    height: 83vw;
  }

  .address{
    font-size: 4vw;
  }

  .desc{
    margin-left: 4vw;
    font-size: 4vw;
  }
  .favourite{
    margin-right: 4vw;
  }
}
</style>