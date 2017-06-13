<template>
  <!--查看课表页面-->
    <div id="checkCourse">
      <topTitle></topTitle>
      <!--导航栏组件-->
      <topBar activeVue="#/eduAdmin/course/courseInfo/checkCourse"></topBar>
      <!--查看课表页面主组件-->
      <checkCourseDiv></checkCourseDiv>
    </div>
</template>

<script>
    import topTitle from './../../../../components/public/topTitle/topTitle.vue'
    import topBar from '../../../../components/public/couStaffTopBar/couStaffTopBar.vue'
    import checkCourseDiv from '../../../../components/eduAdmin/smartArrangeCourse/checkCoursePage/checkCourseDiv/checkCourseDiv.vue'
    export default {
        name: 'checkCourse',
        data () {
            return {

            }
        },
        components: {
            topTitle,
            topBar,
            checkCourseDiv
        },
        mounted: function() {
            var dom = document.getElementById("checkCourse");
            dom.style.height = window.innerHeight *0.85 + "px";
        },
    }

</script>

<style scoped>
    html{

    }
    @media screen and (max-width:1025px) {
        html {
        }
    }
</style>
