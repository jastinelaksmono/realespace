<template>
    <form ref="addPropertyForm">
        <fieldset><legend class="formTitle">{{setFormTitle()}}</legend></fieldset>
        <div class="row" >
            <div class="col left">
                <label for="propId">Property ID</label>
                <div v-if="err!= ''" class="errorMsg">*{{err}}</div>
                <input type="text" id="propId" class="field fullWidth" v-model="dataProps[12][1]" :disabled="passedData[0] == 'edit'" placeholder="Input property id"/>
            </div>
            <div class="col right" >
                <label for="agent">Agent Username</label>
                <select class="dropbtn field" id="agent" v-model="dataProps[1][1]" :class="dataProps[1][1]=='' ? '' : 'optionSelected'">
                    <option value="" disabled >{{ passedData[0] == 'edit' ? "Choose an option" : currentUser.username }}</option>
                    <option v-for="username in existingAgents" :value=username>{{username}}</option>
                </select>
            </div>
        </div>
        <div class="row">
            <label for="address">Address</label>
            <input type="text" id="address" class="field" v-model="dataProps[0][1]" placeholder="Input property address"/>
        </div>
        <div class="row">
            <div class="col left">
                <label for="suburb">Suburb</label>
                <input type="text" id="suburb" class="field fullWidth" v-model="dataProps[10][1]" placeholder="Input suburb area"/>
            </div>
            <div class="col right">
                <label for="postcode">Postcode</label>
                <input type="number" id="postcode" class="field fullWidth" min="3000" max="8873" v-model="dataProps[5][1]" placeholder="Input postcode area"/>
            </div>
        </div>

        <div class="row">
            <div class="col left">
                <label for="bedroom">Bedroom</label>
                <input type="number" id="bedroom" class="field fullWidth" min="1" max="10" v-model="dataProps[3][1]" placeholder="Input number"/>
            </div>
            <div class="col right">
                <label for="bathroom">Bathroom</label>
                <input type="number" id="bathroom" class="field fullWidth" min="1" max="10" v-model="dataProps[2][1]" placeholder="Input number"/>
            </div>
        </div>

        <div class="row">
            <div class="col left">
                <label for="carSpace">Car Space</label>
                <input type="number" id="carSpace" class="field fullWidth" min="0" max="10" v-model="dataProps[4][1]" placeholder="Input number"/>
            </div>
            <div class="col right">
                <label for="land_size">Land Size</label>
                <input type="number" id="landSize" class="field fullWidth" min="20" v-model="dataProps[8][1]" placeholder="Input number"/>
            </div>
        </div>

        <div class="row">
            <div class="col left">
                <label for="type">Type</label>
                <select class="dropbtn field" id="type" v-model="dataProps[11][1]" :class="dataProps[11][1] =='' ? '' : 'optionSelected'">
                    <option value="" disabled>Choose an option</option>
                    <option value="Apartment">Apartment</option>
                    <option value="House">House</option>
                </select>
            </div>
            <div class="col right">
                <label for="status">Status</label>
                <select class="dropbtn field" id="status" v-model="dataProps[9][1]" :class="dataProps[9][1]=='' ? '' : 'optionSelected'">
                    <option value="" disabled >Choose an option</option>
                    <option value="buy">Buy</option>
                    <option value="rent">Rent</option>
                    <option value="sold">Sold</option>
                </select>
            </div>
        </div>

        <div class="row">
            <div class="col left">
                <label for="price">Price</label>
                <input type="number" id="price" class="field fullWidth" min="0" v-model="dataProps[6][1]" placeholder="Input price"/>
            </div>
            <div class="col right">
                <label for="saleMethod">Sale Method</label>
                <select class="dropbtn field" id="saleMethod" v-model="dataProps[7][1]" :class="dataProps[7][1]=='' ? '' : 'optionSelected'">
                    <option value="" disabled>Choose an option</option>
                    <option value="All">All</option>
                    <option value="Private Sale">Private Sale</option>
                    <option value="Auction">Auction</option>
                </select>
            </div>
        </div>

        <div class="row" style="margin-top: 3vw;">
            <button v-if="passedData[0] == 'add'" type="button" class="field btn" @click="validateNewId()">Add</button>
            <button v-if="passedData[0] == 'edit'" class="col field reverse left" @click="deleteProperty()">Delete</button>
            <button v-if="passedData[0] == 'edit'" type="button" class="col field btn right alignLeft" @click="executeProperties('update')">Update</button>
        </div>
       
    </form>
