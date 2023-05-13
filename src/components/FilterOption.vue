<template>
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
        applyFilter: function(){
          this.$emit("update-list", this.lister);
        }
    }
  };
</script>

<style scoped>

</style>