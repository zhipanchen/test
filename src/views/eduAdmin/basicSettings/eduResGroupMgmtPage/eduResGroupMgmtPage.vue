<template>
  <!--教研组管理页面-->
  <div id="eduResearchGroupManagementPage">
    <topTitle></topTitle>
    <!--导航栏组件-->
    <topBar></topBar>
    <!--教研组管理页面主组件-->
    <eduResearchGroupManagementDiv></eduResearchGroupManagementDiv>
  </div>
</template>

<script>
  import topTitle from './../../../../components/public/topTitle/topTitle.vue'
  import topBar from '../../../../components/eduAdmin/basicSettings/eduResGroupMgmtPage/topBar/topBar.vue'
  import eduResearchGroupManagementDiv from '../../../../components/eduAdmin/basicSettings/eduResGroupMgmtPage/eduResGrpMgmtDiv/eduResGrpMgmtDiv.vue'
  export default {
    name: 'eduResearchGroupManagementPage',
    data () {
      return {
        msg: ''
      }
    },
    components: {
      topTitle,
      topBar,
      eduResearchGroupManagementDiv,
    },
    mounted: function() {
//      dom加载后调整页面高度
      var dom = document.getElementById("eduResearchGroupManagementPage");
      dom.style.height = window.innerHeight *0.85 + "px";
    },
  }
</script>

<style scoped>
  html {
  }
  #eduResearchGroupManagementPage{

  }
  @media screen and (max-width: 1025px) {
    html {
    }
  }
</style>
