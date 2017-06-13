<template>
  <!--合课页面-->
  <div id="combineCourse">
    <topTitle></topTitle>
    <!--导航栏组件-->
    <topBar></topBar>
    <!--合课页面主组件-->
    <combineCourseDiv></combineCourseDiv>
  </div>
</template>

<script>
  import topTitle from './../../../../components/public/topTitle/topTitle.vue'
  import topBar from '../../../../components/eduAdmin/smartArrangeCourse/combineCoursePage/topBar/topBar.vue'
  import combineCourseDiv from '../../../../components/eduAdmin/smartArrangeCourse/combineCoursePage/combineCourseDiv/combineCourseDiv.vue'
  export default {
    name: 'combineCourse',
    data () {
      return {
        msg: ''
      }
    },
    components: {
      topTitle,
      topBar,
      combineCourseDiv
    },
  }
</script>

<style scoped>
  html {
  }
  #combineCourse{
  }
  /*页面*/
  @media screen and (max-width: 1025px) {
    html {
    }
  }
  /*媒体查询*/
</style>
