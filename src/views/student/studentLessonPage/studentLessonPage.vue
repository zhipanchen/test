<template>
  <!--查看调课申请页面-->
  <div id="myTeacherPage">
    <topTitle></topTitle>
    <topBar activeVue="#/eduAdmin/adjustCouApply"></topBar>
    <myLessonContent></myLessonContent>
  </div>
</template>

<script>
  import topTitle from './../../../components/public/topTitle/topTitle.vue'
  import topBar from '../../../components/student/studentLessonPage/topBar/topBar.vue'
  import myLessonContent from '../../../components/student/studentLessonPage/studentLessonContent/studentLessonContent.vue'
  export default {
    name: 'myTeacherPage',
    data () {
      return {

      }
    },
    components: {
      topTitle,
      topBar,
      myLessonContent
    }
  }

</script>

<style scoped>
  html {
    font-size: 100%;
  }
.choose{
  margin-top:1rem;
}
  @media screen and (max-width: 1023px) {
    html {
      font-size: 56%;
    }
  }
</style>
