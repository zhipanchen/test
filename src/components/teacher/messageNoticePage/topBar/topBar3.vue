<template>
  <div class="topBarDiv am-btn-group">
    <a href="#">
      <button id="checkCouButton" class="topBarButton am-btn am-btn-success " >授课计划</button>
    </a>
    <a href="#/teacher/teach/teachingPlan">
      <button  class="topBarButton am-btn am-btn-success " >教学计划</button>
    </a>
    <a href="#/teacher/teach/messageNotice">
      <button  class="topBarButton am-btn am-btn-success btn-active" >信息通知</button>
    </a>
    <a href="#/teacher/teach/director">
      <button  class="topBarButton am-btn am-btn-success " >督导反馈</button>
    </a>
  </div>
</template>

<script>
  export default {
    name: 'topBarDiv',
    data () {
      return {

        checkCouButton: '信息通知',
        arrInfoNum: '2',
        adjInfoNum: '0',
        manualCouUrl: '/teacher/tchManuAdjCl',
        sendApplyUrl: 'http://localhost:8080/',
        checkCouUrl: ''
      }
    },
    methods: {

    }
  }
</script>

<style lang="css" scoped>
@import '../../../../assets/css/external.css';

  html {
    font-size: 16px;
  }
  #checkCouButton {
    margin-left: 5rem;
  }

  @media screen and (max-width:1023px) {
    html {
      font-size: 9px;
    }
  }
</style>
