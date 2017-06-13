<template>
  <div id="evaTeachingResultPageTopBar" class="topBarDiv am-btn-group">
    <!--导航栏-->
    <router-link to="/eduAdmin/manage/examination/eduAdminTchTeachingPlan"><button class="am-btn am-btn-success" style="margin-left: 5rem">教学计划</button></router-link>
    <button class="am-btn am-btn-success btn-active">教务查看评教</button>
  </div>
</template>

<script>
    export default {
        name: 'evaTeachingResultPageTopBar',
        data () {
            return {
                msg: ''
            }
        },
      mounted: function(){
        try{
          var buttons = document.getElementById("evaTeachingResultPageTopBar").getElementsByTagName("button");
          var authorityList = JSON.parse(sessionStorage.getItem("authorityList"));
          for(var i=0;i<buttons.length;i++){
            buttons[i].style.display="none";
          }
          for(var j=0;j<authorityList.length;j++){
            if(authorityList[j] == "17"){
              buttons[0].style.display="inline";
            }else if(authorityList[j] == "62"){
              buttons[1].style.display="inline";
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
