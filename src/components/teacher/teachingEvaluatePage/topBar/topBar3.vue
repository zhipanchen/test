<template>
  <div id="class_topBar" class="topBarDiv am-btn-group">
    <a href="#/teacher/class/teachingEvaluate">
      <button id="checkCouButton" class="topBarButton am-btn am-btn-success  btn-active" >评教结果</button>
    </a>
    <a href="#/teacher/class/tchGradesInput">
      <button  class="topBarButton am-btn am-btn-success " >成绩录入</button>
    </a>
    <a href="#/teacher/class/classList">
    <button  class="topBarButton am-btn am-btn-success" >班级列表</button>
  </a>
  </div>
</template>

<script>
  export default {
    name: 'topBarDiv',
    data () {
      return {

        checkCouButton: '评教结果',
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
        var buttons=document.getElementById("class_topBar").getElementsByTagName("button");
        this.authorityList=JSON.parse(sessionStorage.getItem("authorityList"));
        for(var i=0;i<buttons.length;i++){
          buttons[i].style.display="none";
        }
        for(var i=0;i<this.authorityList.length;i++){
          if(this.authorityList[i]=="63"){
            buttons[0].style.display="block";
          }else if(this.authorityList[i]=="33"){
            buttons[1].style.display="block";
          }else if(this.authorityList[i]=="54"){
            buttons[1].style.display="block";
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
