<template>
  <div>
    <div id="searchInfo">
      <select class="selectWM" v-model="statechangeKey.schoolYearType">
        <option value="0">选择年制</option>
        <option v-for="yearType in yearTypes" :value="yearType">{{yearType}}年制</option>
      </select>
      <!--年制选择下拉列表-->
      <span><input type="text" id="stdID" class="inputWM" placeholder="请输入学号" v-model="statechangeKey.studentId"></span>
      <span><input type="text" id="stdName" class="inputWM" placeholder="请输入姓名" v-model="statechangeKey.studentName"></span>
      <!--学号，姓名输入框-->
      <span><button id="searchFor" class="am-btn am-btn-success am-radius buttonWM" @click="searchChangeInfo()">查询</button></span>
      <span><button id="leadOut" class="am-btn am-btn-success am-radius buttonWM" @click="leadOutInfo()">下载</button></span>
      <!--查询,导出按钮-->
    </div>
    <div id="stdInfoTable" style="padding: 0.6rem 5rem;background-color: #f3f3f3">
      <table id="stdInfoTableSy" class="normalTable" style="table-layout: fixed;">
        <thead>
        <tr>
          <th>年制</th>
          <th>专业</th>
          <th>班级</th>
          <th>学号</th>
          <th>姓名</th>
          <th>异动类型</th>
          <th>异动原因</th>
          <th>生效日期</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="statechangeinfoStr in statechangeinfoStrList">
          <td v-text="statechangeinfoStr.schoolYearType + '年制'"></td>
          <td v-text="statechangeinfoStr.specialityName"></td>
          <td v-text="statechangeinfoStr.className"></td>
          <td v-text="statechangeinfoStr.studentId"></td>
          <td v-text="statechangeinfoStr.studentName"></td>
          <td v-if="statechangeinfoStr.changeType == '1'">在读</td>
          <td v-else-if="statechangeinfoStr.changeType == '2'">休学</td>
          <td v-else-if="statechangeinfoStr.changeType == '3'">退学</td>
          <td v-else>未知</td>
          <td v-text="statechangeinfoStr.changeReason"></td>
          <td v-text="statechangeinfoStr.changeDate"></td>
        </tr>
        </tbody>
      </table>
    </div>
    <!--学生异动信息表格-->
  </div>
</template>

<script>
    export default {
        name: '',
        data () {
            return {
              yearTypes:[
                '3',
                '5'
              ],
              statechangeKey:{
                schoolYearType:'0',
                studentId:'',
                studentName:''
              },
              statechangeinfoStrList:[
                  {schoolYearType:'3',specialityName:'护理',className:'护理3班',studentId:'1530310503',studentName:'谢兴月',changeType:'1',changeReason:'请假一学期',changeDate:'2016.03.01'},
                  {schoolYearType:'5',specialityName:'护理',className:'护理4班',studentId:'1530310501',studentName:'张安',changeType:'5',changeReason:'希望转专业',changeDate:'2016年.03.02'},
                  {schoolYearType:'3',specialityName:'护理',className:'护理1班',studentId:'1530310502',studentName:'吴晴',changeType:'3',changeReason:'挂科多门',changeDate:'2015.11.23'}
                ]
            }
        },
      beforeMount:function() {
        this.$http.post('./stateManage/getAllStateChangeInfo',{},{
          "Content-Type":"application/json"
        }).then(function (response) {
          console.log(response);
          this.statechangeinfoStrList = response.body.statechangeinfoStrList;
        },function(error){
          console.log("获取error");
        });
      },
//      初始化时，获取异动情况列表
      methods:{
        searchChangeInfo: function(){
          this.$http.post('./stateManage/findStateChangeInfo',{
            "schoolYearType":this.statechangeKey.schoolYearType,
            "studentId":this.statechangeKey.studentId,
            "studentName":this.statechangeKey.studentName
          },{
            "Content-Type":"application/json"
          }).then(function (response) {
            console.log(response);
            var result = response.body.result;
            if(result === "0"){
              alert("请输入正确的教师信息！");
            }else{
              this.statechangeinfoStrList = response.body.statechangeinfoStrList;
            }
          },function(error){
            console.log("获取error");
          });
        },
//        查询学生异动情况
        leadOutInfo: function(){
          location.href="./stateManage/exportStateChangeInfo";
        }
//        导出学生异动情况
      }
    }
</script>

<style scoped>
    html {
        font-size: 100%;
    }
    #searchInfo{
       margin: 0.6rem 5rem;
       background-color: white;
     }
    .selectWM{
      width: 8rem;
      margin: 0 0.7rem;
    }
    .inputWM{
      width: 8rem;
      margin: 0 0.7rem;
    }
    .buttonWM{
      width: 5.6rem;
      margin: 0 0.7rem;
    }
    @media screen and (max-width: 1023px) {
        html {
            font-size: 56%;
        }
    }
</style>
