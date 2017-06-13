<template>
  <div id="suspendCouApplyDiv">
    <div class="blank">
      <div class="positionBar">
        <span>您的当前位置：</span>
        <span><a href="#/login/main/eduAdminHome" class="returnHome">首页</a></span>
        <span> > <a href="#/login/main/eduAdminHome?course" class="returnHome">智能排课</a> > 排课信息 > 查看停课申请</span>
      </div>
    </div>
    <div id="tableDiv">
      <table class="operationTable">
      <thead>
        <tr>
          <td class="headTd">申请教师</td>
          <td class="headTd">课程名称</td>
          <td class="headTd">上课班级</td>
          <td class="headTd">上课时间</td>
          <td class="headTd">申请时间</td>
          <td class="headTd">具体理由</td>
          <td class="headTd">操作</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(application,index) in applications" :id="index">
          <td>{{ application.teacherName }}</td>
          <td>{{ application.courseName }}</td>
          <td>{{ application.className }}</td>
          <td>{{ application.courseTime }}</td>
          <td>{{ application.appTime }}</td>
          <td>{{ application.reason }}</td>
          <td>
            <button class="operationButton" @click="operation(application.lessonsChangeId,'true',index)" title="通过">√</button>
            <!--<button @click="setTrue(index)">√</button>-->
            <!--申请通过批准-->
            <button class="operationButton" @click="operation(application.lessonsChangeId,'false',index)" title="不通过">×</button>
            <!--申请拒绝-->
          </td>
        </tr>
      </tbody>
    </table>
    </div>
    <Modal
        v-model="modal1"
        width="400"
        :mask-closable="false"
        id="modalBody"
        :style="{top:'10rem'}">
      <div style="font-size: 1.1rem;text-align: center;">
        <p>您确定通过该申请吗?</p>
      </div>
      <div slot="footer" style="text-align: center">
        <button id="modalBtn" @click="setTrue(applications,operationId,operationIndex)">确定</button>
        <button id="modalBtn" @click="modal1 = false">取消</button>
      </div>
    </Modal>
    <Modal
        v-model="modal2"
        width="400"
        :mask-closable="false"
        id="modalBody"
        :styles="{top:'10rem'}">
      <div style="font-size: 1.1rem;text-align: center;">
        <p>您确定拒绝该申请吗?</p>
      </div>
      <div slot="footer" style="text-align: center">
        <button id="modalBtn" @click="setFalse(applications,operationId,operationIndex)">确定</button>
        <button id="modalBtn" @click="modal2 = false">取消</button>
      </div>
    </Modal>
    <Modal
        v-model="modal3"
        width="400"
        :mask-closable="false"
        id="modalBody"
        :styles="{top:'10rem'}">
      <div style="font-size: 1.1rem;text-align: center;">
        <p>{{ errorMessage }}</p>
      </div>
      <div slot="footer" style="text-align: center">
        <button id="modalBtn" @click="modal3 = false">确定</button>
      </div>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: 'suspendCouApplyDiv',
    data () {
      return {
        applications: [
          /*{ lessonsChangeId:'1', teacherName: '张三', courseName: '护理学基础', className: '普高2016护理1班', courseTime: '周一上午1、2节', appTime: '2016.08.01',reason:'??' },
          { lessonsChangeId:'2', teacherName: '李四', courseName: '内科护理', className: '普高2017护理2班', courseTime: '周一上午3、4节', appTime: '2016.08.02',reason:'??' },
          { lessonsChangeId:'3', teacherName: '王五', courseName: '护理管理学', className: '普高2015护理1班', courseTime: '周二上午1、2节', appTime: '2016.08.02',reason:'??' },
          { lessonsChangeId:'4', teacherName: '李小红', courseName: '内科护理', className: '普高2016护理3班', courseTime: '周五上午7节', appTime: '2016.08.02',reason:'??' }*/
        ],
//                申请信息
        operationIndex: null,
        operationId: null,
//        对话框参数传递
        modal1: false,
//        对话框显隐
        modal2: false,
        modal3: false,
        errorMessage: ""
      }
    },
    beforeMount: function() {
//    页面dom加载前获取后端数据
      this.$http.post('./closedCourseApplyShow',{
//      this.$http.post('../testPhp/suspendCouApply.php',{
      },{
        "Content-Type":"application/json"
      }).then(function(response){
        console.log("获取申请:");
        console.log(response.body);
        var data = response.body;
        this.applications = data;
      },function(error){
        this.$Message.error('连接失败，请重试！');
      });
    },
    methods: {
      operation: function(operationId,type,operationIndex){
//                对话框参数传递，触发对应对话框
        this.operationId = operationId;
        this.operationIndex = operationIndex;
        console.log(type);
        if(type == "true"){
          this.modal1 = true;
        }else{
          this.modal2 = true;
        }
      },
      setTrue: function(applications,id,index){
        //预留功能，需要后端返回处理确认
//        if(confirm("您确定通过该申请吗？")){
          this.$http.post('./closedCourseApplyHandle',{
//          this.$http.post('../testPhp/adjustCouApplySetTrue.php',{
            "lessonsChangeId": id,
            "operation": 1
          },{
            "Content-Type":"application/json"
          }).then(function(response){
            console.log("通过申请:");
            console.log(response.body);
            var  data = response.body;
            if(data.result == 1) {
              applications.splice(index, 1);
            }else{
//              this.$Message.error("操作失败,请重试!");
              this.errorMessage = "操作失败,请重试!";
              this.modal3 = true;
            }
          },function(error){
            this.$Message.error('连接失败，请重试！');
          });
//        }
      this.modal1 = false;
      },
      setFalse: function(applications,id,index){
        //预留功能，需要后端返回处理确认
//        if(confirm("您确定拒绝该申请吗？")){
          this.$http.post('./closedCourseApplyHandle',{
//          this.$http.post('../testPhp/adjustCouApplySetFalse.php',{
            "lessonsChangeId": id,
            "operation": 0
          },{
            "Content-Type":"application/json"
          }).then(function(response){
            console.log("拒绝申请:");
            console.log(response.body);
            var data = response.body;
            if(data.result == 1) {
              applications.splice(index, 1);
            }else{
//              this.$Message.error("操作失败,请重试!");
              this.errorMessage = "操作失败,请重试!";
              this.modal3 = true;
            }
          },function(error){
            this.$Message.error('连接失败，请重试！');
          });
//        }
        this.modal2 = false;
      }
    }
  }
</script>

<style scoped>
  html{
  }
  #suspendCouApplyDiv{
    /*页面*/
    margin: 0 auto;
    background-color: #f3f3f3;
    height: 100%;
  }
  #tableDiv{
    margin: 0 5rem;
  }
  .operationButton{
    outline: none;
    border: thin solid #A6A6A6;
    background-color: white;
    color: #A6A6A6;
    border-radius: 1rem;
    font-size: 1rem;
    width: 1.45rem;
  }
  .operationButton:hover{
    background-color: red;
    color: white;
    border: red;
  }
  @media screen and (max-width:1025px) {
    html {
    }
  }
</style>
