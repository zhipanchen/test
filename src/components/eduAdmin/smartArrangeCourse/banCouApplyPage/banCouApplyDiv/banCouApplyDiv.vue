<template>
  <div id="banCouApplyDiv">
    <div class="blank">
      <div class="positionBar">
        <span>您的当前位置：</span>
        <span><a href="#/login/main/eduAdminHome" class="returnHome">首页</a></span>
        <span> > <a href="#/login/main/eduAdminHome?course" class="returnHome">智能排课</a> > 排课操作 > 查看禁排申请</span>
      </div>
    </div>
    <div id="tableDiv">
      <table class="operationTable">
        <thead>
          <tr>
            <th class="headTd">申请教师</th>
            <th class="headTd">禁排时间（星期）</th>
            <th class="headTd">申请时间</th>
            <th class="headTd">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(application,index) in applications" :id="application.forbiddentimeId">
            <td>{{ application.teacherName }}</td>
            <td>{{ application.appContent }}</td>
            <td>{{ application.appTime }}</td>
            <td>
              <button class="operationButton" @click="operation(application.forbiddentimeId,'true',index)" title="通过">√</button>
              <!--申请通过批准-->
              <button class="operationButton" @click="operation(application.forbiddentimeId,'false',index)" title="不通过">×</button>
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
    name: 'banCouApplyDiv',
    data () {
      return {
        applications: [
          /*{ forbiddentimeId:'1', teacherName: '张三', appContent: '每周三上午不上课', appTime: '2016.08.01' },
          { forbiddentimeId:'2', teacherName: '李四', appContent: '每周四下午不上课', appTime: '2016.08.03' },
          { forbiddentimeId:'3', teacherName: '王五', appContent: '每周一下午不上课', appTime: '2016.08.02' },
          { forbiddentimeId:'4', teacherName: '李小红', appContent: '每周五上午不上课', appTime: '2016.08.05' }*/
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
      this.$http.post('./forbiddenTimeApplyShow',{},{
//      this.$http.post('../testPhp/banCouApply.php',{},{
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
        this.operationId = operationId;
        this.operationIndex = operationIndex;
        console.log(type);
        if(type == "true"){
          this.modal1 = true;
        }else{
          this.modal2 = true;
        }
      },
//    页面dom加载前获取后端数据
      setTrue: function(applications,id,index){
//        if(confirm("您确定通过该申请吗？")){
          this.$http.post('./forbiddenTimeApplyHandle',{
//          this.$http.post('../testPhp/adjustCouApplySetTrue.php',{
            "forbiddentimeId": id,
            "operation": 1
          },{
            "Content-Type":"application/json"
          }).then(function(response){
            this.modal1 = false;
            console.log("通过申请:");
            console.log(response.body);
            var data = response.body;
            if(data.result == "1") {
              applications.splice(index, 1);
            }else{
              this.$Message.error("操作失败,请重试!");
              this.errorMessage = "操作失败,请重试!";
              this.modal3 = true;
            }
          },function(error){
            this.modal1 = false;
            this.$Message.error('连接失败，请重试！');
          });
//        }
      },
      setFalse: function(applications,id,index){
//        if(confirm("您确定拒绝该申请吗？")){
          this.$http.post('./forbiddenTimeApplyHandle',{
//          this.$http.post('../testPhp/adjustCouApplySetFalse.php',{
            "forbiddentimeId": id,
            "operation": 0
          },{
            "Content-Type":"application/json"
          }).then(function(response){
            this.modal2 = false;
            console.log("拒绝申请:");
            console.log(response.body);
            var data = response.body;
            if(data.result == "1") {
              applications.splice(index, 1);
            }else{
              this.$Message.error("操作失败,请重试!");
              this.errorMessage = "操作失败,请重试!";
              this.modal3 = true;
            }
          },function(error){
            this.modal2 = false;
            this.$Message.error('连接失败，请重试！');
          });
//        }
      }
    }
  }
</script>

<style scoped>
  html{
  }
  #banCouApplyDiv{
    /*页面*/
    margin: 0 auto;
    background-color: #f3f3f3;
    height: 100%;
  }
  #tableDiv{
    margin: 0 5rem;
  }
  .operationButton{
    /*操作图标*/
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
