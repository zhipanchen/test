<template>
  <div id="courseArrangeSetting_topBar" class="topBarDiv am-btn-group">
    <button id="topBarButton" class="am-btn am-btn-success" @click="hrefClick(1)">查看禁排申请</button>
    <button class="am-btn am-btn-success btn-active" @click="hrefClick(2)">排课课程设置</button>
    <button class="am-btn am-btn-success" @click="hrefClick(3)">教务合课</button>
    <button class="am-btn am-btn-success" @click="hrefClick(4)">排课结果课表</button>
  </div>
</template>

<script>
  export default {
    name: 'courseArrangeSetting_topBar',
    data () {
      return {
        msg: ''
      }
    },
    methods: {
      hrefClick: function (num) {
        if (num == 1) {
          location.href = "#/eduAdmin/course/courseOperation/banCouApply"
        } else if (num == 2) {
          location.href = "#/eduAdmin/course/courseOperation/couArrangeSetting"
        } else if (num == 3) {
          location.href = "#/eduAdmin/course/courseOperation/combineCourse"
        } else if (num == 4) {
          location.href = "#/eduAdmin/course/courseOperation/couArrangeTable"
        }
      }
    }
  }
</script>

<style scoped>
  html {
  }
  #topBarButton{
    margin-left: 5rem;
  }
  @media screen and (max-width: 1023px) {
    html {
    }
  }
</style>

