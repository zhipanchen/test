<template>
  <div id="salary_topBar" class="topBarDiv am-btn-group">
    <a :href="salaryMgmtUrl"><button id="salaryMgmtBtn" class="topBarButton am-btn am-btn-success btn-active">{{ salaryMgmtBtn }}</button></a>
    <a :href="salarySettingUrl"><button id="salarySettingBtn" class="topBarButton am-btn am-btn-success">{{ salarySettingBtn }}</button></a>
    <a :href="scheduleListUrl"><button id="scheduleListBtn" class="topBarButton am-btn am-btn-success">{{ scheduleListBtn }}</button></a>
  </div>
  </div>
</template>

<script>
  export default {
    name: 'topBarDiv',
    data () {
      return {
        salaryMgmtBtn: '薪酬单',
        salarySettingBtn: '薪酬管理',
        scheduleListBtn: '查看签到',
        salaryMgmtUrl: '#/eduAdmin/emolument/salary',
        salarySettingUrl: '#/eduAdmin/emolument/setPrice',
        scheduleListUrl: '#/eduAdmin/emolument/scheduleList',
        authorityList: ''
      }
    },
    mounted: function () {
      try{
        var buttons = document.getElementById("salary_topBar").getElementsByTagName("button");
        this.authorityList = JSON.parse(sessionStorage.getItem("authorityList"));
        for (var i = 0; i < buttons.length; i++) {
          buttons[i].style.display = "none";
        }
        for (var i = 0; i < this.authorityList.length; i++) {
          if (this.authorityList[i] == "5") {
            buttons[0].style.display = "block";
          }else if (this.authorityList[i] == "22") {
            buttons[1].style.display = "block";
          }else if (this.authorityList[i] == "66") {
            buttons[2].style.display = "block";
          }
        }
      }catch(e) {}
    }
  }
</script>

<style scoped>
  #salaryMgmtBtn {
    margin-left: 5rem;
  }

</style>
