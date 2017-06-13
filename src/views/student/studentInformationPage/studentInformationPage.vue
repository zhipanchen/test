<template>
  <!--查看调课申请页面-->
  <div id="myTeacherPage">
    <topTitle></topTitle>
    <!--导航栏组件-->
    <topBar activeVue="#/eduAdmin/adjustCouApply"></topBar>
    <selfInformation></selfInformation>
  </div>
</template>

<script>
  import topTitle from './../../../components/public/topTitle/topTitle.vue'
  import topBar from '../../../components/student/studentInformationPage/topBar/topBar.vue'
  import selfInformation from '../../../components/student/studentInformationPage/studentInformationContent/studentInformationContent.vue'
  export default {
    name: 'studentInformationPage',
    data () {
      return {

      }
    },
    components: {
      topTitle,
      topBar,
      selfInformation
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
