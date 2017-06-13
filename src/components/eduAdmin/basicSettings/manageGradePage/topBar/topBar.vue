<template>
  <div id="mngGradePageTopBar" class="topBarDiv am-btn-group">
    <!--导航栏-->
    <router-link to="/eduAdmin/baseSetting/resource/textbookMgmt"><button class="am-btn am-btn-success" style="margin-left: 5rem">教材管理</button></router-link>
    <button class="am-btn am-btn-success btn-active">年级管理</button>
    <router-link to="/eduAdmin/baseSetting/resource/courseTypeMgmt"><button class="am-btn am-btn-success">课程类型管理</button></router-link>
    <router-link to="/eduAdmin/baseSetting/resource/classroomMgmt"><button class="am-btn am-btn-success">教室管理</button></router-link>
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
          var buttons = document.getElementById("mngGradePageTopBar").getElementsByTagName("button");
          var authorityList = JSON.parse(sessionStorage.getItem("authorityList"));
          for(var i=0;i<buttons.length;i++){
            buttons[i].style.display="none";
          }
          for(var j=0;j<authorityList.length;j++){
            if(authorityList[j] == "27"){
              buttons[0].style.display="inline";
            }else if(authorityList[j] == "21"){
              buttons[1].style.display="inline";
            }else if(authorityList[j] == "65"){
              buttons[2].style.display="inline";
            }else if(authorityList[j] == "20"){
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
