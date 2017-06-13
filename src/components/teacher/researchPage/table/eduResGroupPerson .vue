<template>
  <div id="eduResearchGroupPerson">
    {{ person }}<button @click="remove">x</button>
  </div>
</template>

<script>
  export default {
    name: 'eduResearchGroupPerson',
    data () {
      return {
        del: 'remove'
      }
    },
    props: [ 'person' ],
    methods: {
      remove: function(){
        this.$emit('remove',this.del);//向父组件传递参数名为remove，实际内容为del的值
      }
    }
  }
</script>

<style scoped>
  html {
  }
  #eduResearchGroupPerson{
    margin: 0.5rem;
    position: relative;
    left:4rem;
    border:thin solid lightgrey;
    border-radius: 0.1rem;
  }
  button{
    outline: none;
    color: grey;
    background-color: white;
    /*border: thin solid grey;*/
    border:none;
    margin: 0.2rem;
    width: 1rem;
    height: 1rem;
  }
  button:hover{
    cursor: pointer;
  }
  @media screen and (max-width: 1023px) {
    html {
    }
  }
</style>
