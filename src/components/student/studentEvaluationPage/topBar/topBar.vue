<template>
  <div id="stdInquireGradeBar" class="topBarDiv am-btn-group">
    <a :href="studentEvaluationUrl">
      <button id="studentEvaluationButton" class="topBarButton am-btn am-btn-success btn-active">提交评教</button>
    </a>
  </div>
</template>

<script>
  export default {
    name: 'topBarDiv',
    data () {
      return {
        studentEvaluationUrl: '#/student/setting/studentEvaluation',
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
          if (this.authorityList[i] == "61") {
            buttons[0].style.display = "block";
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
