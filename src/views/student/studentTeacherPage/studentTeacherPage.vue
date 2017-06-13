<template>
  <!--查看调课申请页面-->
  <div id="myTeacherPage">
    <topTitle></topTitle>
    <!--导航栏组件-->
    <topBar activeVue="#/eduAdmin/adjustCouApply"></topBar>
    <!--查看调课申请页面主组件-->
    <myTeacherDiv></myTeacherDiv>
  </div>
</template>

<script>
  import topTitle from './../../../components/public/topTitle/topTitle.vue'
  import topBar from '../../../components/student/studentTeacherPage/topBar/topBar.vue'
  import myTeacherDiv from '../../../components/student/studentTeacherPage/studentTeacherContent/studentTeacherContent.vue'
  export default {
    name: 'studentTeacherPage',
    data () {
      return {

      }
    },
    components: {
      topTitle,
      topBar,
      myTeacherDiv
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
