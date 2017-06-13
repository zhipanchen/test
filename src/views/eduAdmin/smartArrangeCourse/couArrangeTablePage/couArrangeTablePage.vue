<template>
  <!--课程管理页面-->
  <div id="courseArrangeTable">
    <topTitle></topTitle>
    <!--导航栏组件-->
    <topBar></topBar>
    <courseArrangeTableDiv></courseArrangeTableDiv>
  </div>
</template>

<script>
  import topTitle from './../../../../components/public/topTitle/topTitle.vue'
  import topBar from '../../../../components/eduAdmin/smartArrangeCourse/couArrangeTablePage/topBar/topBar.vue'
  import courseArrangeTableDiv from '../../../../components/eduAdmin/smartArrangeCourse/couArrangeTablePage/couArrangeTableDiv/couArrangeTableDiv.vue'
  export default {
    name: 'courseArrangeTable',
    data () {
      return {
        msg: ''
      }
    },
    components: {
      topTitle,
      topBar,
      courseArrangeTableDiv,
    },
    mounted: function() {
//      dom加载后调整页面高度
      var dom = document.getElementById("courseArrangeTable");
      dom.style.height = window.innerHeight *0.85 + "px";
    },
  }
</script>

<style scoped>
  html {
  }
  #courseArrangeTable{
  }
  @media screen and (max-width: 1025px) {
    html {
    }
  }
</style>
