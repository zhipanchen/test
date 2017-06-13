<template>
  <div>
    <div  class="positionBar">
      <span>您当前的位置：</span>
      <span><a href="#/login/main/eduAdminHome" class="returnHome">首页</a></span>
      <span>><a href="#/teacher/teach/director" class="returnHome">督导反馈</a></span>
      <span>>督导结果</span>
    </div>
    <div id="table">

    <div id="show">
      <table class="normalTable">
        <thead>
        <tr>
          <th colspan=4>督导反馈</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>督导日期</td>
          <td colspan=3><input v-model="SuperviseTime" class="big" type="text"></td>
        </tr>
        <tr><td rowspan=8>评分</td>
             <td>学生出勤情况</td><td><input v-model="AttendanceInfo" class="sma" type="text"></td></tr>
        <tr><td>授课内容</td> <td><input v-model="TeachContent" class="sma" type="text"></td></tr>
        <tr><td>教师素养得分</td> <td><input v-model="TeacherQualityScored" class="sma" type="number"></td></tr>
        <tr><td>教学目标得分</td> <td><input v-model="TeachGoalsScored" class="sma" type="number"></td></tr>
        <tr><td>教学内容得分</td> <td><input v-model="TeachContentScored" class="sma" type="number"></td></tr>
        <tr><td>教学方法得分</td> <td><input v-model="TeachMethodsScored" class="sma" type="number"></td></tr>
        <tr><td>教学常规得分</td> <td><input v-model="TeachRoutineScored" class="sma" type="number"></td></tr>
        <tr><td>教学内容得分</td> <td><input v-model="TeachEffectScored" class="sma" type="number"></td></tr>
        <tr><td>督导员意见</td>
             <td colspan=3><input v-model="CommentsInfo" class="big" type="text"></td>
        </tr>
        <!--<tr>-->
          <!--<td >教务人员意见(教务人员填写)</td>-->
          <!--<td colspan=3><input style="display: none" v-model="ForwardInfo" readonly class="big" type="text"></td>-->
        <!--</tr>-->
        <!--<tr><td>教师反馈</td>-->
          <!--<td colspan=3><input class="big" type="text"></td>-->
        <!--</tr>-->
        </tbody>
      </table>
      <div style="text-align: center">
      <button class="am-btn am-btn-success am-radius" @click="saveDia(SuperviseTime,AttendanceInfo,TeachContent,TeacherQualityScored,
      TeachGoalsScored,TeachContentScored,TeachMethodsScored,TeachRoutineScored,TeachEffectScored,CommentsInfo,ForwardInfo)">提交</button>
      <button class="am-btn am-btn-success am-radius" @click="cancel()">返回</button>
      </div>
    </div>
    <div id="grey"></div>
    <div id="recordTable">
      <table class="table table-hover table-bordered" cellspacing="1">
        <thead>
        <tr id="recordTr">
          <th class="recordTh">督导时间</th>
          <th class="recordTh">提交时间</th>
          <th class="recordTh">状态</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="data in tableList">
          <td  v-text="data.supervisionTime"></td>
          <td  v-text="data.upTime"></td>
          <td>提交成功</td>
        </tr>
        </tbody>
      </table>
    </div>
    <Modal
      v-model="modal1"
      width="400"
      :mask-closable="false"
      id="modalBody"
      :styles="{top:'10rem'}">
      <div style="font-size: 1.1rem;text-align: center;">
        <p>您确定提交反馈吗？</p>
      </div>
      <div slot="footer" style="text-align: center">
        <button id="modalBtn" @click="save(oSuperviseTime,oAttendanceInfo,oTeachContent,oTeacherQualityScored,
      oTeachGoalsScored,oTeachContentScored,oTeachMethodsScored,oTeachRoutineScored,oTeachEffectScored,oCommentsInfo,oForwardInfo)">确定</button>
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
        <p>您确定返回吗？</p>
      </div>
      <div slot="footer" style="text-align: center">
        <button id="modalBtn" @click="cancel()">确定</button>
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
          <p>请填写完整信息！</p>
        </div>
        <div slot="footer" style="text-align: center">
          <!--<button id="modalBtn" @click="cancel()">确定</button>-->
          <button id="modalBtn" @click="modal3 = false">确定</button>
        </div>
      </Modal>
  </div>
  </div>
</template>

