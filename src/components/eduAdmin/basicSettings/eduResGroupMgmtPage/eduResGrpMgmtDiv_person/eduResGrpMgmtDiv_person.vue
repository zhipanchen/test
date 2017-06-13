<template>
    <div id="eduResearchGroupPerson">
      {{ person }}<button @click="remove">×</button>
    </div>
  <!--组员组件-->
</template>

<script>
    export default {
        name: 'eduResearchGroupPerson',
        data () {
            return {
              del: 'remove'
//              操作传值
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
    /*组件最上层区域*/
    #eduResearchGroupPerson{
      margin: 0.5rem;
      border:thin solid lightgrey;
      border-radius: 0.1rem;
    }
    /*成员按钮*/
    button{
      outline: none;
      color: grey;
      background-color: white;
      border: none;
      margin: 0.2rem;
      padding: 0;
      width: 1rem;
      height: 1rem;
    }
    button:hover{
      cursor: pointer;
    }
    @media screen and (max-width: 1025px) {
        html {
        }
    }
</style>