</template>
<script>
import db from "../firebase/index";
import {ref, set, onValue, update } from "firebase/database";
export default {
    props:{
        passedData: Array, // if add btn   -> [btnName, selectedTab, currentFilter]
                            // if edit btn  -> [btnName, dataId, selectedTab, currentFilter]
        
    },
    data(){
        return{
            formTitle: '',
            err: '',
            dataProps: [
                ["address", ""],                //0
                ["agent", ""],                  //1
                ["bathrooms", ""],              //2
                ["bedrooms", ""],               //3
                ["car_spaces", ""],             //4
                ["postcode", ""],               //5
                ["price", ""],                  //6
                ["sale_method", ""],            //7
                ["size", ""],                   //8
                ["status", ""],                 //9
                ["suburb", ""],                 //10
                ["type", ""],                   //11
                ["propId", ""]                  //12
            ],
            existingAgents: [],
            isIdValid: true,
            updates: {},
        }
    },
    created(){
        if(this.passedData[0] == 'edit'){
            this.passedData[2] = this.passedData[2].toLowerCase();
            this.executeProperties('get');
            this.retrieveAgents();
        }else{
            this.passedData[1] =this.passedData[1].toLowerCase();
        }
    },
    methods:{
        setFormTitle: function(){
            return this.passedData[0] == 'add' ? 'Add New Property' : 'Edit Property';
        },
        validateNewId: function(){
            if(this.dataProps[12][1] == ''){
                this.err = 'Property ID cannot be empty';
            }else{
                const propRef = ref(db, 'properties');
                onValue(propRef, (snapshot) => {
                    snapshot.forEach(child=>{
                        if(child.key == this.dataProps[12][1]){
                            this.isIdValid = false;
                        }
                    });
                });

                if(this.isIdValid){
                    this.err = '';
                    this.writeNewProperty();
                }else{
                    this.err ='*Id has been used';
                }
            }
        },
        writeNewProperty: function(){
            const propRef = ref(db, 'properties/' + this.dataProps[12][1]);
            set(propRef, {
                address: this.dataProps[0][1],
                suburb: this.dataProps[10][1],
                postcode: this.dataProps[5][1],
                bathrooms: this.dataProps[3][1],
                bedrooms: this.dataProps[2][1],
                car_spaces: this.dataProps[4][1],
                size: this.dataProps[8][1],
                price: this.dataProps[6][1],
                sale_method: this.dataProps[7][1],
                status: this.dataProps[9][1],
                type: this.dataProps[11][1],
                agency: this.currentUser.agency,
                agent: this.currentUser.username
            });
            this.$emit('execute-operation', [this.passedData[2], "Property successfully added!"]);
        },
        deleteProperty: function(){
            const deletes = {};
            deletes['/'+ this.passedData[2] + '/' + this.passedData[1]] = null;
            this.deleteFromFav(deletes);
            update(ref(db), deletes);
            this.$emit('execute-operation', [this.passedData[3], "Property successfully deleted!"]);
        },
        executeProperties: function(operation){
            var propRef = ref(db, this.passedData[2] + '/' + this.passedData[1]);
            onValue(propRef, (snapshot) => {
                for(let i=0; i< this.dataProps.length-1; i++){
                    if(operation == 'get'){
                        this.dataProps[i][1] = snapshot.child(this.dataProps[i][0]).val();
                    }else if (operation == 'update'){
                        if(this.dataProps[i][1] != snapshot.child(this.dataProps[i][0]).val()){
                            this.updates['/'+ this.passedData[2] + '/' + this.passedData[1] + '/' + this.dataProps[i][0] ] = this.dataProps[i][1];
                        }
                    }
                }
            });
            this.dataProps[12][1] = this.passedData[1];
            if(operation == 'update'){
                update(ref(db), this.updates);
                this.$emit('execute-operation', [this.passedData[3], "Property successfully updated!"]);
            }
        },
        deleteFromFav: function(deletes){
            var agentRef = ref(db, 'seekers');
            onValue(agentRef, (snapshot) => {
                snapshot.forEach(child => {
                    (child.child("favourites")).forEach((prop) => {
                        if(prop == this.passedData[1]){
                            deletes['/seekers/' + child.key + '/favourites/' + this.passedData[1]] = null;
                        }
                    });
                });
            });
        },
        retrieveAgents: function(){
            var agentRef = ref(db, 'agents');
            onValue(agentRef, (snapshot) => {
                snapshot.forEach(child => {
                    this.existingAgents.push(child.key);
                });
            });
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

.btn:hover{
    color: white;
    background-color: #5379F6;
}

.reverse{
    margin-right: 2vw;
}

.alignLeft{
    margin-left: 2vw;
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

@media (max-width: 992px) {
    label{
        font-size: 2vw;
        font-family: NunitoRegular;
        color: #54575f;
    }
    .field{
        font-size: 2vw;
        border-radius: 5vw;
        padding: 1vw 3vw 1vw 3vw;
        margin-bottom: 2vw;
    }
    .formTitle{
        font-size: 5vw;
        margin-bottom: 3vw;
        margin-top: 2vw;
    }
}

@media (max-width: 576px) {

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

    .formTitle{
        font-size: 8vw;
        margin-bottom: 3vw;
        margin-top: 5vw;
    }

    .row{
        margin-top: 3vw;
    }

    .row button{
        margin-top: 3vw;
    }
}
</style>