<script>
  export default {
    name: 'table',
    data () {
      return {
//        tableList:[{supervisionTime:"0102",upTime:"0103"},{supervisionTime:"0102",upTime:"0103"}],
        tableList:'',
        SuperviseTime:'',
        AttendanceInfo:'',
        TeachContent:'',
        TeacherQualityScored:'',
        TeachGoalsScored:'',
        TeachContentScored:'',
        TeachMethodsScored:'',
        TeachRoutineScored:'',
        TeachEffectScored:'',
        CommentsInfo:'',
        ForwardInfo:'',
        modal1: false,
        modal2: false,
        modal3: false,
        oSuperviseTime:'',
        oAttendanceInfo:'',
        oTeachContent:'',
        oTeacherQualityScored:'',
        oTeachGoalsScored:'',
        oTeachContentScored:'',
        oTeachMethodsScored:'',
        oTeachRoutineScored:'',
        oTeachEffectScored:'',
        oCommentsInfo:'',
        oForwardInfo:''
      }
    },
    //打开页面
    beforeMount:function(){
      var thisURL = document.URL;
      console.log(thisURL);
      var id =thisURL.split("?")[1];
      var idArr = id.split("&");
      var courseId =idArr[1];
      var classId =idArr[0];
      var teacherId =idArr[2];
      console.log(courseId);
      console.log(teacherId);
      this.$http.post('./teachingSupervision/getSupervisionRecord',{
//        this.$http.post('../jsonphp/result.php',{
        "courseId":courseId,
        "classId":classId,
        "teacherId":teacherId
      },
        {"Content-Type":"application/json"}).then(function (response) {
          console.log(response);
          this.tableList=response.body.supervisionRecordList;
//          this.SuperviseTime=response.body.SuperviseTime;
//          this.AttendanceInfo=response.body.AttendanceInfo;
//          this.TeachContent=response.body.TeachContent;
//          this.TeacherQualityScored=response.body.TeacherQualityScored;
//          this.TeachGoalsScored=response.body.TeachGoalsScored;
//          this.TeachContentScored=response.body.TeachContentScored;
//          this.TeachMethodsScored=response.body.TeachMethodsScored;
//          this.TeachRoutineScored=response.body.TeachRoutineScored;
//          this. TeachEffectScored=response.body.TeachEffectScored;
//          this. CommentsInfo=response.body.CommentsInfo;
//          this. ForwardInfo=response.body.ForwardInfo;
        },
        function(error){
          console.log("获取error:");
          console.log(error);
        });
    },
    methods: {
      //打开保存对话框
      saveDia:function(SuperviseTime,AttendanceInfo,TeachContent,TeacherQualityScored,
                       TeachGoalsScored,TeachContentScored,TeachMethodsScored,TeachRoutineScored,TeachEffectScored,CommentsInfo,ForwardInfo){
          this.oSuperviseTime=SuperviseTime;
          this.oAttendanceInfo=AttendanceInfo;
          this.oTeachContent=TeachContent;
          this.oTeacherQualityScored=TeacherQualityScored;
          this.oTeachGoalsScored=TeachGoalsScored;
          this.oTeachContentScored=TeachContentScored;
          this.oTeachMethodsScored=TeachMethodsScored;
          this.oTeachRoutineScored=TeachRoutineScored;
          this.oTeachEffectScored=TeachEffectScored;
          this.oCommentsInfo=CommentsInfo;
          this.oForwardInfo=ForwardInfo;
          if(SuperviseTime==''||AttendanceInfo==''||TeachContent==''||TeacherQualityScored==''||
            TeachGoalsScored==''||TeachContentScored==''||TeachMethodsScored==''||TeachRoutineScored==''||
            TeachEffectScored==''||CommentsInfo==''){
            this.modal3 = true;
          }else{
            this.modal1 = true;
          }

      },
      //打开取消对话框
      cancelDia:function(){
        this.modal2 = true;
      },
      //保存
      save:function(SuperviseTime,AttendanceInfo,TeachContent,TeacherQualityScored,
                    TeachGoalsScored,TeachContentScored,TeachMethodsScored,TeachRoutineScored,TeachEffectScored,CommentsInfo,ForwardInfo){
        this.modal1=false;
        var thisURL = document.URL;
        var id =thisURL.split("?")[1];
        var idArr = id.split("&");
        var courseId =idArr[1];
        var classId =idArr[0];
        var teacherId =idArr[2];
//        var id =thisURL.split("?")[1];
//        var courseId =id.split("*")[0];
//        var classId =id.split("*")[1];
//        var teacherId =id.split("*")[2];
//        this.$http.post('../jsonphp/result.php',{
        this.$http.post('./teachingSupervision/addSupervision',{
          "courseId":courseId,
          "classId":classId,
          "teacherId":teacherId,
          "superviseTime":SuperviseTime,
          "attendanceInfo":AttendanceInfo,
          "teachContent":TeachContent,
          "teacherQualityScored":TeacherQualityScored,
          "teachGoalsScored":TeachGoalsScored,
          "teachContentScored":TeachContentScored,
          "teachMethodsScored":TeachMethodsScored,
          "teachRoutineScored":TeachRoutineScored,
          "teachEffectScored":TeachEffectScored,
          "commentsInfo":CommentsInfo,
          "forwardInfo":ForwardInfo
        },{"Content-Type":"application/json"}).then(function (response) {
            console.log("传递:");
            console.log(response.body);
            if(response.body.result=="1")
            {this.$Message.success('操作成功！');
              var t=setTimeout(" location.reload();",3000)}
          },
          function(error){
            console.log("传递error:");
            console.log(error);
          });
      },
      //返回上一页面
      cancel:function(){
//        location.reload();
        window.history.back(-1);
      }
    }

  }
</script>

<style lang="css" scoped>
  @import '../../../../assets/css/external.css';
  #table{
    background-color: #f3f3f3;
    width:100%;
  }
 .big{width:98%;  height:2rem;}
 .sma{width:97%;}
 #recordTable{
   background-color: white;
   margin-right:5rem;
   margin-left:5rem;
   padding-bottom: 1rem;
   position: relative;
   top:2rem;
 }
 #recordTr{

 }
 .recordTh{
  width:20rem;
 }
 #grey{
   background-color: #f3f3f3;
   margin-right:5rem;
   margin-left:5rem;
   height:2rem;
 }
 input{
   border:1px solid white;
 }
  button{
   width:5.6rem;
    margin:0.7rem;
    margin-top:2rem;
    /*display: flex;*/
    /*justify-content: center;*/
  }
  #show{
    background-color: white;
    margin-right:5rem;
    margin-left:5rem;
    padding-bottom: 1rem;
    position: relative;
    top:2rem;
  }
  thead{
    border-bottom:solid 2px lightgrey;
  }

  tr{
    height:2.5rem;
  }

</style>



