<template>
  <div>
    <div  class="positionBar">
      <span>您当前的位置：</span>
      <span><a href="#/login/main/eduAdminHome" class="returnHome">首页</a></span>
      <span>>个人信息</span>
    </div>
    <div id="selfMessage-teacher-tableDiv">
            <div id="tableLeft">
                <span id="subtitle1">{{subtitle1}}</span>
           <ul>
               <li id="li"><a href="#/teacher/personInfo/basicMessage">基本信息</a></li>
               <li><a href="#/teacher/info/educationManege">教育管理</a></li>
               <li><a href="#/teacher/info/certificateManege">证书管理</a></li>
               <li><a href="#/teacher/info/experience">一线工作经历</a></li>
               <!--<li><a href="#">教学进修</a></li>-->
               <li><a href="#/teacher/info/passwdChange">密码修改</a></li>
           </ul>
            </div>
            <div id="tableRight">
                <span id="subtitle2">{{subtitle2}}</span>
                <div id="tableDiv">
                <table>
                    <tr>
                        <td>工号：</td>
                        <td><input type="text" v-model="teacherId"  readonly/></td>
                    </tr>
                    <tr>
                        <td>所属教研组：</td>
                        <td><input type="text" v-model="targroupName" readonly/></td>
                    </tr>
                    <tr>
                        <td>姓名：</td>
                        <td><input type="text" v-model="teacherName"  readonly/></td>
                    </tr>
                    <tr>
                        <td>性别：</td>
                        <td><input type="text" onkeyup="this.value=this.value.replace(/\s+/g,'')"  v-model="teacherGender"/></td>
                    </tr>
                    <tr>
                        <td>出生年月：</td>
                        <td><Date-picker  v-model.lazy="birthdate" type="date" placeholder="选择日期" style="width: 8.5rem;"></Date-picker></td>
                    </tr>
                    <tr>
                        <td>身份证号;</td>
                        <td><input onkeyup="this.value=this.value.replace(/\D/g,'')" type="text" v-model="teacherIDcard" /></td>
                    </tr>
                    <tr>
                        <td>参加工作时间：</td>
                        <td><Date-picker  v-model.lazy="worktime" type="date" placeholder="选择日期" style="width: 8.5rem;"></Date-picker></td>
                    </tr>
                    <tr>
                        <td>当前工作单位：</td>
                        <td><input onkeyup="this.value=this.value.replace(/\s+/g,'')" type="text" v-model="currentWorkUnit" /></td>
                    </tr>




                </table>
                <table>

                    <tr>
                        <td>是否双师型：</td>
                        <td><input type="text" v-model="isDoubleTeacher"  readonly/></td>
                    </tr>
                    <tr>
                        <td>聘用校区：</td>
                        <td><input type="text" v-model="hireCampus"  readonly/></td>
                    </tr>
                    <tr>
                        <td>联系电话;</td>
                        <td><input type="text" onkeyup="this.value=this.value.replace(/\D/g,'')"  v-model="phoneNumber" /></td>
                    </tr>
                    <tr>
                        <td>Email：</td>
                        <td><input onkeyup="this.value=this.value.replace(/\s+/g,'')" type="text" v-model="emailAddress" /></td>
                    </tr>
                    <tr>
                        <td>QQ：</td>
                        <td><input type="text" onkeyup="this.value=this.value.replace(/\D/g,'')" v-model="qqNumber" /></td>
                    </tr>
                  <tr>
                    <td>临床工作年限：</td>
                    <td><input type="text" onkeyup="this.value=this.value.replace(/\s+/g,'')" v-model="clinicWorkYear" /></td>
                  </tr>
                  <tr>
                    <td>当前工作职务：</td>
                    <td><input type="text" onkeyup="this.value=this.value.replace(/\s+/g,'')" v-model="currentWorkDuty"  readonly/></td>
                  </tr>
                  <tr>
                    <td>当前工作职称：</td>
                    <td><input type="text" onkeyup="this.value=this.value.replace(/\s+/g,'')" v-model="currentWorkTitle"  readonly/></td>
                  </tr>
                </table>
                </div>
                <div id="buttonDiv">
                <button class="am-btn am-btn-success am-radius" @click="saveDia(teacherId,targroupName,
                teacherName,teacherGender,birthdate,teacherIDcard,worktime,currentWorkUnit,isDoubleTeacher,hireCampus,
                phoneNumber,emailAddress,qqNumber,clinicWorkYear,currentWorkDuty,currentWorkTitle)" >保存</button>
                <button class="am-btn am-btn-success am-radius" @click="cancelDia()">取消</button>
                </div>
                <div>
    </div>
              </div>
      <Modal
        v-model="modal1"
        width="400"
        :mask-closable="false"
        id="modalBody"
        :styles="{top:'10rem'}">
        <div style="font-size: 1.1rem;text-align: center;">
          <p>您确定提交保存该信息吗？</p>
        </div>
        <div slot="footer" style="text-align: center">
          <button id="modalBtn" @click="save(oteacherId,otargroupName,
                oteacherName,oteacherGender,obirthdate,oteacherIDcard,oworktime,ocurrentWorkUnit,oisDoubleTeacher,ohireCampus,
                ophoneNumber,oemailAddress,oqqNumber,oclinicWorkYear,ocurrentWorkDuty,ocurrentWorkTitle)">确定</button>
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
          <p>您确定取消操作吗？?</p>
        </div>
        <div slot="footer" style="text-align: center">
          <button id="modalBtn" @click="cancel()">确定</button>
          <button id="modalBtn" @click="modal2 = false">取消</button>
        </div>
      </Modal>

      </div>
  </div>
