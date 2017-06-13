<template>
  <!--教室管理页面-->
  <div id="classroomManagement">
    <topTitle></topTitle>
    <!--导航栏组件-->
    <topBar></topBar>
    <!--教室管理页面主组件-->
    <classroomManagementDiv></classroomManagementDiv>
  </div>
</template>

<script>
  import topTitle from './../../../../components/public/topTitle/topTitle.vue'
  import topBar from '../../../../components/eduAdmin/basicSettings/classroomMgmtPage/topBar/topBar.vue'
  import classroomManagementDiv from '../../../../components/eduAdmin/basicSettings/classroomMgmtPage/classroomMgmtDiv/classroomMgmtDiv.vue'
  export default {
    name: 'classroomManagement',
    data () {
      return {
        msg: ''
      }
    },
    components: {
      topTitle,
      topBar,
      classroomManagementDiv,
    },
    mounted: function() {
//      dom加载后调整页面高度
      var dom = document.getElementById("classroomManagement");
      dom.style.minHeight = window.innerHeight *0.85 + "px";
    },
  }
</script>

<style scoped>
  html {
  }
  #classroomManagement{

  }
  @media screen and (max-width: 1025px) {
    html {
    }
  }
</style>
