<template>
  <div id="tchCheckTimetable_topBar" class="topBarDiv am-btn-group">
    <a :href="courseMgmtUrl">
      <button id="courseMgmtBtn" class="topBarButton am-btn am-btn-success btn-active">{{ courseMgmtBtn }}</button>
    </a>
    <a :href="teacherTestUrl">
      <button id="teacherTestBtn" class="topBarButton am-btn am-btn-success">{{ teacherTestBtn }}</button>
    </a>
    <a :href="tchResearchUrl">
      <button id="tchResearchBtn" class="topBarButton am-btn am-btn-success">{{ tchResearchBtn }}</button>
    </a>
  </div>
</template>

<script>
  export default {
    name: 'topBarDiv',
    data () {
      return {
        courseMgmtBtn: '教师课表',
        teacherTestBtn: '查看考场',
        tchResearchBtn: '查看课酬',
        courseMgmtUrl: '#/teacher/classInfo/tchCheckTimetable',
        teacherTestUrl: '#/teacher/classInfo/teacherTestInfo',
        tchResearchUrl: '#/teacher/classInfo/tchCheckSalary',
        authorityList: ''
      }
    },
    mounted: function () {
      try{
        var buttons = document.getElementById("tchCheckTimetable_topBar").getElementsByTagName("button");
        this.authorityList = JSON.parse(sessionStorage.getItem("authorityList"));
        for (var i = 0; i < buttons.length; i++) {
          buttons[i].style.display = "none";
        }
        for (var i = 0; i < this.authorityList.length; i++) {
          if (this.authorityList[i] == "39") {
            buttons[0].style.display = "block";
          }else if (this.authorityList[i] == "25") {
            buttons[1].style.display = "block";
          }else if (this.authorityList[i] == "35") {
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
@import '../../../../assets/css/external.css';

  html {
    font-size: 16px;
  }
  #courseMgmtBtn {
    margin-left: 5rem;
  }
/*  .topBarButton,.topBarButton:active{
    display: block;
    font-weight: bold;
    color: white;
    background-color: forestgreen;
    text-align: center;
    font-size: 1rem;
    padding: 2rem;
    border: none;
    outline: none;
  }
  .topBarButton:hover {
    background-color: limegreen;
    cursor: pointer;
  }*/
  /*#queryA{
    background-color: limegreen;
  }*/
  @media screen and (max-width:1023px) {
    html {
      font-size: 9px;
    }
  }
</style>
