<template>
  <div id="eduResearchGroupManagement_topBar" class="topBarDiv am-btn-group">
    <button id="topBarButton" class="am-btn am-btn-success btn-active" @click="hrefClick(1)">教研组管理</button>
    <button class="am-btn am-btn-success" @click="hrefClick(2)">学生管理</button>
    <button class="am-btn am-btn-success" @click="hrefClick(3)">教师管理</button>
    <button class="am-btn am-btn-success" @click="hrefClick(4)">学生异动情况</button>
  </div>
</template>

<script>
  export default {
    name: 'eduResearchGroupManagement_topBar',
    data () {
      return {
        msg: ''
      }
    },
    mounted: function() {
      try{
        var buttons = document.getElementById("eduResearchGroupManagement_topBar").getElementsByTagName("button");
        this.authorityList = JSON.parse(sessionStorage.getItem("authorityList"));
//        console.log(this.authorityList);
        for (var i = 0; i < buttons.length; i++) {
          buttons[i].style.display = "none";
        }
        for (var i = 0; i < this.authorityList.length; i++) {
          if(this.authorityList[i] == "24"){
            buttons[0].style.display = "block";
          }else if(this.authorityList[i] == "23"){
            buttons[1].style.display = "block";
          }else if(this.authorityList[i] == "26"){
            buttons[2].style.display = "block";
          }else if(this.authorityList[i] == "64"){
            buttons[3].style.display = "block";
          }
        }
      }catch(e){}
    },
//    权限控制导航显隐
    methods: {
      hrefClick: function (num) {
        if (num == 1) {
          location.href = "#/eduAdmin/baseSetting/person/eduResGroupMgmt"
        } else if (num == 2) {
          location.href = "#/eduAdmin/baseSetting/person/eduAdminManageStd"
        } else if (num == 3) {
          location.href = "#/eduAdmin/baseSetting/person/eduAdminManageTch"
        } else if (num == 4) {
          location.href = "#/eduAdmin/baseSetting/person/eduAdminManageClass"
        }
      }
//      路由跳转
    }
  }
</script>

<style scoped>
  html{

  }
  #topBarButton{
    margin-left: 5rem;
  }

  @media screen and (max-width: 1025px) {
    html {
    }
  }
</style>

