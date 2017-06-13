<template>
  <!--禁止排课申请页面-->
  <div id="banCouApply">
    <topTitle></topTitle>
    <!--导航栏组件-->
    <topBar activeVue="#/eduAdmin/banCouApply"></topBar>
    <!--禁止排课申请页面主组件-->
    <banCouApplyDiv></banCouApplyDiv>
  </div>
</template>

<script>
  import topTitle from './../../../../components/public/topTitle/topTitle.vue'
  import topBar from '../../../../components/eduAdmin/smartArrangeCourse/banCouApplyPage/topBar/topBar.vue'
  import banCouApplyDiv from '../../../../components/eduAdmin/smartArrangeCourse/banCouApplyPage/banCouApplyDiv/banCouApplyDiv.vue'
  export default {
    name: 'banCouApply',
    data () {
      return {

      }
    },
    components: {
      topTitle,
      topBar,
      banCouApplyDiv
    },
    mounted: function() {
//      dom加载后调整页面高度
      var dom = document.getElementById("banCouApply");
      dom.style.height = window.innerHeight * 0.85 + "px";
    }
  }

</script>

<style scoped>
  html{
  }
  #banCouApply{
  }
  @media screen and (max-width:1025px) {
    html {
    }
  }
</style>
