<template>
  <!--教材管理页面-->
  <div id="textbookManagement">
    <topTitle></topTitle>
    <!--导航栏组件-->
    <topBar></topBar>
    <!--教材管理页面主组件-->
    <textbookManagementDiv></textbookManagementDiv>
  </div>
</template>

<script>
  import topTitle from './../../../../components/public/topTitle/topTitle.vue'
  import topBar from '../../../../components/eduAdmin/basicSettings/textbookMgmtPage/topBar/topBar.vue'
  import textbookManagementDiv from '../../../../components/eduAdmin/basicSettings/textbookMgmtPage/textbookMgmtDiv/textbookMgmtDiv.vue'
  export default {
    name: 'textbookManagement',
    data () {
      return {
        msg: ''
      }
    },
    mounted: function() {
//      dom加载后调整页面高度
      var dom = document.getElementById("textbookManagement");
      dom.style.height = window.innerHeight *0.78 + "px";
    },
    components: {
      topTitle,
      topBar,
      textbookManagementDiv,
    },
  }
</script>

<style scoped>
  html {
  }
  #textbookManagement{
  }
  @media screen and (max-width: 1025px) {
    html {
    }
  }
</style>
