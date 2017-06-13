<template>
  <!--课程管理页面-->
  <div id="courseArrangeSetting">
    <topTitle></topTitle>
    <!--导航栏组件-->
    <topBar></topBar>
    <!--课程管理页面主组件-->
    <courseArrangeSettingDiv></courseArrangeSettingDiv>
  </div>
</template>

<script>
  import topTitle from './../../../../components/public/topTitle/topTitle.vue'
  import topBar from '../../../../components/eduAdmin/smartArrangeCourse/courArrangeSettingPage/topBar/topBar.vue'
  import courseArrangeSettingDiv from '../../../../components/eduAdmin/smartArrangeCourse/courArrangeSettingPage/couArrangeSettingDiv/couArrangeSettingDiv.vue'
  export default {
    name: 'courseArrangeSetting',
    data () {
      return {
        msg: ''
      }
    },
    components: {
      topTitle,
      topBar,
      courseArrangeSettingDiv,
    },
    mounted: function() {
//      dom加载后调整页面高度
      var dom = document.getElementById("courseArrangeSetting");
      dom.style.height = window.innerHeight *0.85 + "px";
    },
  }
</script>

<style scoped>
  html {
  }
  #courseArrangeSetting{
  }
  @media screen and (max-width: 1025px) {
    html {
    }
  }
</style>
