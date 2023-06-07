<template>   

  <!--The login/signup form-->
  <form class="formContainer" ref="form">

    <!--The input fields required for signup only-->
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

    <!--The input field required for both login and signup-->
    <div class="row group">
      <label for="username">Username</label>
      <div v-if="errors[3]!= ''" class="errorMsg">*{{errors[3]}}</div>
      <input type="text" id="username" class="field" v-model="username" placeholder="your username here"/>

      <label for="pass">Password</label>
      <div v-if="errors[4]!= ''" class="errorMsg">*{{errors[4]}}</div>
      <input type="password" id="pass" class="col-9 field left"  v-model="pass"  placeholder="your password" v-password="showPassword"/>
      <button type="button"  @click="showPassword = !showPassword" class="col field btn">{{ showPassword ? 'Hide' : 'Show' }}</button>
     
  
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
          Buyer/Renter
      </div>
    </div>

    <!--The code input required when first register/signup only-->
    <div class="row group">
      <div v-show="name == 'Signup' && userType=='agents'" class="codeContainer">
        <label for="code">Agency Code</label>
        <input type="text" id="code" class="field" v-model="code" placeholder="your agency code"/>
        <div v-if="errors[6]!= ''" class="errorMsg">*{{errors[6]}}</div>
      </div>
    </div>

    <!--The button to reset and login/signup to an account-->
    <div class="row group mt-5">
      <button class="col field reverse left" @click="reset()">Reset</button>
      <button type="button" class="col field btn" @click="validateAll()">{{name}}</button>
    </div>
  </form>
    
</template>
  
<script>
  import db from "../firebase/index";
  import { getDatabase, ref, set, onValue, update } from "firebase/database";

  const passBtn = {
	method: (el) => {
		const toggleBtn = el.nextElementSibling;
		toggleBtn.classList.add('password-toggle');

		toggleBtn.addEventListener('click', () => {
			const inputType = el.getAttribute('type');
			el.setAttribute('type', inputType == 'password' ? 'text' : 'password');
			console.log(inputType);
		});	
	}
  }

  export default {
    props:{
      formName: String
    },
    data(){
      return{
        name: this.formName == null ? 'null' : this.formName,       //the form name (login/singup)
        fname: '',                                                  //the user's first name 
        lname: '',                                                  //the user's last name 
        email: '',                                                  //the user's email
        username: '',                                               //the user's username
        pass: '',                                                   //the user's password
        userType: '',                                               //the user's account type (agents/seekers)
        code: '',                                                   //the agency code for agent to reguster new account
        errors: ['','','','','','',''],                             //the error message for each input field validation
        isUsernameExist: false,                                     //the status username inputted by the user
        fullname: '',                                               //combined user's first and last name
        agency: '',                                                 //the agency name 
        showPassword: false
      }
    },
    methods:{
  
      //set the user's user type
      setUserType: function(type){
        this.userType = type;
      },

      //Validate the login/signup form submitted
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

        //Validate based on input fields required for each form
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

      //The validity counted from the error messages found
      isValid(start, end){
        let count = 0;
        for(let i=start; i<=end; i++){
          if(this.errors[i] != ''){
            count++;
          }
        }
        return count == 0;
      },

      //Login to an existing user account
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

      //signing up to a new account
      signup(){
        this.checkUsername();
        if(this.isUsernameExist){
          this.errors[3] = "Username has already existed";
        }else{
          if(this.userType == 'agents'){
            this.checkCode();
          }else{
            this.createNewAccount();
            this.changeRoute();
          }
        }
      },

      //The validity of the inputted username 
      checkUsername: function(){
        var userRef = ref(db, this.userType + '/' + this.username);
        onValue(userRef, (snapshot) => {
            this.isUsernameExist = snapshot.exists();
            if(this.isUsernameExist){
              this.fullname = snapshot.val().fname + " " + snapshot.val().lname;
            }
        });
      },

      //Check the correctness of the password inputted to the database
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

      //Check the listed agency code inputted by the agent to the database
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
              this.createNewAccount();
              this.changeRoute();
            }else{
              this.errors[6] = 'Code not found';
            }
        });
      },

      //Navigate the page to my activities page when form is successfully validated
      changeRoute(){
        this.currentUser.setAll(this.userType, this.username, this.fullname, this.agency);
        this.$router.replace({ path: '/MyActivities' });
      },

      //create a new agent/seeker account to the databade
      createNewAccount: function(){
        const userRef = ref(db, this.userType + "/" + this.username);
            set(userRef, {
                fname: this.fname,
                lname: this.lname,
                email: this.email,
                pass: this.pass
            });
            this.userType == "agents" ? set(ref(db, this.userType + "/agency"),{agency: this.agency}): '';
      },

      //reset the login/signup form
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
  background-color: #5379F6;
  color: white;
}

.btn:hover{
  color: #5379F6;
  background-color: white;
  border: 0.2vw #5379F6 solid;
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

@media (max-width: 992px) {
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

  .bordered, .btn:hover{
    border-width: 0.4vw;
  }

  .codeContainer{
    padding-top: 2vw;
    padding-bottom: 2vw;
  }

  .codeContainer label{
    margin-top: 1vw;
  }

  .left{
    margin-right: 4vw;
  }
}
</style>