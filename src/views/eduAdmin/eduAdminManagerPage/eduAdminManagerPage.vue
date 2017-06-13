<template>
  <!--查看调课申请页面-->
  <div id="changPasswordPage">
    <topTitle></topTitle>
    <!--导航栏组件-->
    <topBar activeVue="#/eduAdmin/adjustCouApply"></topBar>
    <!--查看调课申请页面主组件-->
    <eduAdminManagerContent></eduAdminManagerContent>
  </div>
</template>

<script>
  import topTitle from './../../../components/public/topTitle/topTitle.vue'
  import topBar from '../../../components/eduAdmin/eduAdminManagerPage/topBar/topBar.vue'
  import eduAdminManagerContent from '../../../components/eduAdmin/eduAdminManagerPage/eduAdminManagerContent/eduAdminManagerContent.vue'
  export default {
    name: 'studentChangPasswordPage',
    data () {
      return {
      }
    },
    components: {
      topTitle,
      topBar,
      eduAdminManagerContent,
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
