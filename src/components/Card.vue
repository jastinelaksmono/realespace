<template>
    <div class="col tripleContainer">
        <div class="imgContainer">
            <img :src="require(`../assets/img/${img}`)" alt="pic" class="pic"/>
        </div>
        <div class="row">
            <div class="name">{{ name }}</div>
            <div class="desc">{{ actionDesc }}</div>
        </div>
    </div>     
</template>
  
<script>
  export default {
    props: {
        title: String,
        fileName: String,
        desc: String
    },
    data(){
        return{
           name: this.title == null ? 'null' : this.title,
           img: this.fileName == null ? 'null' : this.fileName,
           actionDesc: this.desc == null ? 'null' : this.desc
        }
    }
  };
</script>
  
<style scoped>
.tripleContainer{
    padding: 2vw;
    background-color: white;
    border-radius: 2vw;
    box-shadow: 0px 2px 2px 1px rgba(0, 0, 0, 0.2);
    height: 45vw;
}

.imgContainer{
    width: 100%;
    height: 50%;
    position: relative;
}
.pic{
    width: 90%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    transition: all 500ms;
}
.pic:hover{
    transform: scale(1.2);
}
.name{
    font-family: NunitoSemiBold;
    font-size: 3vw;
    color: #54575f;
    text-align: center;
}
.desc{
    text-align: justify;
    padding: 0vw 2vw 0vw 2vw;
    font-size: 1.5vw;
    font-family: NunitoRegular;
}

@media (max-width: 992px) {
    .tripleContainer{
        height: 50vw;
        display: flex;
        flex-direction: row;
    }
    .imgContainer{
        width: 100%;
        height: 30vw;
        position: relative;
    }
    .pic{
        width: 70%;
        
    }
    .name{
        font-family: NunitoSemiBold;
        font-size: 4.5vw;
        margin: auto;
    }
    .desc{
        text-align: justify;
        padding: 0vw 4vw 0vw 0vw;
        font-size: 2vw;
    }
    .tripleContainer .row{
        width: 100%;
    }
}

@media (max-width: 576px) {
    .tripleContainer{
        display: flex;
        flex-direction: column;
    }

    .pic{
        width: 40%;
    }

    .name{
        margin-left: 3vw;
    }

    .desc{
        text-align: justify;
        padding: 0vw 2vw 0vw 6vw;
        font-size: 2vw;
    }
}
</style>