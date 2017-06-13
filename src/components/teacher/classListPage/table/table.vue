<template>
  <div>
    <div  class="positionBar">
      <span>您当前的位置：</span>
      <span><a href="#/login/main/eduAdminHome" class="returnHome">首页</a></span>
      <span>>班级管理</span>
    </div>
    <div id="back">
    <div id="table">
      <div id="top">
        <span>{{classFullName}}共{{classSize}}人</span>
         <div id="buttonDiv">
          <button class="am-btn am-btn-success am-radius" @click="saveDia">保存</button>
          <button class="am-btn am-btn-success am-radius" @click="load">导出</button>
         </div>
      </div>
      <div id="bottom">
        <span>班级名单</span>
      </div>
      <div id="show">
        <table class="operationTable">
          <thead>
            <tr>
              <th>姓名</th>
              <th>学号</th>
              <th>班级任职</th>
              <th>状态</th>
              <th>备注</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(data,index) in tableList" :key="data.studentId">
              <td  v-text="data.studentName"></td>
              <td  v-text="data.studentId"></td>
              <td><select v-model="data.studentDuty">
                <option  v-for="studentDuty in studentDutys" >
                  {{ studentDuty }}
                </option>
              </select></td>
              <td><select @change="canInput(index)"  :id="'currentStates'+index" v-model="data.currentState">
                <option v-for="currentState in currentStates">
                  {{ currentState }}
                </option>
              </select></td>
              <td>
                <textarea :id="'canInput'+index" readonly v-model="data.changeReason"></textarea>
                <!--<input :id="'canInput'+index" readonly v-model="data.changeReason">-->
              </td>
              </td>
              <td><span :id="'selfInfo'+index" style="text-decoration: underline; cursor: pointer"  @click="selfInfo(index)">查看学生个人信息</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
      <Modal
        v-model="modal1"
        width="400"
        :mask-closable="false"
        id="modalBody"
        :styles="{top:'10rem'}">
        <div style="font-size: 1.1rem;text-align: center;">
          <p>您确定保存信息吗？</p>
        </div>
        <div slot="footer" style="text-align: center">
          <button id="modalBtn" @click="save()">确定</button>
          <button id="modalBtn" @click="modal1 = false">取消</button>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
    export default {
        name: '',
        data () {
            return {
              classFullName:'',
              classSize:'',
              tableList:'',
              studentDutys:[
                '班长',
                '副班长',
                '学习委员',
                '纪律委员',
                '无'
              ],
              modal1: false,
              currentStates:[
                '在读',
                '申请休学',
                '申请退学'
              ]
            }
        },
      beforeMount:function(){
        this.$http.post('./classManage/getStudentStateInfo',{},
//          this.$http.post('../jsonphp/class.php',{},
          {"Content-Type":"application/json"}).then(function (response) {
            console.log(response);
            this.classFullName=response.body.classFullName;
            this.classSize=response.body.classSize;
            this.tableList = response.body.studentAndStateList;
            for(var i=0;i<response.body.studentAndStateList.length;i++){
              if(response.body.studentAndStateList[i].currentState=="1"){
                this.tableList[i].currentState="在读"
              }else if(response.body.studentAndStateList[i].currentState=="2"){
                this.tableList[i].currentState="申请休学"
              }else if(response.body.studentAndStateList[i].currentState=="3"){
                this.tableList[i].currentState="申请退学"
              }
          }
              for(var n=0;n<response.body.studentAndStateList.length;n++){
                if(response.body.studentAndStateList[n].studentDuty=="1"){
                  this.tableList[n].studentDuty="班长"
                }else if(response.body.studentAndStateList[n].studentDuty=="2"){
                  this.tableList[n].studentDuty="副班长"
                }else if(response.body.studentAndStateList[n].studentDuty=="3"){
                  this.tableList[n].studentDuty="学习委员"
                }else if(response.body.studentAndStateList[n].studentDuty=="4"){
                  this.tableList[n].studentDuty="生活委员"
                }else if(response.body.studentAndStateList[n].studentDuty=="5"){
                  this.tableList[n].studentDuty="纪律委员"
                }else if(response.body.studentAndStateList[n].studentDuty=="6"){
                  this.tableList[n].studentDuty="文体委员"
                }else{ this.tableList[n].studentDuty="无"}
              }
          },
          function(error){
            console.log("获取error:");
            console.log(error);
          });
      },
      methods: {
        //保存对话框打开
        saveDia:function(){
          this.modal1 = true;
        },
        //必须修改select 备注才能输入
        canInput:function(index){
          var canInput = document.getElementById("canInput"+index);
          canInput.readOnly = false;
        },
        //保存功能
        save:function(){
          this.modal1 = false;
          for(var i=0;i<this.tableList.length;i++){
            if(this.tableList[i].currentState=="在读"){
              this.tableList[i].currentState="1"
            }else if( this.tableList[i].currentState=="申请休学"){
              this.tableList[i].currentState="2"
            }else if( this.tableList[i].currentState=="申请退学"){
              this.tableList[i].currentState="3"
            }
          }
          for(var n=0;n<this.tableList.length;n++){
            if(this.tableList[n].studentDuty=="班长"){
              this.tableList[n].studentDuty="1"
            }else if( this.tableList[n].studentDuty=="副班长"){
              this.tableList[n].studentDuty="2"
            }else if( this.tableList[n].studentDuty=="学习委员"){
              this.tableList[n].studentDuty="3"
            }else if(this.tableList[n].studentDuty=="生活委员"){
              this.tableList[n].studentDuty="4"
            }else if(this.tableList[n].studentDuty=="纪律委员"){
              this.tableList[n].studentDuty="5"
            }else if(this.tableList[n].studentDuty=="文体委员"){
              this.tableList[n].studentDuty="6"
            }else if(this.tableList[n].studentDuty=="无"){
              this.tableList[n].studentDuty="7"
            }
              }
//          this.$http.post('../jsonphp/class.php',
          this.$http.post('./classManage/editStudentStateInfo',
            JSON.stringify({
            "studentAndStateList":this.tableList
          }),{"Content-Type":"application/json"}).then(function (response) {
              console.log("传递:");
              console.log(response.body);
              if(response.body.result=="1")
              {this.$Message.success('操作成功！');
                var t=setTimeout(" location.reload();",2000);}
            },
            function(error){
              console.log("传递error:");
              console.log(error);
            });
        },
        //导出
        load:function(){
          location.href='./classManage/exportClassStudentInfo'
        },
        //跳转到学生个人信息
        selfInfo:function(index){
          var id=this.tableList[index].studentId;
          location.href='#/teacher/class/checkStudentInfo?'+id;
        }

      }
    }
