<template>
  <div id="noticeManage_topBar" class="topBarDiv am-btn-group">
    <a :href="noticeMgmtUrl"><button id="noticeMgmtBtn" class="topBarButton am-btn am-btn-success btn-active">{{ noticeMgmtBtn }}</button></a>
  </div>
</template>

<script>
  export default {
    name: 'topBarDiv',
    data () {
      return {
        noticeMgmtBtn: '公告管理',
        noticeMgmtUrl: '#/eduAdmin/information/noticeManage',
        authorityList: ''
      }
    },
    mounted: function () {
      try{
        var buttons = document.getElementById("noticeManage_topBar").getElementsByTagName("button");
        this.authorityList = JSON.parse(sessionStorage.getItem("authorityList"));
        for (var i = 0; i < buttons.length; i++) {
          buttons[i].style.display = "none";
        }
        for (var i = 0; i < this.authorityList.length; i++) {
          if (this.authorityList[i] == "19") {
            buttons[0].style.display = "block";
          }
        }
      }catch(e) {}
    }
  }
</script>

<style scoped>
  #noticeMgmtBtn {
    margin-left: 5rem;
  }

</style>
