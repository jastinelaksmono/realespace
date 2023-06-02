<template>   
    <div class="square">
        <div v-if="name == 'All'" class="">All</div>
        <img v-else :src="require(`../assets/img/${fileName.toLowerCase()}.png`)" alt="icons_pic" :class="changeIcon(name) "/>
    </div>
</template>
  
<script>
export default {
    props: {
        name: String,
        fileName: String,
    },
    data(){
        return{

        }
    },
    created(){
    },
    methods:{
        changeIcon: function(name){
            let nameEnd = name.split(" ");
            return "squareIcon " + nameEnd[0].toLowerCase() + "Icon";
        },
    }
};
</script>
  
<style scoped>

.square{
    border: 0.5vw #cecece solid;
    border-radius: 1vw;
    text-align: center;
    font-size: 8vw;
    color: #cecece;
    font-family: NunitoSemiBold;
}

.square:hover{
    border-color: #5379F6;
    background-color: white;
    color: #5379F6;
}

.active{
    color: white;
    background-color: #5379F6;
    border-color: transparent;
}

.squareIcon{
  width: 60%;
}

.square:hover .houseIcon{
    content:url("../assets/img/house_blue.png");
}

.square:hover .apartmentIcon{
    content:url("../assets/img/apartment_blue.png");
}

.square:hover .privateIcon{
    content:url("../assets/img/private sale_blue.png");
}

.square:hover .auctionIcon{
    content:url("../assets/img/auction_blue.png");
}


@media (max-width: 992px) {
   
}

@media (max-width: 576px) {
    .squareIcon{
        width: 70%;
    }
    .square{
        font-size: 12vw;
    }

    /*
    .sActive{
        border-color: #5379F6;
        background-color: white;
        color: #5379F6;
    }

    .sActive .houseIcon{
        content:url("../assets/img/house_blue.png");
    }

    .sActive .apartmentIcon {
        content:url("../assets/img/apartment_blue.png");
    }
     */
    
    .square:hover{
        border-color: transparent;
        background-color: #5379F6;
        color: white;
    }
    .square:hover .houseIcon{
        content:url("../assets/img/house_white.png");
    }

    .square:hover .apartmentIcon{
        content:url("../assets/img/apartment_white.png");
    }

    .square:hover .privateIcon{
        content:url("../assets/img/private sale_white.png");
    }

    .square:hover .auctionIcon{
        content:url("../assets/img/auction_white.png");
    }
}

</style>