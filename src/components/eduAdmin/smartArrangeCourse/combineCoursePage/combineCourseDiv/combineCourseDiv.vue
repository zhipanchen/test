<template>
  <div id="combineCourseDiv">
    <div id="termDiv" class="blank">
      <div class="positionBar">
        <span>您的当前位置：</span>
        <span><a href="#/login/main/eduAdminHome" class="returnHome">首页</a></span>
        <span> > <a href="#/login/main/eduAdminHome?course" class="returnHome">智能排课</a> > 排课操作 > 合课设置</span>
      </div>
    </div>
    <div id="tableDiv">
      <table id="t1" class="applyTable">
        <thead>
          <tr>
            <td>操作</td>
            <td>课程</td>
            <td>课程代码</td>
            <td>周课时数</td>
            <td>任课教师</td>
            <td>教师编号</td>
            <td>班级</td>
            <td>上课时间</td>
            <td>上课地点</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(information,index) in informations">
            <td class="operationTd" :id="information.operationLessonsId" @click="operation(information.operationLessonsId,index)">{{ information.operation }}</td>
            <td>{{ information.course }}</td>
            <td>{{ information.courseId }}</td>
            <td>{{ information.period }}</td>
            <td>{{ information.teacher }}</td>
            <td>{{ information.teacherId }}</td>
            <td>{{ information.className }}</td>
            <td>{{ information.time }}</td>
            <td>{{ information.classroom }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p id="tipP" style="display: none;color:red;"></p>
    <transition name="editTran">
      <!--transition过渡动画-->
      <div v-show="editValue" id="editDiv">
        <div id="weekDiv">
          <span>上课时间：
            <select id="timeSelect" v-model="time" @change="timeChange()">
              <option disabled>选择时间</option>
              <option v-for="classTime in classTimes" :value="classTime.time">{{ classTime.timeInfo }}</option>
            </select>
          </span>
        </div>
        <div id="classroomDiv">
          <span>地点：</span>
          <select id="classroomSelect" v-model="classroom">
            <option disabled>选择教室</option>
            <option v-for="classroom in classrooms" :value="classroom">{{ classroom }}</option>
          </select>
        </div>
      </div>
    </transition>
    <transition name="editTran">
      <div v-show="editValue" id="buttonDiv">
        <button id="saveButton" @click="saveClick" class="am-btn am-btn-success am-radius">保存</button>
        <button id="restoreButton" @click="modal1 = true" class="am-btn am-btn-success am-radius">重置</button>
      </div>
    </transition>
    <p></p>
    <div>
      <table class="applyTable">
        <thead>
        <tr>
          <td>操作</td>
          <td>课程</td>
          <td>课程代码</td>
          <td>周课时数</td>
          <td>任课教师</td>
          <td>教师编号</td>
          <td>班级</td>
          <td>上课详情</td>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(information,index) in tableList">
          <td class="operationTd" @click="reCombineCourse(information.operationLessonsId)">重新设置</td>
          <td>{{ information.courseName }}</td>
          <td>{{ information.courseSerial }}</td>
          <td>{{ information.weekHour }}</td>
          <td>{{ information.teacherName }}</td>
          <td>{{ information.teacherSerial }}</td>
          <td>{{ information.classSerial }}</td>
          <td>{{ information.timeAndClassroomInfo }}</td>
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
        <p>当前合课编辑未保存提交，是否重置？</p>
      </div>
      <div slot="footer" style="text-align: center">
        <button id="modalBtn" @click="restoreClick()">确定</button>
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
        <p>是否放弃当前编辑，切换编辑对象？</p>
      </div>
      <div slot="footer" style="text-align: center">
        <button id="modalBtn" @click="operationClick(operationLessonsId,operationIndex,true)">确定</button>
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
    <Modal
        v-model="modal4"
        width="400"
        :mask-closable="false"
        id="modalBody"
        :styles="{top:'10rem'}">
      <div style="font-size: 1.1rem;text-align: center;">
        <p>您确定提交保存该课程信息吗？</p>
      </div>
      <div slot="footer" style="text-align: center">
        <button id="modalBtn" @click="saveClick()">确定</button>
        <button id="modalBtn" @click="modal4 = false">取消</button>
      </div>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: 'combineCourseDiv',
    data () {
      return {
        informations: [
          { operation: '合课编辑', operationLessonsId:"", id:"", course: '', courseId: '', period:'', teacher: '', teacherId: '', className: '', time: '', classroom:'' }
         /*{ operation: '合课编辑', id:"1", course: '护理学基础', courseId: '111', period:'2', teacher: '何平', teacherId: '123', className: '2014级1班', time: '周一上午1、2节', classroom:'A101' },
          { operation: '合课编辑', id:"2", course: '内科护理', courseId: '666', period:'3', teacher: '李雷', teacherId: '123', className: '2014级2班', time: '周二上午5、6节', classroom:'A102' },
          { operation: '合课编辑', id:"3", course: '护理管理学', courseId: '222', period:'4', teacher: '李雷', teacherId: '456', className: '2014级1班', time: '周一上午3、4节', classroom:'A102' },
          { operation: '合课编辑', id:"4", course: '外科护理', courseId: '333', period:'5', teacher: '何平', teacherId: '123', className: '2014级3班', time: '周三上午1、2节', classroom:'A103' },*/
        ],//合课表格内容
        tableList:[],
        operationId: '',//当前合课编辑状态的合课序号
        saveId: '',//保存提交的合课序号
        editValue: false,//合课编辑状态
        tip: true,//重置事件默认提示
        classTimes: [],//上课时间选择内容
        classrooms: [],//上课地点选择内容
        time:"选择时间",
        classroom:"选择教室",
//        选择值绑定
        classroomAndTime:[],
//        选择课程后后端返回的下拉选择组合内容
        number: 0,
        operationLessonsId: null,
        operationIndex: null,
//        对话框参数传递
        modal1: false,
//        对话框显隐
        modal2: false,
        modal3: false,
        modal4: false,
        errorMessage: ""
      }
    },
    beforeMount: function() {
      this.$http.post('./acdeminArrangeCourseShow',{},{
//      this.$http.post('../testPhp/combineCourse.php',{},{
        "Content-Type":"application/json"
      }).then(function(response){
        console.log("获取:");
        console.log(response.body);
        this.informations = [];
        this.tableList = response.body.tableList2;
        for(var i = 0;i < response.body.tableList1.length;i++){
          this.informations.push({"operation":"合课编辑", "operationLessonsId": response.body.tableList1[i].operationLessonsId,"id": response.body.tableList1[i].coursePlanId, "course": response.body.tableList1[i].courseName, "courseId": response.body.tableList1[i].courseSerial, "period": response.body.tableList1[i].weekHour, "teacher": response.body.tableList1[i].teacherName, "teacherId": response.body.tableList1[i].teacherSerial, "className": response.body.tableList1[i].classSerial, "time": response.body.tableList1[i].time, "classroom":response.body.tableList1[i].classroom});
        }
      },function(error){
        this.$Message.error('连接失败，请重试！');
      });
    },
//    页面dom加载前获取后端数据
    methods: {
      operation: function (id,index) {
//                对话框参数传递，触发对应对话框
        this.operationLessonsId = id;
        this.operationIndex = index;
        if(this.editValue == true && this.operationId != id){//判断打开其他合课时是否处于合课编辑状态
          this.modal2 = true;
        }else{
          this.operationId = id;
          this.operationClick(this.operationLessonsId,this.operationIndex,false);
        }
      },
      operationClick: function(id,index,isRestore){
//        合课编辑触发
        if(isRestore){
          this.restoreClick();
          var operationTd = document.getElementById(id);
          this.editValue = false;
          operationTd.innerHTML = "合课编辑";
          this.modal2 = false;
        }
        var state = false;
        if(this.informations[index].period > 3){
          var tipP = document.getElementById("tipP");
          tipP.innerHTML = "提示：该课程每周课时大于3，需要多次合课编辑。";
          tipP.style.display = "block";
        }else{
          var tipP = document.getElementById("tipP");
          tipP.style.display = "none";
        }

        for(var i = 0;i < this.informations.length;i++){//进入编辑状态
          if(this.informations[i].operationLessonsId != id){
            this.informations[i].operation = "合课编辑";
          }else{
            if(!state) {
              this.informations[i].operation = "编辑中";
              this.editValue = true;
              this.saveId = id;
              this.operationId = id;
              state = true;
            }
          }
        }
//        获取下拉选择组合内容
          this.$http.post('./acdeminArrangeCourseReturn', {
//        this.$http.post('../testPhp/combineCourseSelect.php', {
          "coursePlanId": this.informations[index].id,
          "teacherSerial": this.informations[index].teacherId,
          "weekHour": this.informations[index].period,
          "classSerial": this.informations[index].className
        }, {
          "Content-Type": "application/json"
        }).then(function (response) {
          this.classroomAndTime = response.body;
          console.log(this.classroomAndTime);
          this.classTimes = [];
          for (var i = 0; i < this.classroomAndTime.length; i++) {
            var isExit = false;
            for (var n = 0; n < this.classTimes.length; n++) {
              if ((this.classroomAndTime[i].time == this.classTimes[n].time) && i > 0) {
                isExit = true;
              }
            }
            if (!isExit) {
              this.classTimes.push({time:this.classroomAndTime[i].time,timeInfo:this.classroomAndTime[i].timeInfo});
            }
          }
          console.log(this.classTimes);
        }, function (error) {
          this.$Message.error('连接失败，请重试！');
        });
      },
      saveClick: function(){
//        var editDiv = document.getElementById("editDiv");
        var operationTd = document.getElementById(this.saveId);
//        var saveButton = document.getElementById("saveButton");
        console.log(this.time);
        if(this.time != "" && this.time != "选择时间" && this.time != null && this.classroom != "" && this.classroom != "选择教室") {
          var index = null;
          for (var i = 0; i < this.informations.length; i++) {
            if (this.informations[i].operationLessonsId == this.saveId) {
              index = i;
              break;
            }
          }
          this.$http.post('./acdeminArrangeCourseHandle', {
//          this.$http.post('../testPhp/adjustCouApplySetTrue.php', {
            "operationLessonsId": this.informations[index].operationLessonsId,
//            "courseName": this.informations[index].course,
//            "teacherName": this.informations[index].teacher,
//            "courseSerial": this.informations[index].courseId,
//            "teacherSerial": this.informations[index].teacherId,
//            "weekHour": this.informations[index].period,
//            "classSerial": this.informations[index].className,
            "classroom": this.classroom,
            "time": this.time
          }, {
            "Content-Type": "application/json"
          }).then(function (response) {
            this.modal4 = false;
            console.log(this.informations[index]);
            if (response.body.result == 1) {
              this.informations[index].time = this.time;
              this.informations[index].classroom = this.classroom;
              this.restoreClick(false);//保存提交后重置输入
              if(this.informations[index].period > 3){
                if(this.number == 1){
                  this.number = 0;
                  this.editValue = false;
                  operationTd.innerHTML = "合课编辑";
                  this.$Message.success("保存成功！");
                  location.reload();
                }else{
                  this.$http.post('./acdeminArrangeCourseReturn', {
//        this.$http.post('../testPhp/combineCourseSelect.php', {
                    "coursePlanId": this.informations[index].id,
                    "teacherSerial": this.informations[index].teacherId,
                    "weekHour": this.informations[index].period,
                    "classSerial": this.informations[index].className
                  }, {
                    "Content-Type": "application/json"
                  }).then(function (response) {
                    this.classroomAndTime = response.body;
                    console.log(this.classroomAndTime);
                    this.classTimes = [];
                    for (var i = 0; i < this.classroomAndTime.length; i++) {
                      var isExit = false;
                      for (var n = 0; n < this.classTimes.length; n++) {
                        if ((this.classroomAndTime[i].time == this.classTimes[n].time) && i > 0) {
                          isExit = true;
                        }
                      }
                      if (!isExit) {
                        this.classTimes.push({time:this.classroomAndTime[i].time,timeInfo:this.classroomAndTime[i].timeInfo});
                      }
                    }
                    console.log(this.classTimes);
                  }, function (error) {
                  });
                  this.number++;
//                  this.$Message.success("保存成功！请继续进行该课程其它上课时间的编辑。",3.5);
                  this.errorMessage = "保存成功！请继续进行该课程其它上课时间的编辑。";
                  this.modal3 = true;
                }
              }else {
                this.$Message.success("保存成功！");
                this.number = 0;
                this.editValue = false;
                operationTd.innerHTML = "合课编辑";
                setTimeout("location.reload()", 2000);
              }
            } else {
//              this.$Message.error("操作失败,请重试!");
              this.errorMessage = "操作失败,请重试!";
              this.modal3 = true;
            }
          }, function (error) {
            this.modal4 = false;
            this.$Message.error('连接失败，请重试！');
          });
        }else{
          this.modal4 = false;
//          this.$Message.warning("选择不能为空！");
          this.errorMessage = "选择不能为空！";
          this.modal3 = true;
        }
      },
      restoreClick: function(){
        //重置编辑内容
//        var timeSelect = document.getElementById("timeSelect");
//        var classroomSelect = document.getElementById("classroomSelect");
//        if(tip){
//          if(confirm("当前合课编辑未保存提交，是否重置？")){
//            timeSelect.options[0].selected = true;
//            classroomSelect.options[0].selected = true;
//            this.time = "";
//            this.classroom = "";
//          }
//        }else{
          this.time = "选择时间";
          this.classroom = "选择教室";
          this.modal1 = false;
//        }
      },
      timeChange: function(){
//        上课时间选择触发教室选择过滤
        this.classrooms = [];
        for(var i = 0;i < this.classroomAndTime.length;i++){
          if(this.classroomAndTime[i].time == this.time){
            this.classrooms.push(this.classroomAndTime[i].classroom);
          }
        }
        this.classroom = "选择教室";
      },
      reCombineCourse: function (id) {
//        重置合课编辑
        this.$http.post('./resetOutsideTeacher', {
//        this.$http.post('../testPhp/adjustCouApplySetTrue.php', {
          "operationLessonsId": id
        }, {
          "Content-Type": "application/json"
        }).then(function (response) {
          if(response.body.result == "1"){
            location.reload();
          }else{
//            this.$Message.error('操作失败，请重试！');
            this.errorMessage = "操作失败,请重试!";
            this.modal3 = true;
          }
        }, function (error) {
          this.$Message.error('连接失败，请重试！');
        });
      }
    }
  }
