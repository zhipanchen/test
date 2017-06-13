<template>
  <div id="supervisorManagePageTopBar" class="topBarDiv am-btn-group">
    <!--导航栏-->
    <router-link to="/eduAdmin/manage/plan/eduAdminEduPlan"><button class="am-btn am-btn-success" style="margin-left: 5rem">培养方案</button></router-link>
    <router-link to="/eduAdmin/manage/plan/eduAdminTeachProcess"><button class="am-btn am-btn-success">教学进度</button></router-link>
    <button class="am-btn am-btn-success btn-active">教务管理督导</button>
  </div>
</template>

<script>
    export default {
        name: 'supervisorManagePageTopBar',
        data () {
            return {
                msg: ''
            }
        },
      mounted: function(){
        try{
          var buttons = document.getElementById("supervisorManagePageTopBar").getElementsByTagName("button");
          var authorityList = JSON.parse(sessionStorage.getItem("authorityList"));
          for(var i=0;i<buttons.length;i++){
            buttons[i].style.display="none";
          }
          for(var j=0;j<authorityList.length;j++){
            if(authorityList[j] == "15"){
              buttons[0].style.display="inline";
            }else if(authorityList[j] == "16"){
              buttons[1].style.display="inline";
            }else if(authorityList[j] == "34"){
              buttons[2].style.display="inline";
            }
          }
        }catch(e){}
      }
    }
</script>

<style scoped>
    html {
        font-size: 100%;
    }

    @media screen and (max-width: 1023px) {
        html {
            font-size: 56%;
        }
    }
</style>