</script>

<style lang="css" scoped>
  @import '../../../../assets/css/external.css';
  #back{
    background-color: #f3f3f3;
    padding-left: 5rem;
    padding-right: 5rem;
  }
#table{
  background-color: white;
  /*margin-right:5rem;*/
  /*margin-left:5rem;*/
  height:30rem;
  position: relative;
  top:2rem;
}
#top{
  position: relative;
  display:flex;
  justify-content: space-between;
  padding:0.5rem 2rem;
}
#bottom{
    background-color: #158064;
    color:white;
    text-align: left;
    position: relative;
    padding-left:2rem;
   padding-top:0.7rem;
  padding-bottom: 0.7rem;

  }
  textarea{
    border: 0.1rem solid #d4d4d9;
  }
  button{

  }
  /*table{*/
    /*width:96%;*/
    /*margin-left:1rem;*/
    /*margin-right:1rem;*/
    /*border: solid 1px white;*/
    /*border-collapse: collapse;*/
  /*}*/
/*thead{*/
  /*border-bottom:solid 2px lightgrey;*/
/*}*/

tr{
  height:3rem;
}
select{
  border: 0.1rem solid #d4d4d9;
  border-radius: 0.7rem;
  outline: none;
  padding: 0.3rem 0.5rem;
  font-size: 0.8rem;
}
</style>
