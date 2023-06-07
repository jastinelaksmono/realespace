<template>

  <!-- Displaying the dropdown filter for lister (current logged in agent name / agency name)-->
    <select class="dropbtn" id="lister" v-model="lister" @change="applyFilter()">
      <option value="" disabled class="dropdown-content topDropdown">Choose an option</option>
      <option value="me">{{ currentUser.fullname }}</option>
      <option value="company">{{currentUser.agency}}</option>
    </select>
</template>

<script>
  export default {
    props:{
      tabSelected: String,
      filter: String
    },
    data(){
      return{
        lister: this.filter,
        tab: this.tabSelected
      }
    },
    created(){
      this.applyFilter();
    },
    methods:{
        //Pass chosen lister back to the parent component (List Form)
        applyFilter: function(){
          this.$emit("update-list", this.lister);
        }
    }
  };
</script>

<style scoped>

</style>