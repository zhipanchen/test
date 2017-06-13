<template>
  <div id="tchTeachingPlanPageTopBar" class="topBarDiv am-btn-group">
    <!--导航栏-->
    <button class="am-btn am-btn-success btn-active" style="margin-left: 5rem">教学计划</button>
    <router-link to="/eduAdmin/manage/examination/eduAdminEvaTeachingResult"><button class="am-btn am-btn-success">教务查看评教</button></router-link>
  </div>
</template>

<script>
    export default {
        name: 'tchTeachingPlanPageTopBar',
        data () {
            return {
                msg: ''
            }
        },
      mounted: function(){
        try{
          var buttons = document.getElementById("tchTeachingPlanPageTopBar").getElementsByTagName("button");
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
