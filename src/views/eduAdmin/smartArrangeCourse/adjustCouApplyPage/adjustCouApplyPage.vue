<template>
  <!--查看调课申请页面-->
  <div id="adjustCouApply">
    <topTitle></topTitle>
    <!--导航栏组件-->
    <topBar activeVue="#/eduAdmin/course/courseInfo/adjustCouApply"></topBar>
    <!--查看调课申请页面主组件-->
    <adjustCouApplyDiv></adjustCouApplyDiv>
  </div>
</template>

<script>
  import topTitle from './../../../../components/public/topTitle/topTitle.vue'
  import topBar from '../../../../components/public/couStaffTopBar/couStaffTopBar.vue'
  import adjustCouApplyDiv from '../../../../components/eduAdmin/smartArrangeCourse/adjustCouApplyPage/adjustCouApplyDiv/adjustCouApplyDiv.vue'
  export default {
    name: 'adjustCouApply',
    data () {
      return {

      }
    },
    components: {
      topTitle,
      topBar,
      adjustCouApplyDiv
    },
    mounted: function() {
//      dom加载后调整页面高度
      var dom = document.getElementById("adjustCouApply");
      dom.style.height = window.innerHeight *0.85 + "px";
    },
  }

</script>

<style scoped>
  html{

  }
  #adjustCouApply{

  }
  @media screen and (max-width:1025px) {
    html {

    }
  }
</style>