</script>

<style scoped>
  html {
  }
  #combineCourseDiv{
    /*页面*/
    background-color: white;
    text-align: left;
  }
  .positionBar{
    /*首页导航*/
    margin-left: 0;
  }
  table{
    text-align: center;
  }
  button:hover{
     cursor: pointer;
  }
  #termDiv{
    /*空白区域*/
    display: flex;
    align-items: center;
    padding-left: 5rem;
  }
  #tableDiv{
    /*表格区域*/
    background-color: #F0F3F8;
  }
  .operationTd{
    /*选择操作单元格*/
    text-decoration: underline;
  }
  .operationTd:hover{
    cursor: pointer;
    color: red;
  }
  #editDiv{
    /*编辑区域*/
    display: flex;
    justify-content: space-around;
    min-height: 6rem;
    position: relative;
    margin-top: 1rem;
  }
  #classDiv{
    /*班级选择*/
    display: flex;
    margin-bottom: 1rem;
  }
  .operationSpan{
    text-decoration: underline;
    margin-left: 0.5rem;
  }
  .operationSpan:hover{
    /*班级选择添加*/
    cursor: pointer;
    color: red;
  }
  .selectSpan{
    display: block;
    margin-left: 3.3rem;
    margin-top: 0.5rem;
  }
  #buttonDiv{
     /*功能按钮区域*/
     display: flex;
     height: 5rem;
     align-items: flex-start;
     justify-content: center;
   }
  #saveButton{
    /*保存按钮*/
    width: 5.6rem;
    margin-right: 1.4rem;
    position: relative;
    top: 2rem;
  }
  #restoreButton{
    /*重置按钮*/
    width: 5.6rem;
    position: relative;
    top: 2rem;
  }
  #restoreButton:active,#saveButton:active{
    background-color: #00a539;
  }
  .editTran-enter-active, .editTran-leave-active {
    /*课时单双周选择过渡效果*/
    transition: opacity .9s
  }
  .editTran-enter, .editTran-leave-active {
    /*课时单双周选择过渡效果*/
    opacity: 0
  }
  @media screen and (max-width: 1025px) {
    html {
    }
  }
</style>
