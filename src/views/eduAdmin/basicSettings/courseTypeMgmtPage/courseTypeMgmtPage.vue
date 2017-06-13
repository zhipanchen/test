<template>
  <!--课程类型维护页面-->
  <div id="courseTypeManagement">
    <topTitle></topTitle>
    <!--导航栏组件-->
    <topBar></topBar>
    <!--主组件-->
    <courseTypeManagementDiv></courseTypeManagementDiv>
  </div>
</template>

<script>
  import topTitle from './../../../../components/public/topTitle/topTitle.vue'
  import topBar from '../../../../components/eduAdmin/basicSettings/courseTypeMgmtPage/topBar/topBar.vue'
  import courseTypeManagementDiv from '../../../../components/eduAdmin/basicSettings/courseTypeMgmtPage/courseTypeMgmtDiv/courseTypeMgmtDiv.vue'
  export default {
    name: 'courseTypeManagement',
    data () {
      return {
        msg: ''
      }
    },
    components: {
      topTitle,
      topBar,
      courseTypeManagementDiv,
    },
    mounted: function() {
//      dom加载后调整页面高度
      var dom = document.getElementById("courseTypeManagement");
      dom.style.minHeight = window.innerHeight *0.85 + "px";
    },
  }
</script>

<style scoped>
  html {
  }
  #courseTypeManagement{

  }
  @media screen and (max-width: 1025px) {
    html {
    }
  }
</style>
