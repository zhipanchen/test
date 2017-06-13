<template>
  <div id="personInfo_topBar" class="topBarDiv am-btn-group">
    <a href="#/teacher/personInfo/basicMessage">
      <button id="checkCouButton" class="topBarButton am-btn am-btn-success btn-active" >个人信息</button>
    </a>
  </div>
</template>

<script>
  export default {
    name: 'topBarDiv',
    data () {
      return {

        checkCouButton: '个人信息',
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
        var buttons=document.getElementById("personInfo_topBar").getElementsByTagName("button");
        this.authorityList=JSON.parse(sessionStorage.getItem("authorityList"));
        for(var i=0;i<buttons.length;i++){
          buttons[i].style.display="none";
        }
        for(var i=0;i<this.authorityList.length;i++){
          if(this.authorityList[i]=="43"){
            buttons[0].style.display="block";
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
