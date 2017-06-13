<template>
  <!--使用import引入的组件组合page页面-->
  <div id="inquireGradePage">
    <topTitle></topTitle>
    <topBar></topBar>
    <gradeTable></gradeTable>
  </div>
</template>

<script>
  /*import引入该page页面的单文件组件*/
  import topTitle from '../../../components/public/topTitle/topTitle.vue'
  import topBar from '../../../components/student/inquireGradePage/topBar/topBar.vue'
  import gradeTable from '../../../components/student/inquireGradePage/gradeTable/gradeTable.vue'
  export default {
    name: 'inquireGradePage',
    data () {
      return {
        msg: ''
      }
    },
    /*注册import引入的单文件组件*/
    components:{
      topTitle,
      topBar,
      gradeTable
    }
  }
</script>

<style scoped>
  html{
    font-size: 100%;
  }
  #inquireGradePage{
    height:50rem;
  }
  @media screen and (max-width:1023px) {
    html {
      font-size: 56%;
    }
  }
</style>
