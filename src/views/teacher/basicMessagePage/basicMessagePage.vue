<template>
  <div id="basicMessage">
    <topTitle></topTitle>
    <topBar></topBar>
    <tableDiv></tableDiv>

  </div>
</template>

<script>
  import topTitle from '../../../components/public/topTitle/topTitle.vue'
  import topBar from '../../../components/teacher/basicMessagePage/topBar/topBar.vue'
  import tableDiv from '../../../components/teacher/basicMessagePage/table/table.vue'
  export default {
    name: 'basicMessage',
    data () {
      return {
        msg: ''
      }
    },
    components: {
      topTitle,
      topBar,
      tableDiv
      /*   selDiv*/
    }
  }

</script>

<style lang="css" scoped>
  html{
    font-size: 16px;
  }
  body{
    /*text-align: center;*/
    background-color: white;
    font-family: 微软雅黑;
  }
  @media screen and (max-width:1023px) {
    html {
      font-size: 9px;
    }
  }
</style>