</template>

<script>
    export default {
        name:'selfMessage-teacher-tableDiv',
        data () {
                       return {
                               subtitle1:'个人信息',
                               subtitle2:'基本信息',
                               teacherId:'',
                               targroupName:'',
                               teacherName:'',
                               teacherGender:'',
                               birthdate:'',
                               teacherIDcard:'',
                               worktime:'',
                               currentWorkUnit:'',
                               isDoubleTeacher:'',
                               hireCampus:'',
                               phoneNumber:'',
                               emailAddress:'',
                               qqNumber:'',
                               clinicWorkYear:'',
                               currentWorkDuty:'',
                               currentWorkTitle:'',
                         oteacherId:'',
                         otargroupName:'',
                         oteacherName:'',
                         oteacherGender:'',
                         obirthdate:'',
                         oteacherIDcard:'',
                         oworktime:'',
                         ocurrentWorkUnit:'',
                         oisDoubleTeacher:'',
                         ohireCampus:'',
                         ophoneNumber:'',
                         oemailAddress:'',
                         oqqNumber:'',
                         oclinicWorkYear:'',
                         ocurrentWorkDuty:'',
                         ocurrentWorkTitle:'',
                                modal1: false,
                                modal2: false
                               }
                    },
      beforeMount:function(){
        this.$http.post('./teacherManage/getTeacherBasicInfo',{},
//        this.$http.post('../jsonphp/basic.php',{},
          {"Content-Type":"application/json"}).then(function (response) {
            console.log(response);
                this.teacherId=response.body.teacherId;
                this.targroupName=response.body.targroupName;
                this.teacherName=response.body.teacherName;
                this.teacherGender=response.body.teacherGender;
                this.birthdate=response.body.birthdate;
                this.teacherIDcard=response.body.teacherIDcard;
                this.worktime=response.body.worktime;
                this.currentWorkUnit=response.body.currentWorkUnit;
                this.isDoubleTeacher=response.body.isDoubleTeacher;
                this.hireCampus=response.body.hireCampus;
                this.phoneNumber=response.body.phoneNumber;
                this.emailAddress=response.body.emailAddress;
                this.qqNumber=response.body.qqNumber;
                this.clinicWorkYear=response.body.clinicWorkYear;
                this.currentWorkDuty=response.body.currentWorkDuty;
                this.currentWorkTitle=response.body.currentWorkTitle
          },
          function(error){
            console.log("获取error:");
            console.log(error);
          });
      },
      methods: {
        //保存的对话框打开
        saveDia:function(teacherId,targroupName,
                         teacherName,teacherGender,birthdate,teacherIDcard,worktime,currentWorkUnit,isDoubleTeacher,hireCampus,
                         phoneNumber,emailAddress,qqNumber,clinicWorkYear,currentWorkDuty,currentWorkTitle){
            this.oteacherId=teacherId;
            this.otargroupName=targroupName;
            this.oteacherName=teacherName;
            this.oteacherGender=teacherGender;
            this.obirthdate=birthdate;
            this.oteacherIDcard=teacherIDcard;
            this.oworktime=worktime;
            this.ocurrentWorkUnit=currentWorkUnit;
            this.oisDoubleTeacher=isDoubleTeacher;
            this.ohireCampus=hireCampus;
            this.ophoneNumber=phoneNumber;
            this.oemailAddress=emailAddress;
            this.oclinicWorkYear=clinicWorkYear;
            this.oqqNumber=qqNumber;
            this.ocurrentWorkDuty=currentWorkDuty;
            this.ocurrentWorkTitle=currentWorkTitle;
            this.modal1 = true;
        },
        //取消的对话框
        cancelDia:function(){
          this.modal2 = true;
        },
        //保存功能
        save:function(teacherId,targroupName,
                      teacherName,teacherGender,birthdate,teacherIDcard,worktime,currentWorkUnit,isDoubleTeacher,hireCampus,
                      phoneNumber,emailAddress,qqNumber,clinicWorkYear,currentWorkDuty,currentWorkTitle){
          this.modal1 = false;
//          console.log(qqNumber);
//          this.$http.post('../jsonphp/basic.php',{
          this.$http.post('./teacherManage/editTeacherBasicInfo',{
            "teacherId":teacherId,
            "targroupName":targroupName,
            "teacherName":teacherName,
            "teacherGender":teacherGender,
            "birthdate":birthdate,
            "teacherIDcard":teacherIDcard,
            "worktime":worktime,
            "currentWorkUnit":currentWorkUnit,
            "isDoubleTeacher":isDoubleTeacher,
            "hireCampus":hireCampus,
            "phoneNumber":phoneNumber,
            "emailAddress":emailAddress,
            "clinicWorkYear":clinicWorkYear,
            "qqNumber":qqNumber,
            "currentWorkDuty":currentWorkDuty,
            "currentWorkTitle":currentWorkTitle
          },{"Content-Type":"application/json"}).then(function (response) {
              console.log("传递:");
              console.log(response.body);
              if(response.body.result=="1")
              {this.$Message.success('操作成功！');}
            },
            function(error){
              console.log("传递error:");
              console.log(error);
            });
        },
        //取消功能
        cancel:function(){
          location.reload();
        }
      }

    }

