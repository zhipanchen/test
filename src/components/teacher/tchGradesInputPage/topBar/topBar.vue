<template>
  <div id="tchGradesInput_topBar" class="topBarDiv am-btn-group">
    <a :href="teachingAssessUrl"><button id="teachingAssessBtn" class="topBarButton am-btn am-btn-success">{{ teachingAssessBtn }}</button></a>
    <a :href="gradesInputUrl"><button id="gradesInputBtn" class="topBarButton am-btn am-btn-success btn-active">{{ gradesInputBtn }}</button></a>
    <a :href="classMgmtUrl"><button id="classMgmtBtn" class="topBarButton am-btn am-btn-success">{{ classMgmtBtn }}</button></a>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        teachingAssessBtn: '评教结果',
        gradesInputBtn: '成绩录入',
        classMgmtBtn: '班级列表',
        teachingAssessUrl: '#/teacher/class/teachingEvaluate',
        gradesInputUrl: '#/teacher/class/tchGradesInput',
        classMgmtUrl: '#/teacher/class/classList',
        authorityList: ''
      }
    },
    mounted: function () {
      try{
        var buttons = document.getElementById("tchGradesInput_topBar").getElementsByTagName("button");
        this.authorityList = JSON.parse(sessionStorage.getItem("authorityList"));
        for (var i = 0; i < buttons.length; i++) {
          buttons[i].style.display = "none";
        }
        for (var i = 0; i < this.authorityList.length; i++) {
          if (this.authorityList[i] == "63") {
            buttons[0].style.display = "block";
          }else if (this.authorityList[i] == "33") {
            buttons[1].style.display = "block";
          }else if (this.authorityList[i] == "54") {
            buttons[2].style.display = "block";
          }
        }
      }catch(e) {}
    },
    methods: {
      
    }
  }
</script>

<style lang="css" scoped>
  #teachingAssessBtn {
    margin-left: 5rem;
  }

</style>
