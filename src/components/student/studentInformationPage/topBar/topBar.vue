<template>
  <div id="stdInquireGradeBar" class="topBarDiv am-btn-group">
    <a :href="selfInfUrl">
      <button id="selfInfoButton" class="topBarButton am-btn am-btn-success btn-active">个人信息维护</button>
    </a>
    <a :href="changePasswordUrl">
      <button id="changePasswordButton" class="topBarButton am-btn am-btn-success">学生修改密码</button>
    </a>
  </div>
</template>

<script>
  export default {
    name: 'topBarDiv',
    data () {
      return {
        changePasswordUrl: '#/student/setting/changPassword',
        selfInfUrl:'#/student/setting/studentInformation',
        authorityList:null
      }
    },
    mounted: function () {
      try {
        var buttons = document.getElementById("stdInquireGradeBar").getElementByTagName("button");
        this.authorityList = JSON.parse(sessionStorage.getItem("authorityList"));
        for (var i = 0; i < buttons.length; i++) {
          buttons[i].style.display = "none";
        }
        for (var i = 0; i < this.authorityList.length; i++) {
          if (this.authorityList[i] == "50") {
            buttons[0].style.display = "block";
          } else if (this.authorityList[i] == "59") {
            buttons[1].style.display = "block";
          }
        }
      } catch (e) {
      }
    }
  }
</script>

<style lang="css" scoped>

  html {
    font-size: 16px;
  }
  #changePasswordButton {
    margin-left: 5rem;
  }
  @media screen and (max-width:1023px) {
    html {
      font-size: 9px;
    }
  }
</style>
