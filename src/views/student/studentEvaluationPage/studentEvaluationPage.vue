<template>
  <!--查看调课申请页面-->
  <div id="studentEval">
    <topTitle></topTitle>
    <!--导航栏组件-->
    <topBar activeVue="#/eduAdmin/adjustCouApply"></topBar>
    <!--查看调课申请页面主组件-->
    <tableDiv></tableDiv>
  </div>
</template>

<script>
  import topTitle from './../../../components/public/topTitle/topTitle.vue'
  import topBar from '../../../components/student/studentEvaluationPage/topBar/topBar.vue'
  import tableDiv from '../../../components/student/studentEvaluationPage/studentEvaluationContent/studentEvaluationContent.vue'
  export default {
    name: 'studentEval',
    data () {
      return {

      }
    },
    components: {
      topTitle,
      topBar,
      tableDiv
    }
  }

</script>

<style scoped>
  html {
    font-size: 100%;
  }

  @media screen and (max-width: 1023px) {
    html {
      font-size: 56%;
    }
  }
</style>
