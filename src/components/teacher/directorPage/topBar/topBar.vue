<template>
  <div id="teach_topBar" class="topBarDiv am-btn-group">
    <a href="#/teacher/teach/courseList">
      <button id="checkCouButton" class="topBarButton am-btn am-btn-success " >教学计划</button>
    </a>
    <a href="#/teacher/teach/director">
      <button  class="topBarButton am-btn am-btn-success btn-active" >督导反馈</button>
    </a>
    <a href="#/teacher/teach/normalSchedule">
      <button  class="topBarButton am-btn am-btn-success " >教师签到</button>
    </a>
  </div>
</template>

<script>
  export default {
    name: 'topBarDiv',
    data () {
      return {

        checkCouButton: '督导工作',
        arrInfoNum: '2',
        adjInfoNum: '0',
        manualCouUrl: '/teacher/tchManuAdjCl',
        sendApplyUrl: 'http://localhost:8080/',
        checkCouUrl: '',
        authorityList:''

      }
    },
    mounted:function(){
      try{
        var buttons=document.getElementById("teach_topBar").getElementsByTagName("button");
        this.authorityList=JSON.parse(sessionStorage.getItem("authorityList"));
        for(var i=0;i<buttons.length;i++){
          buttons[i].style.display="none";
        }
        for(var i=0;i<this.authorityList.length;i++){
          if(this.authorityList[i]=="36"){
            buttons[0].style.display="block";
          }else if(this.authorityList[i]=="52"){
            buttons[1].style.display="block";
          }else if(this.authorityList[i]=="37"){
            buttons[2].style.display="block";
          }
        }
      }catch(e){}
    },
    methods: {

    }
  }
</script>

<style lang="css" scoped>
@import '../../../../assets/css/external.css';

  html {
    font-size: 16px;
  }
  #checkCouButton {
    margin-left: 5rem;
  }

  @media screen and (max-width:1023px) {
    html {
      font-size: 9px;
    }
  }
</style>
