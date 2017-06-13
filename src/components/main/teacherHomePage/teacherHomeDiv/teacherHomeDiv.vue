<template>
  <div id="teacherHomeDiv">
    <div id="menuDiv"></div>
    <div id="pageDiv">
      <div id="firstDiv" class="pageDiv">
        <span class="pageSpan 2">
          课程管理
          <ul>
            <li><a href="#/">补课申请</a></li>
            <li><a href="#/">调课申请</a></li>
            <li><a href="#/">停课申请</a></li>
            <li><a href="#/">禁排申请</a></li>
          </ul>
        </span>
        <span class="pageSpan 2">
          教学管理
          <ul>
            <li><a href="#/">授课计划</a></li>
            <li><a href="#/">教学计划</a></li>
            <li><a href="#/">信息通知</a></li>
            <li><a href="#/">督导反馈</a></li>
          </ul>
        </span>
        <span class="pageSpan 2">
          班级管理
          <ul>
            <li><a href="#/">评教结果</a></li>
            <li><a href="#/">班级管理</a></li>
            <li><a href="#/">成绩录入</a></li>
          </ul>
        </span>
      </div>
      <div id="secondDiv" class="pageDiv">
        <span class="pageSpan 2">
          信息查看
          <ul>
            <li><a href="#/">上课列表</a></li>
            <li><a href="#/">个人信息</a></li>
          </ul>
        </span>
        <span class="pageSpan 2">
          组别管理
          <ul>
            <li><a href="#/">教研组管理</a></li>
          </ul>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'teacherHomeDiv',
    data () {
      return {
        msg: ''
      }
    },
    mounted: function() {
      var dom = document.getElementById("teacherHomeDiv");
      dom.style.minHeight = window.innerHeight*0.92 + "px";
    }
  }
</script>

<style scoped>
  #teacherHomeDiv {
    background-color: #F9F9F9;
    display: flex;
    border: thin solid whitesmoke;
    border-top: thin solid #f2f2f2;
  }
  #menuDiv{
    width: 15rem;
    background-color: #EEF3FA;
    border: thin solid #EEF3FA;
  }
  #pageDiv{
    width: 75%;
    height: 100%;
    padding-top: 5rem;
  }
  .pageDiv{
    display: flex;
    justify-content: space-around;
  }
  .pageSpan{
    border: thin solid #E9ECF2;
    border-radius: 0.2rem;
    width: 10rem;
    height: 7.5rem;
    margin: 0.5rem;
    background-color: #E9ECF2;
    text-align: center;
    padding-top: 0.5rem;
  }
  #secondDiv{
    margin-top: 3rem;
  }
  ul{
    margin: 0.5rem 0 0 0;
    padding: 0;
  }
  a{
    text-decoration: none;
    color: black;
  }
  a:hover{
    cursor: pointer;
    color: red;
  }
  @media screen and (max-width: 1025px) {
    html {
    }
  }
</style>
