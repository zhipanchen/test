<template>
  <div>
    <div id="mngStdPageTopBar" class="topBarDiv am-btn-group">
      <!--导航栏-->
      <router-link to="/eduAdmin/baseSetting/person/eduResGroupMgmt"><button class="am-btn am-btn-success" style="margin-left: 5rem">教研组管理</button></router-link>
      <button class="am-btn am-btn-success btn-active">学生管理</button>
      <router-link to="/eduAdmin/baseSetting/person/eduAdminManageTch"><button class="am-btn am-btn-success">教师管理</button></router-link>
      <router-link to="/eduAdmin/baseSetting/person/eduAdminManageClass"><button class="am-btn am-btn-success">学生异动情况</button></router-link>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'mngStdPageTopBar',
        data () {
            return {
                msg: ''
            }
        },
      mounted: function(){
        try{
          var buttons = document.getElementById("mngStdPageTopBar").getElementsByTagName("button");
          var authorityList = JSON.parse(sessionStorage.getItem("authorityList"));
          for(var i=0;i<buttons.length;i++){
            buttons[i].style.display="none";
          }
          for(var j=0;j<authorityList.length;j++){
            if(authorityList[j] == "24"){
              buttons[0].style.display="inline";
            }else if(authorityList[j] == "23"){
              buttons[1].style.display="inline";
            }else if(authorityList[j] == "26"){
              buttons[2].style.display="inline";
            }else if(authorityList[j] == "64"){
              buttons[3].style.display="inline";
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
