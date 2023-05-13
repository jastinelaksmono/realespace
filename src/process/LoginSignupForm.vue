<template>   
  <form class="formContainer" ref="form">

    <div v-if="name == 'Signup'" class="row group">
      <label for="fname">First Name</label>
      <div v-if="errors[0]!= ''" class="errorMsg">*{{errors[0]}}</div>
      <input type="text" id="fname" class="field" v-model="fname" placeholder="your first name here"/>

      <label for="lname">Last Name</label>
      <div v-if="errors[1]!= ''" class="errorMsg">*{{errors[1]}}</div>
      <input type="text" id="lname" class="field" v-model="lname" placeholder="your last name here"/>

      <label for="email">Email</label>
      <div v-if="errors[2]!= ''" class="errorMsg">*{{errors[2]}}</div>
      <input type="email" id="email" class="field" v-model="email" placeholder="your email here"/>

    </div>

    <div class="row group">
      <label for="username">Username</label>
      <div v-if="errors[3]!= ''" class="errorMsg">*{{errors[3]}}</div>
      <input type="text" id="username" class="field" v-model="username" placeholder="your username here"/>

      <label for="pass">Password</label>
      <div v-if="errors[4]!= ''" class="errorMsg">*{{errors[4]}}</div>
      <input type="password" id="pass" class="field" v-model="pass" placeholder="your password"/>

      
      <label>Choose your role</label>
      <div v-if="errors[5]!= ''" class="errorMsg">*{{errors[5]}}</div>
      <div id="agent" 
            class="col field bordered left" 
            @click="setUserType('agents')" 
            :class="userType == 'agents' ?'active':''">
          Agent/Realtor</div>
      <div id="seeker" 
            class="col field bordered right" 
            @click="setUserType('seekers')" 
            :class="userType == 'seekers' ?'active':''">
          Buyer/Renter</div>

      
      <div v-show="name == 'Signup' && userType=='agents'" class="codeContainer">
        <label for="code">Agency Code</label>
        <input type="text" id="code" class="field" v-model="code" placeholder="your agency code"/>
        <div v-if="errors[6]!= ''" class="errorMsg">*{{errors[6]}}</div>
      </div>
    </div>

    <div class="row group">
      <button class="col field btn reverse left" @click="reset()">reset</button>
      <button type="button" class="col field btn right" @click="validateAll()">{{name.toLowerCase()}}</button>
    </div>
  </form>
    
</template>
  