</script>

<style lang="css" scoped>
  @import '../../../../assets/css/external.css';
  @media screen and (max-width:480px){
    html {
      font-size: 24px;
    }
  }
  @media screen and (max-width:640px){
    html {
      font-size: 32px;
    }
  }
  @media screen and (max-width:720px){
    html {
      font-size: 36px;
    }
  }
    html{
        font-size: 16px;
    } /*整个页面的样式*/
    #selfMessage-teacher-tableDiv{
       position:relative;
        display: flex;
        height:30rem;
      background-color: #f3f3f3;
    }/*整个桌面的大小*/
    #tableLeft{
        position:relative;
        top:2rem;
        left:4rem;
        height:30rem;
        width:20%;
        background-color: white;
        text-align: center;
        border:0.15rem solid lightgrey;
    }/*左侧的CSS*/
    #tableRight{
        position: relative;
        float:right;
        top:2rem;
        margin-left:7rem;
        height:30rem;
        width:65%;
        background-color: white;
        text-align: left;
        border:0.15rem solid lightgrey;
        padding-left:1rem;
        padding-right:1rem;
    }/*右侧的CSS*/
    #tableDiv{
        display: flex;
        justify-content: space-between;
        padding: 1rem 3rem;
        border-top: 0.15rem solid #158064;
        position: relative;
        top:1rem;
        height:20rem;
    }/*表格的CSS*/
    #subtitle1{
        font-size: 1.3rem;
        position: relative;
        top:0.5rem;

    }/*标题一*/
    #subtitle2{
        font-size: 1.3rem;
        position: relative;
        top:0.5rem;
        left:2rem;
    }/*标题二*/
    ul{ list-style-type:none;}/*去点*/
    li{
        height:3rem;
        border-bottom:0.15rem solid lightgrey ;
        position: relative;
        right: 1.2rem;
        display: flex;
        align-items: center;
        justify-content: center;

    }/*列表*/
    #li{
        border-top: 0.15rem solid #158064;
    }/*左边绿色的那条线*/
     #buttonDiv{
        position: relative;
        top:2rem;
        display: flex;
      justify-content: center;
    }
    button{
     width:5.6rem;
     margin:0.7rem;
    }
   input{
       width:10rem;
   }
</style>
