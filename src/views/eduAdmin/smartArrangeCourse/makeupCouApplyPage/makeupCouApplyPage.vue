<template>
  <!--查看补课申请页面-->
  <div id="makeupCouApply">
    <topTitle></topTitle>
    <!--导航栏组件-->
    <topBar activeVue="#/eduAdmin/course/courseInfo/makeupCouApply"></topBar>
    <!--查看页面主组件-->
    <makeupCouApplyDiv></makeupCouApplyDiv>
  </div>
</template>

<script>
  import topTitle from './../../../../components/public/topTitle/topTitle.vue'
  import topBar from '../../../../components/public/couStaffTopBar/couStaffTopBar.vue'
  import makeupCouApplyDiv from '../../../../components/eduAdmin/smartArrangeCourse/makeupCouApplyPage/makeupCouApplyDiv/makeupCouApplyDiv.vue'
  export default {
    name: 'makeupCouApply',
    data () {
      return {

      }
    },
    mounted: function() {
//      dom加载后调整页面高度
      var dom = document.getElementById("makeupCouApply");
      dom.style.height = window.innerHeight *0.85 + "px";
    },
    components: {
      topTitle,
      topBar,
      makeupCouApplyDiv
    }
  }

</script>

<style scoped>
  html{
  }
  #makeupCouApply{

  }
  @media screen and (max-width:1025px) {
    html {
    }
  }
</style>
