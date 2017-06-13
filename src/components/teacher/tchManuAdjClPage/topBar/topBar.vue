<template>
  <div id="tchManuAdjCl_topBar" class="topBarDiv am-btn-group">
    <a :href="makeupLessonUrl">
      <button id="makeupLessonBtn" class="am-btn am-btn-success">{{ makeupLessonBtn }}</button>
    </a>
    <a :href="adjustCourseUrl">
      <button id="adjustCourseBtn" class="am-btn am-btn-success btn-active">{{ adjustCourseBtn }}</button>
    </a>
    <a :href="stopCourseUrl">
      <button id="stopCourseBtn" class="am-btn am-btn-success">{{ stopCourseBtn }}</button>
    </a>
    <a :href="banAdjustUrl">
      <button id="banAdjustBtn" class="am-btn am-btn-success">{{ banAdjustBtn }}</button>
    </a>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        makeupLessonBtn: '补课申请',
        adjustCourseBtn: '调课申请',
        stopCourseBtn: '停课申请',
        banAdjustBtn: '禁排申请',
        makeupLessonUrl: '#/teacher/course/makeupClass',
        adjustCourseUrl: '#/teacher/course/tchManuAdjCl',
        stopCourseUrl: '#/teacher/course/stopClass',
        banAdjustUrl: '#/teacher/course/requirement',
        authorityList: ''
      }
    },
    mounted: function () {
      try{
        var buttons = document.getElementById("tchManuAdjCl_topBar").getElementsByTagName("button");
        this.authorityList = JSON.parse(sessionStorage.getItem("authorityList"));
        for (var i = 0; i < buttons.length; i++) {
          buttons[i].style.display = "none";
        }
        for (var i = 0; i < this.authorityList.length; i++) {
          if (this.authorityList[i] == "42") {
            buttons[0].style.display = "block";
          }else if (this.authorityList[i] == "41") {
            buttons[1].style.display = "block";
          }else if (this.authorityList[i] == "40") {
            buttons[2].style.display = "block";
          }else if (this.authorityList[i] == "38") {
            buttons[3].style.display = "block";
          }
        }
      }catch(e) {}
    },
    methods: {

    }
  }
</script>

<style lang="css" scoped>
  #makeupLessonBtn {
    margin-left: 5rem;
  }
</style>
