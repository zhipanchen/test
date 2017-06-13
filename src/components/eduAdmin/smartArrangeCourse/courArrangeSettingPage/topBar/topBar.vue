<template>
  <div id="courseArrangeSetting_topBar" class="topBarDiv am-btn-group">
    <button id="topBarButton" class="am-btn am-btn-success" @click="hrefClick(1)">查看禁排申请</button>
    <button class="am-btn am-btn-success btn-active" @click="hrefClick(2)">排课课程设置</button>
    <button class="am-btn am-btn-success" @click="hrefClick(3)">合课设置</button>
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
    mounted: function() {
      try{
        var buttons = document.getElementById("courseArrangeSetting_topBar").getElementsByTagName("button");
        this.authorityList = JSON.parse(sessionStorage.getItem("authorityList"));
//        console.log(this.authorityList);
        for (var i = 0; i < buttons.length; i++) {
          buttons[i].style.display = "none";
        }
        for (var i = 0; i < this.authorityList.length; i++) {
          if(this.authorityList[i] == "8"){
            buttons[0].style.display = "block";
          }else if(this.authorityList[i] == "14"){
            buttons[1].style.display = "block";
          }else if(this.authorityList[i] == "9"){
            buttons[2].style.display = "block";
          }else if(this.authorityList[i] == "7"){
            buttons[3].style.display = "block";
          }
        }
      }catch(e){}
    },
//    权限控制导航显隐
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
//      路由跳转
    }
  }
</script>

<style scoped>
  html {
  }
  #topBarButton{
    margin-left: 5rem;
  }
  @media screen and (max-width: 1025px) {
    html {
    }
  }
</style>

