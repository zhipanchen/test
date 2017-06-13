<template>
  <div id="adminCancelGrade_topBar" class="topBarDiv am-btn-group">
    <a :href="testManageUrl">
      <button id="test" class="topBarButton am-btn am-btn-success btn-active">{{ testManage }}</button>
    </a>
  </div>
</template>

<script>
  export default {
    name: 'topBarDiv',
    data () {
      return {
        testManage: '考务管理',
        testManageUrl: '#/eduAdmin/test/eduAdminManager',
        authorityList:null
      }
    },
    mounted: function () {
      try{
        var buttons = document.getElementById("adminCancelGrade_topBar").getElementByTagName("button");
        this.authorityList = JSON.parse(sessionStorage.getItem("authorityList"));
        for (var i = 0; i < buttons.length; i++) {
          buttons[i].style.display = "none";
        }
        for (var i = 0; i < this.authorityList.length; i++) {
          if (this.authorityList[i] == "10") {
            buttons[0].style.display = "block";
          }
        }
      }catch(e) {}
    }
  }
</script>

<style lang="css" scoped>

  html {
    font-size: 16px;
  }
  #test {
    margin-left: 5rem;
  }
  @media screen and (max-width:1023px) {
    html {
      font-size: 9px;
    }
  }
</style>
