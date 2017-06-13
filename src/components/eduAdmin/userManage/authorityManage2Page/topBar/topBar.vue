<template>
  <div id="authorityManage2TopBar" class="topBarDiv am-btn-group">
    <!--导航栏-->
    <router-link to="/eduAdmin/role/authorityMgmt1"><button class="am-btn am-btn-success" style="margin-left: 5rem">角色管理</button></router-link>
    <button class="am-btn am-btn-success btn-active">权限设置</button>
  </div>
</template>

<script>
    export default {
        name: 'authorityManage2TopBar',
        data () {
            return {
                msg: ''
            }
        },
      mounted: function(){
        try{
          var buttons = document.getElementById("authorityManage2TopBar").getElementsByTagName("button");
          var authorityList = JSON.parse(sessionStorage.getItem("authorityList"));
          for(var i=0;i<buttons.length;i++){
            buttons[i].style.display="none";
          }
          for(var j=0;j<authorityList.length;j++){
            if(authorityList[j] == "1"){
              buttons[0].style.display="inline";
            }else if(authorityList[j] == "2"){
              buttons[1].style.display="inline";
            }
          }
        }catch(e){}
      }
    }
</script>

<style scoped>
  html{
    font-size: 62.5%;
  }

  @media screen and (max-width: 1023px) {
    html {
      font-size: 56%;
    }
  }
</style>
