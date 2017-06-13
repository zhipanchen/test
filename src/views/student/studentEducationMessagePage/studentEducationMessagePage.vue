<template>
  <!--查看调课申请页面-->
  <div id="educationMessagePage">
    <topTitle></topTitle>
    <!--导航栏组件-->
    <topBar activeVue="#/eduAdmin/adjustCouApply"></topBar>
    <!--查看调课申请页面主组件-->
    <messageDiv ></messageDiv>
  </div>
</template>

<script>
  import topTitle from './../../../components/public/topTitle/topTitle.vue'
  import topBar from '../../../components/student/studentEducationMessagePage/topBar/topBar.vue'
  import messageDiv from '../../../components/student/studentEducationMessagePage/studentEducationMessageContent/studentEducationMessageContent.vue'
  export default {
    name: 'studentEducationMessagePage',
    data () {
      return {

      }
    },
    components: {
      topTitle,
      topBar,
      messageDiv,
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

