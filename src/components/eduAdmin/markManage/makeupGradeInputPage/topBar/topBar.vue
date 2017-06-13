<template>
  <div id="makeupGradeInput_topBar" class="topBarDiv am-btn-group">
    <a :href="makeupExamUrl"><button id="makeupExamBtn" class="topBarButton am-btn am-btn-success">{{ makeupExamBtn }}</button></a>
    <a :href="makeupInputUrl"><button id="makeupInputBtn" class="topBarButton am-btn am-btn-success btn-active">{{ makeupInputBtn }}</button></a>
  </div>
</template>

<script>
  export default {
    name: 'topBarDiv',
    data () {
      return {
        makeupExamBtn: '补考成绩管理',
        makeupInputBtn: '补考成绩录入',
        makeupExamUrl: '#/eduAdmin/gradeManage/makeupExam/makeupExamAdmin',
        makeupInputUrl: '#/eduAdmin/gradeManage/makeupExam/makeupGradeInput',
        authorityList: ''
      }
    },
    mounted: function () {
      try{
        var buttons = document.getElementById("makeupGradeInput_topBar").getElementsByTagName("button");
        this.authorityList = JSON.parse(sessionStorage.getItem("authorityList"));
        for (var i = 0; i < buttons.length; i++) {
          buttons[i].style.display = "none";
        }
        for (var i = 0; i < this.authorityList.length; i++) {
          if (this.authorityList[i] == "30") {
            buttons[0].style.display = "block";
          }else if (this.authorityList[i] == "31") {
            buttons[1].style.display = "block";
          }
        }
      }catch(e) {}
    }
  }
</script>

<style scoped>
  #makeupExamBtn {
    margin-left: 5rem;
  }
</style>
