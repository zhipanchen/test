<template>
  <div  id="course_topBar" class="topBarDiv am-btn-group">
    <a href="#/teacher/course/makeupClass">
      <button id="checkCouButton" class="topBarButton am-btn am-btn-success " @click="checkCouClick">补课申请</button>
    </a>
    <a href="#/teacher/course/tchManuadjCl">
      <button  class="topBarButton am-btn am-btn-success " >调课申请</button>
    </a>
    <a href="#/teacher/course/stopClass">
      <button  class="topBarButton am-btn am-btn-success btn-active" @click="checkCouClick">{{ checkCouButton }}</button>
    </a>
    <a href="#/teacher/course/requirement">
      <button  class="topBarButton am-btn am-btn-success " >禁排申请</button>
    </a>
  </div>
</template>

<script>
  export default {
    name: 'topBarDiv',
    data () {
      return {

        checkCouButton: '停课申请',
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
        var buttons=document.getElementById("course_topBar").getElementsByTagName("button");
        this.authorityList=JSON.parse(sessionStorage.getItem("authorityList"));
        for(var i=0;i<buttons.length;i++){
          buttons[i].style.display="none";
        }
        for(var i=0;i<this.authorityList.length;i++){
          if(this.authorityList[i]=="42"){
            buttons[0].style.display="block";
          }else if(this.authorityList[i]=="41"){
            buttons[1].style.display="block";
          }else if(this.authorityList[i]=="40"){
            buttons[2].style.display="block";
          }else if(this.authorityList[i]=="38"){
            buttons[3].style.display="block";
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
