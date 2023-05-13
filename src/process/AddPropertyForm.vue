<template>
    <form ref="addPropertyForm">
        <div class="row">
            <label for="address">Address</label>
            <input type="text" id="address" class="field" v-model="address" placeholder="Input property address"/>
        </div>
        <div class="row">
            <div class="col left">
                <label for="suburb">Suburb</label>
                <input type="text" id="suburb" class="field fullWidth" v-model="suburb" placeholder="Input suburb area"/>
            </div>
            <div class="col right">
                <label for="postcode">Postcode</label>
                <input type="number" id="postcode" class="field fullWidth" min="3000" max="8873" v-model="postcode" placeholder="Input postcode area"/>
            </div>
        </div>

        <div class="row">
            <div class="col left">
                <label for="bedroom">Bedroom</label>
                <input type="number" id="bedroom" class="field fullWidth" min="1" max="10" v-model="bedroom" placeholder="Input number"/>
            </div>
            <div class="col right">
                <label for="bathroom">Bathroom</label>
                <input type="number" id="bathroom" class="field fullWidth" min="1" max="10" v-model="bathroom" placeholder="Input number"/>
            </div>
        </div>

        <div class="row">
            <div class="col left">
                <label for="carSpace">Car Space</label>
                <input type="number" id="carSpace" class="field fullWidth" min="1" max="10" v-model="carSpace" placeholder="Input number"/>
            </div>
            <div class="col right">
                <label for="land_size">Land Size</label>
                <input type="number" id="landSize" class="field fullWidth" min="20" v-model="landSize" placeholder="Input number"/>
            </div>
        </div>

        <div class="row">
            <div class="col left">
                <label for="type">Type</label>
                <select class="dropbtn field" id="type" v-model="type" :class="type=='' ? '' : 'optionSelected'">
                    <option value="" disabled>Choose an option</option>
                    <option value="apartment">Apartment</option>
                    <option value="house">House</option>
                </select>
            </div>
            <div class="col right">
                <label for="status">Status</label>
                <select class="dropbtn field" id="status" v-model="status" :class="status=='' ? '' : 'optionSelected'">
                    <option value="" disabled >Choose an option</option>
                    <option value="buy">Buy</option>
                    <option value="rent">Rent</option>
                </select>
            </div>
        </div>

        <div class="row">
            <div class="col left">
                <label for="price">Price</label>
                <input type="price" id="price" class="field fullWidth" min="0" v-model="price" placeholder="Input price"/>
            </div>
            <div class="col right">
                <label for="saleMethod">Sale Method</label>
                <select class="dropbtn field" id="saleMethod" v-model="saleMethod" :class="saleMethod=='' ? '' : 'optionSelected'">
                    <option value="" disabled>Choose an option</option>
                    <option value="private sale">Private Sale</option>
                    <option value="auction">Auction</option>
                </select>
            </div>
        </div>

        <div class="row" style="margin-top: 3vw;">
            <button type="button" class="field btn">Add</button>
        </div>
       
    </form>
</template>
<script>
  export default {
    props:{

    },
    data(){
        return{
            err: '',
            suburbs: [],
            address: '',
            suburb: '',
            postcode: '',
            bedroom: '',
            bathroom: '',
            carSpace: '',
            landSize: '',
            type: '',
            status: '',
            price: '',
            saleMethod: '',
        }
    },
    mounted(){
        var url = "https://raw.githubusercontent.com/jastinelaksmono/dumps/main/IDDfolder/AustraliaSuburb.json";

        //javascript fetch api
        fetch(url)     
        .then( response =>{
          //turning the response into the usable data
          return response.json();
        })
        .then( data =>{
          //This is the data you wanted to get from url
          this.suburbs=data;
          console.log(this.suburbs);
        })
        .catch(error => {
          this.err=error
        });
    },
    computed:{
        getItem: function() {
			
			return this.msg.slice(start, current);
		}
    },
    methods:{
       getPostcode: function(){
            fetch("http://v0.postcodeapi.com.au/suburbs/3066.json")
       },
       reset() {
			  this.$refs.addPropertyForm.reset();
        }
    }
  };
</script>

<style scoped>
.field{
    margin-bottom: 2vw;
}

.fullWidth{
    width: 100%;
}

.left{
  padding-left: 0vw;
  margin-right: 0.5vw;
}

.right{
  padding-right: 0vw;
}

.dropbtn, select{
    background-color: white;
    border-color: #cecece;
    color: #cecece;
    background-image: url("../assets/img/dropdown_grey.png");
    width: 100%;
}

.optionSelected{
    border-color: #5379F6;
    color: #5379F6;
    background-image: url("../assets/img/dropdown_blue.png");
}

.btn:hover{
    color: #5379F6;
    border: 0.2vw #5379F6 solid;
}

@media (max-width: 1024px) {
    label{
    font-size: 3vw;
    font-family: NunitoRegular;
    color: #54575f;
  }
  .field{
    font-size: 3vw;
    border-radius: 5vw;
    padding: 1vw 3vw 1vw 3vw;
    margin-bottom: 2vw;
  }
}

</style>