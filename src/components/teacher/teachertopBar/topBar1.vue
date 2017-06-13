<template>
  <div class="topBarDiv am-btn-group">
    <a :href="teacherCourseUrl">
      <button id="manualCouButton" class="topBarButton am-btn am-btn-success" @click="manualCouClick">{{ teacherCourse }}</button>
    </a>
    <a :href="teacherTestUrl">
      <button class="topBarButton am-btn am-btn-success btn-active" @click="manualCouClick">{{ teacherTest }}</button>
    </a>
    <a :href="teacherRewardUrl">
      <button class="topBarButton am-btn am-btn-success" @click="manualCouClick">{{ teacherReward }}</button>
    </a>
  </div>
</template>

<script>
  export default {
    name: 'topBarDiv',
    data () {
      return {
        teacherCourse: '教师课表',
        teacherTest: '查看考场',
        teacherReward: '查看课酬',
        teacherCourseUrl: 'index.html#'+'teacher/classInfo/tchCheckTimetable',
        teacherTestUrl: 'index.html#'+'teacher/classInfo/teacherTestInfo',
        teacherRewardUrl: 'index.html#'+'teacher/classInfo/tchCheckSalary'
      }
    },
    methods: {

    }
  }
</script>

<style lang="css" scoped>

  html {
    font-size: 16px;
  }
  #manualCouButton {
    margin-left: 5rem;
  }
 /*   .topBarButton,.topBarButton:active{
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
    }
  #queryA{
    background-color: limegreen;
  }*/
  @media screen and (max-width:1023px) {
    html {
      font-size: 9px;
    }
  }
</style>
