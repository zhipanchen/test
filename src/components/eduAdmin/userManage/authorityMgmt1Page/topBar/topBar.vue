<template>
  <div id="authorityMgmt1_topBar" class="topBarDiv am-btn-group">
    <a :href="authorityMgmt1Url"><button id="authorityMgmtBtn" class="topBarButton am-btn am-btn-success btn-active">{{ authorityMgmt1Btn }}</button></a>
    <a :href="authorityMgmt2Url"><button class="topBarButton am-btn am-btn-success">{{ authorityMgmt2Btn }}</button></a>
  </div>
</template>

<script>
  export default {
    name: 'topBarDiv',
    data () {
      return {
        authorityMgmt1Btn: '角色管理',
        authorityMgmt2Btn: '权限设置',
        authorityMgmt1Url: '#/eduAdmin/role/authorityMgmt1',
        authorityMgmt2Url: '#/eduAdmin/role/eduAdminAuthorityManage2',
        authorityList: ''
      }
    },
    mounted: function () {
      try{
        var buttons = document.getElementById("authorityMgmt1_topBar").getElementsByTagName("button");
        this.authorityList = JSON.parse(sessionStorage.getItem("authorityList"));
        for (var i = 0; i < buttons.length; i++) {
          buttons[i].style.display = "none";
        }
        for (var i = 0; i < this.authorityList.length; i++) {
          if (this.authorityList[i] == "1") {
            buttons[0].style.display = "block";
          }else if (this.authorityList[i] == "2") {
            buttons[1].style.display = "block";
          }
        }
      }catch(e) {}
    }
  }
</script>

<style lang="css" scoped>
  #authorityMgmtBtn {
    margin-left: 5rem;
  }
</style>
