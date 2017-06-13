<template>
  <div id="textbookManagementDiv">
    <div class="dropDown">
      <div id="fiveYearDiv">
        <button class="amButtom" @click="fiveYearClick"><img id="fiveYearArrow" class="iconImg" :src="icon2"><span class="subtitle">五年制</span></button>
        <!--按钮实现点击显示或隐藏-->
        <table id="fiveYearTable" v-show="fiveYearTable">
          <tr>
            <td>年级</td>
            <td>教材名称</td>
            <td>所用课程</td>
            <td>课程编码</td>
            <td>作者</td>
            <td>出版社</td>
            <td>出版时间</td>
            <td>ISBN码</td>
          </tr>
          <tr v-for="fiveTextbook in fiveTextbooks">
            <td>{{ fiveTextbook.gradeName }}</td>
            <td>{{ fiveTextbook.textbookName }}</td>
            <td>{{ fiveTextbook.courseName }}</td>
            <td>{{ fiveTextbook.courseId }}</td>
            <td>{{ fiveTextbook.author }}</td>
            <td>{{ fiveTextbook.publisher }}</td>
            <td>{{ fiveTextbook.pubtime }}</td>
            <td>{{ fiveTextbook.isbn }}</td>
          </tr>
        </table>
      </div>
      <div id="threeYearDiv">
        <button class="amButtom" @click="threeYearClick"><img id="threeYearArrow" class="iconImg" :src="icon1"><span class="subtitle">三年制</span></button>
        <table id="threeYearTable" v-show="threeYearTable">
          <tr>
            <td>年级</td>
            <td>教材名称</td>
            <td>所用课程</td>
            <td>课程编码</td>
            <td>作者</td>
            <td>出版社</td>
            <td>出版时间</td>
            <td>ISBN码</td>
          </tr>
          <tr v-for="threeTextbook in threeTextbooks">
            <td>{{ threeTextbook.gradeName }}</td>
            <td>{{ threeTextbook.textbookName }}</td>
            <td>{{ threeTextbook.courseName }}</td>
            <td>{{ threeTextbook.courseId }}</td>
            <td>{{ threeTextbook.author }}</td>
            <td>{{ threeTextbook.publisher }}</td>
            <td>{{ threeTextbook.pubtime }}</td>
            <td>{{ threeTextbook.isbn }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'textbookManagementDiv',
    data () {
      return {
        icon1:require('../../../../../assets/images/icon1.png'),
        icon2:require('../../../../../assets/images/icon2.png'),
        fiveArrow: true,
//        五年制教材下拉箭头，初始为下拉显示
        threeArrow: false,
//        三年制教材下拉箭头，初始为下拉隐藏
        fiveYearTable: true,
//        五年制教材下拉内容，初始为下拉显示
        threeYearTable: false,
//        三年制教材下拉内容，初始为下拉隐藏
        fiveTextbooks: [
        ],
//        五年制教材信息
        threeTextbooks: [
        ],
//        三年制教材信息
      }
    },
    beforeMount: function() {
//      this.$http.post('../testPhp/textbookManagement.php',{},{
      this.$http.post('./textbookManage/getTextbookInfo',{},{
        "Content-Type":"application/json"
      }).then(function(response){
        console.log("获取教材:");
        console.log(response);
        var data = response.body;
        var fiveYears = [];
        var threeYears = [];
        var fiveBuffer = [];
        var threeBuffer = [];
        function sortNumber(a,b) {
          return a - b
        }
//        排序规则，从小到大
        for(var i = 0;i < data.textbookList.length;i++){
          if(data.textbookList[i].schoolYearType == "3"){
            this.threeTextbooks.push(data.textbookList[i]);
          }else{
            this.fiveTextbooks.push(data.textbookList[i]);
          }
        }
//        保存无序的教材信息
        console.log(this.fiveTextbooks);
        console.log(this.threeTextbooks);
        for (var i = 0; i < this.fiveTextbooks.length; i++) {
//          循环获取年级
          var isExist = false;
          for (var n = 0; n < fiveYears.length; n++) {
//            循环判断是否重复
            if(this.fiveTextbooks[i].gradeName == fiveYears[n]){
              isExist = true;
            }
          }
          if(!isExist){
            fiveYears.push(this.fiveTextbooks[i].gradeName);
          }
        }
        fiveYears = fiveYears.sort(sortNumber);
//        对年级进行排序
        for (var i = 0; i < fiveYears.length; i++) {
//          根据年级依次重新排序教材
          for (var n = 0; n < this.fiveTextbooks.length; n++) {
            if(this.fiveTextbooks[n].gradeName == fiveYears[i]){
              fiveBuffer.push(this.fiveTextbooks[n]);
            }
          }
        }
        this.fiveTextbooks = fiveBuffer;
//        将排序好的教材保存显示

        for (var i = 0; i < this.threeTextbooks.length; i++) {
          var isExist = false;
          for (var n = 0; n < threeYears.length; n++) {
            if(this.threeTextbooks[i].gradeName == threeYears[n]){
              isExist = true;
            }
          }
          if(!isExist){
            threeYears.push(this.threeTextbooks[i].gradeName);
          }
        }
        threeYears = threeYears.sort(sortNumber);
        for (var i = 0; i < threeYears.length; i++) {
          for (var n = 0; n < this.threeTextbooks.length; n++) {
            if(this.threeTextbooks[n].gradeName == threeYears[i]){
              threeBuffer.push(this.threeTextbooks[n]);
            }
          }
        }
        this.threeTextbooks = threeBuffer;

      },function(error){
        console.log("获取教材error:");
        console.log(error);
      });
    },
//    页面dom加载前获取后端数据
    methods: {
//        点击显示或隐藏五年制下拉教材信息
      fiveYearClick: function () {
        var fiveYearArrow = document.getElementById("fiveYearArrow");
//              显示下拉教材信息
        if (!this.fiveArrow) {
          this.fiveArrow = true;
          this.fiveYearTable = true;
          fiveYearArrow.src = this.icon2;
        } else {
          this.fiveArrow = false;
          this.fiveYearTable = false;
          fiveYearArrow.src = this.icon1;
        }
//              隐藏下拉教材信息
      },
//        点击显示或隐藏三年制下拉教材信息
      threeYearClick: function () {
        var threeYearArrow = document.getElementById("threeYearArrow");
        if (!this.threeArrow) {
          this.threeArrow = true;
          this.threeYearTable = true;
          threeYearArrow.src = this.icon2;
        } else {
          this.threeArrow = false;
          this.threeYearTable = false;
          threeYearArrow.src = this.icon1;
        }
      },
    }
  }
</script>

<style scoped>
  html {
  }
  /*最上层Div*/
  #textbookManagementDiv{
    margin: 0 auto;
    background-color: #f3f3f3;
    height: 100%;
    overflow: auto;
  }
  .dropDown{
    /*主要内容区域*/
    margin: 0.6rem 5rem;
    position: relative;
    top: 0.6rem;
  }
  .amButtom{
    /*折叠按钮*/
    cursor: pointer;
  }
  table{
    /*教材信息*/
    width: 100%;
    margin: 0 auto;
    border-collapse: collapse;
    border-right: thin solid #E3E3E3;
    border-left: thin solid #E3E3E3;
  }
  td{
    border-bottom: thin solid #E3E3E3;
    height: 2.5rem;
    text-align: center;
  }
  @media screen and (max-width: 1025px) {
    html {
    }
  }
</style>
