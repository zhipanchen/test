<template>
  <!--查看调课申请页面-->
  <div id="test">
    <topTitle></topTitle>
    <!--导航栏组件-->
    <topBar activeVue="#/eduAdmin/adjustCouApply"></topBar>
    <!--查看调课申请页面主组件-->
    <testInfo></testInfo>
  </div>
</template>

<script>
  import topTitle from './../../../components/public/topTitle/topTitle.vue'
  import topBar from '../../../components/student/studentTestInfoPage/topBar/topBar.vue'
  import testInfo from '../../../components/student/studentTestInfoPage/studentTestInfoContent/studentTestInfoContent.vue'
  export default {
    name: 'test',
    data () {
      return {

      }
    },
    components: {
      topTitle,
      topBar,
      testInfo
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
