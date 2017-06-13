<template>
  <div class="topBarDiv am-btn-group">
    <a href="#/teacher/teach/courseList">
      <button id="checkCouButton" class="topBarButton am-btn am-btn-success " >教学计划</button>
    </a>
    <a href="#/teacher/teach/director">
      <button  class="topBarButton am-btn am-btn-success btn-active" >督导反馈</button>
    </a>
    <a href="#/teacher/teach/normalSchedule">
      <button  class="topBarButton am-btn am-btn-success " >教师签到</button>
    </a>
  </div>
</template>

<script>
  export default {
    name: 'topBarDiv',
    data () {
      return {

        checkCouButton: '督导工作',
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
