<template>
  <div id="couStaffTopBar" class="topBarDiv am-btn-group">
      <button id="checkCouButton" class="am-btn am-btn-success" @click="checkCouClick">
        {{ checkCouButton }}
        <!--<p class="NullInfoP"></p>-->
      </button>
      <button id="adjApplyButton" class="am-btn am-btn-success" @click="adjApplyClick">
        {{ adjApplyButton }}
        <!--<p v-if="arrInfoNum != 0" class="NewInfoP">{{ arrInfoNum }}</p>-->
        <!--<p v-else class="NullInfoP">0</p>-->
      </button>
      <button id="makeupCouApplyButton" class="am-btn am-btn-success" @click="makeupCouApplyClick">
        {{ makeupCouApplyButton }}
        <!--<p v-if="adjInfoNum != 0" class="NewInfoP">{{ adjInfoNum }}</p>-->
        <!--<p v-else class="NullInfoP">0</p>-->
      </button>
      <button id="suspendCouApplyButton" class="am-btn am-btn-success" @click="suspendCouApplyClick">
        {{ suspendCouApply }}
        <!--<p class="NullInfoP"></p>-->
      </button>
  </div>
</template>

<script>
  export default {
    name: 'couStaffTopBar',
    data () {
      return {
        checkCouButton: '查看当前课表',
        adjApplyButton: '查看调课申请',
        makeupCouApplyButton: '查看补课申请',
        suspendCouApply: '查看停课申请',
        arrInfoNum: '2',//预留实时获取新消息提示
        adjInfoNum: '4',//预留实时获取新消息提示
        suspendCouApplyUrl:'#/eduAdmin/course/courseInfo/suspendCouApply',
        makeupCouApplyUrl: '#/eduAdmin/course/courseInfo/makeupCouApply',
        adjApplyUrl: '#/eduAdmin/course/courseInfo/adjustCouApply',
        checkCouUrl: '#/eduAdmin/course/courseInfo/checkCourse'
      }
    },
    props:['activeVue'],//当前页面
    created: function(){

    },
    mounted: function(){
      try{
        var buttons = document.getElementById("couStaffTopBar").getElementsByTagName("button");
        this.authorityList = JSON.parse(sessionStorage.getItem("authorityList"));
//        console.log(this.authorityList);
        for (var i = 0; i < buttons.length; i++) {
          buttons[i].style.display = "none";
        }
        for (var i = 0; i < this.authorityList.length; i++) {
          if(this.authorityList[i] == "6"){
            buttons[0].style.display = "block";
          }else if(this.authorityList[i] == "12"){
            buttons[1].style.display = "block";
          }else if(this.authorityList[i] == "13"){
            buttons[2].style.display = "block";
          }else if(this.authorityList[i] == "11"){
            buttons[3].style.display = "block";
          }
        }
      }catch(e){};
//    权限控制导航显隐
      if(this.activeVue == this.checkCouUrl) {
        var checkCouButton = document.getElementById('checkCouButton');
        checkCouButton.className += " btn-active";
      }
      if(this.activeVue == this.adjApplyUrl) {
        var adjApplyButton = document.getElementById('adjApplyButton');
        adjApplyButton.className += " btn-active";
      }
      if(this.activeVue == this.makeupCouApplyUrl) {
        var makeupCouApplyButton = document.getElementById('makeupCouApplyButton');
        makeupCouApplyButton.className += " btn-active";
      }
      if(this.activeVue == this.suspendCouApplyUrl) {
        var suspendCouApplyButton = document.getElementById('suspendCouApplyButton');
        suspendCouApplyButton.className += " btn-active";
      }
    },//加载页面后触发钩子，根据当前页面url进行按钮变色
    methods: {
//      跳转到禁止排课设置页面
      checkCouClick: function () {
        location.href = this.checkCouUrl;
      },
//      跳转到查看排课申请页面
      adjApplyClick: function () {
        location.href = this.adjApplyUrl;
      },
//      跳转到查看调课申请页面
      makeupCouApplyClick: function () {
        location.href = this.makeupCouApplyUrl;
      },
//      跳转到查看课表设置页面
      suspendCouApplyClick: function () {
        location.href = this.suspendCouApplyUrl;
      }
    }
  }
</script>

<style scoped>
  html{
  }
  #couStaffTopBar{
    /*页面*/
  }
  #checkCouButton{
    margin-left: 5rem;
  }
  @media screen and (max-width:1025px) {
    html {
    }
  }
</style>
