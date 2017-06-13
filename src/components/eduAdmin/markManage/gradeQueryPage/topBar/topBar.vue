<template>
  <div id="gradeQuery_topBar" class="topBarDiv am-btn-group">
    <a :href="gradeCountUrl"><button id="gradeCountBtn" class="topBarButton am-btn am-btn-success">{{ gradeCountBtn }}</button></a>
    <a :href="gradeCheckUrl"><button id="gradeCheckBtn" class="topBarButton am-btn am-btn-success btn-active">{{ gradeCheckBtn }}</button></a>
    <a :href="gradeCancelUrl"><button id="gradeCancelBtn" class="topBarButton am-btn am-btn-success">{{ gradeCancelBtn }}</button></a>
  </div>
</template>

<script>
  export default {
    name: 'topBarDiv',
    data () {
      return {
        gradeCountBtn: '成绩统计',
        gradeCheckBtn: '成绩查询',
        gradeCancelBtn: '成绩撤销',
        gradeCountUrl: '#/eduAdmin/gradeManage/grade/gradeStat',
        gradeCheckUrl: '#/eduAdmin/gradeManage/grade/gradeQuery',
        gradeCancelUrl: '#/eduAdmin/gradeManage/grade/adminCancelGrade',
        authorityList: ''
      }
    },
    mounted: function () {
      try{
        var buttons = document.getElementById("gradeQuery_topBar").getElementsByTagName("button");
        this.authorityList = JSON.parse(sessionStorage.getItem("authorityList"));
        for (var i = 0; i < buttons.length; i++) {
          buttons[i].style.display = "none";
        }
        for (var i = 0; i < this.authorityList.length; i++) {
          if (this.authorityList[i] == "28") {
            buttons[0].style.display = "block";
          }else if (this.authorityList[i] == "29") {
            buttons[1].style.display = "block";
          }else if (this.authorityList[i] == "32") {
            buttons[2].style.display = "block";
          }
        }
      }catch(e) {}
    },
    methods: {
      
    }
  }
</script>

<style scoped>

  #gradeCountBtn {
    margin-left: 5rem;
  }
  @media screen and (max-width:1023px) {
    html {
      font-size: 9px;
    }
  }
</style>