<script>
  import db from "../firebase/index";
  import { getDatabase, ref, set, onValue, update } from "firebase/database";
  export default {
    props:{
      formName: String
    },
    data(){
      return{
        name: this.formName == null ? 'null' : this.formName,
        fname: '',
        lname: '',
        email: '',
        username: '',
        pass: '',
        userType: '',
        code: '',
        errors: ['','','','','','',''],
        isUsernameExist: false,
        fullname: '',
        agency: '',
      }
    },
    methods:{
      setUserType: function(type){
        this.userType = type;
      },
      validateAll: function(){

        if(this.fname == ''){
          this.errors[0] = 'First name cannot be empty';
        }else if(!/^[A-Za-z]+$/.test(this.fname)){
          this.errors[0] = "Input alphabets only";
        }else{
          this.errors[0] = '';
        }

        if(this.lname == ''){
          this.errors[1] = 'Last name cannot be empty';
        }else if(!/^[A-Za-z]+$/.test(this.lname)){
          this.errors[1] = "Input alphabets only";
        }else{
          this.errors[1] = '';
        }

        if(this.email == ''){
          this.errors[2] = 'Email cannot be empty';
        }else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)){
          this.errors[2] = "Incorrect email format"
        }else{
          this.errors[2] = '';
        }

        if(this.username == ''){
          this.errors[3] = 'Username cannot be empty';
        }else if(!/^[a-z0-9]+$/.test(this.username)){
          this.errors[3] = "Input lower alphabets and numbers only";
        }else{
          this.errors[3] = '';
        }

        if(this.pass == ''){
          this.errors[4] = 'Password cannot be empty';
        }else if(this.pass.length < 8){
          this.errors[4] = "Password must be at least 8 characters";
        }else if(!/[$%^&*]/.test(this.pass)){
          this.errors[4] = "At least 1 of [$%^&*] required";
        }else{
          this.errors[4] = '';
        }

        if(this.userType == ''){
          this.errors[5] = 'Role required';
        }else{
          this.errors[5] = '';
        }

        if(this.code == '' && this.userType == 'agents'){
          this.errors[6] = "Agency code is required";
        }else{
          this.errors[6] = '';
        }

        if(this.name == "Login"){
          if(this.isValid(3,5)){
            this.login();
          }
        }else{
          if(this.isValid(0,6)){
            this.signup();
          }
        }

      },
      isValid(start, end){
        let count = 0;
        for(let i=start; i<=end; i++){
          if(this.errors[i] != ''){
            count++;
          }
        }
        return count == 0;
      },
      login(){
        var userRef = ref(db, this.userType + '/' + this.username);
        onValue(userRef, (snapshot) => {
            if(snapshot.exists()){
              this.fullname = snapshot.val().fname + " " + snapshot.val().lname;
              this.agency = snapshot.val().agency;
              this.matchPassword();
            }else{
              this.errors[3] = 'user not found';
            }
        });
      },
      signup(){
        this.checkUsername();
        if(this.isUsernameExist){
          this.errors[3] = "Username has already existed";
        }else{
          this.checkCode();
        }
      },
      checkUsername: function(){
        var userRef = ref(db, this.userType + '/' + this.username);
        onValue(userRef, (snapshot) => {
            this.isUsernameExist = snapshot.exists();
            if(this.isUsernameExist){
              this.fullname = snapshot.val().fname + " " + snapshot.val().lname;
            }
        });
      },
      matchPassword: function(){
          var userRef = ref(db, this.userType + '/' + this.username + '/pass');
          onValue(userRef, (snapshot) => {
              if(this.pass == snapshot.val()){
                this.changeRoute();
              }else{
                this.errors[4] = 'Password does not match';
              }
          });
      },
      checkCode: function(){
        var userRef = ref(db, 'agencies');
        onValue(userRef, (snapshot) => {
            //var nodes = [];
            snapshot.forEach(child => {
                if(child.child("code").val() == this.code){
                  //nodes.push(child.child("code").val());
                  this.agency = child.child("name").val();
                }
            });
            if(this.agency != ''){
              console.log(this.agency);
              this.changeRoute();
            }else{
              this.errors[6] = 'Code not found';
            }
        });
      },
      changeRoute(){
        this.currentUser.setAll(this.userType, this.username, this.fullname, this.agency);
        this.$router.replace({ path: '/MyActivities' });
      },
      reset() {
			  this.$refs.form.reset();
      }
    }
  };
</script>
  
<style scoped>
.formContainer{
  background-color: white;
  border-radius: 2vw;
  box-shadow: 0px 2px 2px 1px rgba(0, 0, 0, 0.2);
  padding: 4vw 2vw 2vw 2vw;
}

.field{
  background-color: #cecece;
  border-radius: 2vw;
  font-size: 1.5vw;
  font-family: NunitoRegular;
  padding: 0.5vw 1vw 0.5vw 1vw;
  margin-bottom: 2vw;
}

.codeContainer{
  padding-right: 0;
}

.codeContainer label{
  margin-top: 0.5vw;
}

#code{
  float: right;
  width: 70%;
}

.btn{
  margin-top: 3vw;
  background-color: #5379F6;
  color: white;
}

.reverse{
  background-color: white;
  color: #5379F6;
}

.bordered{
  background-color: white;
  border: 0.2vw #cecece solid;
  color: #54575f;
  text-align: center;
}
.bordered:hover, .active{
  border-color: #5379F6;
}

.left{
  margin-right: 1vw;
}

.right{
  margin-left: 1vw;
}

.group{
  margin-left: 0;
}
.errorMsg{
  color: #FE766A;
  font-family: NunitoRegular;
  font-size: 1.5vw;
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

  .bordered{
    border-width: 0.4vw;
  }

  .codeContainer{
    padding-top: 2vw;
    padding-bottom: 2vw;
  }

  .codeContainer label{
    margin-top: 1vw;
  }

  .errorMsg{
    font-size: 2.5vw;
  }
}
</style>