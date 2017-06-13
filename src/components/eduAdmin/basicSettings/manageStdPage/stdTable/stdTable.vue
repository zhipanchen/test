<template>
    <div>
      <div id="dropdownInfo">
        <select id="yearTypeSelect" class="selectWM" v-model="studentinfoKey.schoolYearType" @click="yearTypeClick()">
          <option value="0">选择年制</option>
          <option v-for="yearAndClass in yearAndClassList" :value="yearAndClass.yearType">{{yearAndClass.yearType}}年制</option>
        </select>
        <!--年制选择下拉列表-->
        <select id="gradeSelect" class="selectWM" v-model="studentinfoKey.gradeId" @click="indexYearTypeClick()">
          <option value="0">选择年级</option>
          <option v-if="studentinfoKey.schoolYearType!='0'" v-for="yearEle in yearAndClassList[indexYearType].gradeList" :value="yearEle.gradeId">{{yearEle.gradeName}}级</option>
        </select>
        <!--年级选择下拉列表-->
        <select id="classSelect" class="selectWM" v-model="studentinfoKey.classId" @click="indexGradeClick()">
          <option value="0">选择班级</option>
          <option v-if="studentinfoKey.gradeId!='0'" v-for="classEle in yearAndClassList[indexYearType].gradeList[indexGrade].classList " :value="classEle.classId">{{classEle.className}}</option>
        </select>
        <!--班级选择下拉列表-->
        <span><input type="text" id="stdID" class="inputWM" placeholder="请输入学号" v-model="studentinfoKey.studentId"></span>
        <span><button id="searchFor" class="am-btn am-btn-success am-radius buttonWM" @click="checkStdInfoClick()">查找</button></span>
        <span><button id="downloadForm" class="am-btn am-btn-success am-radius buttonWM" @click="downloadFormClick">下载模板</button></span>
        <span style="display: inline-block">
          <Upload
            ref="upload"
            :show-upload-list = false
            :format="['xls','xlsx']"
            :max-size="2048"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleSizeError"
            :on-progress="handleProgress"
            :on-success="handleSuccess"
            :on-error="handleError"
            action="./studentManage/uploadStudentSimpleInfo">
          <button type="ghost" id="leadIn" class="am-btn am-btn-success am-radius buttonWM">上传</button>
          </Upload>
        </span>
        <span><button id="leadOut" class="am-btn am-btn-success am-radius buttonWM" @click="downloadClick">下载</button></span>
        <!--查找，下载，上传按钮-->
        <modal v-model="modalCheckBool" width="400" id="modalBody">
          <div style="text-align: center;font-size: 1.1rem;">
            <p >请输入正确的学生信息!</p>
          </div>
          <div slot="footer" style="text-align: center">
            <button id="modalBtn" @click="resultCheckOk">确定</button>
          </div>
        </modal>
        <!--查找时学生信息不明确，弹窗提示-->
      </div>
      <div>
        <modal v-model="modalDownloadBool" width="400" id="modalBody">
          <div style="text-align: center;font-size: 1.1rem;">
            <p v-if="downloadMsg === '1'">文件格式不正确，请上传xls或xlsx表格。</p>
            <p v-else-if="downloadMsg === '2'">文件太大，不能超过 2M</p>
            <p v-else-if="downloadMsg === '3'">上传成功!</p>
            <p v-else-if="downloadMsg === '4'">上传失败!</p>
            <p v-else>{{downloadMsg}}</p>
          </div>
          <div slot="footer" style="text-align: center">
            <button id="modalBtn" @click="checkOk">确定</button>
          </div>
        </modal>
      </div>
      <!--上传文件出错信息提示弹窗-->
      <div style="padding: 0.6rem 5rem;background-color: #f3f3f3">
        <div id="stdTable" style="background-color: white">
          <table id="eduAdminStdTableSy" class="operationTable" style="table-layout: fixed;">
            <!--table-layout: fixed;固定表格格局-->
            <thead>
            <tr>
              <th width="16%">学号</th>
              <th width="10%">姓名</th>
              <th width="20%">身份证号码</th>
              <th width="7%">性别</th>
              <th width="7%">学制</th>
              <th width="10%">年级</th>
              <th width="10%">专业</th>
              <th width="10%">班级</th>
              <th width="10%">操作</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(studentSimpleInfo,index) in studentSimpleInfoList" :id="'inputTable'+index">
              <td><input id="input1" :value="studentSimpleInfo.studentId" readonly="readonly" style="border: none"></td>
              <td><input id="input2" :value="studentSimpleInfo.studentName" readonly="readonly" style="border: none"></td>
              <td><input id="input3" :value="studentSimpleInfo.studentIDcard" readonly="readonly" style="border: none"></td>
              <td><input id="input4" :value="studentSimpleInfo.studentGender" readonly="readonly" style="border: none"></td>
              <td><input id="input5" :value="studentSimpleInfo.schoolYearType" readonly="readonly" style="border: none"></td>
              <td><input id="input6" :value="studentSimpleInfo.gradeName" readonly="readonly" style="border: none"></td>
              <td><input id="input7" :value="studentSimpleInfo.specialityName" readonly="readonly" style="border: none"></td>
              <td><input id="input8" :value="studentSimpleInfo.className" readonly="readonly" style="border: none;"></td>
              <td>
                <img :id="'deleteImg'+index" title="删除" src="./images/delete.png" @click="deleteClick(index)">
              </td>
            </tr>
            </tbody>
          </table>
          <!--学生信息表格-->
        </div>
      </div>
      <div>
        <modal v-model="modalOperateBool" width="400" id="modalBody">
          <div style="text-align: center;font-size: 1.1rem;">
            <p v-if="operateMsg==='3'">是否确定删除</p>
          </div>
          <div slot="footer" style="text-align: center">
            <button v-if="operateMsg==='3'" id="modalBtn" @click="deleteOk()">确定</button>
            <button id="modalBtn" @click="operateCancel">取消</button>
          </div>
        </modal>
        <!--确认保存、删除操作弹窗-->
        <modal v-model="modalResultBool" width="400" id="modalBody">
          <div style="text-align: center;font-size: 1.1rem;">
            <p v-if="operateMsg === '3'">删除失败</p>
            <p v-else>处理出错</p>
          </div>
          <div slot="footer" style="text-align: center">
            <button id="modalBtn" @click="resultOk">确定</button>
          </div>
        </modal>
        <!--操作失败提示弹窗-->
      </div>
    </div>
</template>

<script>
    export default {
        name: '',
        data () {
            return {
              indexYearType:'0',
              indexGrade:'0',
              studentinfoKey:{
                schoolYearType:'0',
                gradeId:'0',
                classId:'0',
                studentId:''
              },
              yearAndClassList:[
                {
                  yearType:'3',
                  gradeList:[
                    {
                      gradeName:'2012',
                      gradeId:'20123',
                      classList:[
                        {className:'护理2班',classId:'111'},
                        {className:'临床2班',classId:'222'}
                      ]
                    },
                    {
                      gradeName:'2013',
                      gradeId:'20133',
                      classList:[
                        {className:'护理3班',classId:'333'},
                        {className:'临床3班',classId:'444'}
                      ]
                    }
                  ]
                },
                {
                  yearType:'5',
                  gradeList:[
                    {
                      gradeName:'2015',
                      gradeId:'20155',
                      classList:[
                        {className:'护理3班',classId:'555'},
                        {className:'临床4班',classId:'666'}
                      ]
                    }
                  ]
                }
              ],
              studentSimpleInfoList:[
                  {studentId:'1530310503',studentName:'高兴月',studentIDcard:'321281199503281111',studentGender:'女',schoolYearType:'5',gradeName:'2015',specialityName:'护理',className:'护理3班',birthdate:'1993.02.03',ethno:'汉',nativePlace:'上海',phoneNumber:'15680992212',houseAddress:'成都市青牛区'},
                  {studentId:'1530310503',studentName:'高兴月',studentIDcard:'321281199503281111',studentGender:'女',schoolYearType:'3',gradeName:'2013',specialityName:'护理',className:'护理3班',birthdate:'1993.02.03',ethno:'汉',nativePlace:'上海',phoneNumber:'15680992212',houseAddress:'成都市青牛区'}
                ],
              classNameEle:'',
              index:'0',
              modalCheckBool: false,
              yearTypeClassIndex:'0',
              gradeClassIndex:'0',
              modalDownloadBool:false,
              modalOperateBool:false,
              modalResultBool:false,
              downloadMsg:'',
              operateMsg:'',
              resultMsg:'1'
            }
        },
      beforeMount:function() {
        this.$http.post('./studentManage/getGradeAndClassList',{},{
          "Content-Type":"application/json"
        }).then(function (response) {
          console.log(response);
          this.yearAndClassList = response.body.getGradeAndClassObj.yearAndClassList;
          this.studentSimpleInfoList = response.body.getGradeAndClassObj.studentSimpleInfoList;
        },function(error){
          console.log("获取error");
        });
      },
//      初始化函数，获取年制、年级、班级信息，用于select下拉框，获取学生信息，用于学生信息table
      methods:{
        yearTypeClick: function(){
          this.studentinfoKey.gradeId = '0';
          this.studentinfoKey.classId = '0';
        },
//        点击年制下拉框时，将年级、班级下拉框清空
        indexYearTypeClick: function(){
          this.studentinfoKey.classId = '0';
          for(var i=0;i<this.yearAndClassList.length;i++){
            if(this.studentinfoKey.schoolYearType === this.yearAndClassList[i].yearType){
              this.indexYearType = i;
            }
          }
        },
//        点击选择年制后，将年级下拉框下拉的可选内容改为相应年制的年级
        indexGradeClick: function(){
          for(var j=0;j<this.yearAndClassList[this.indexYearType].gradeList.length;j++){
            if(this.studentinfoKey.gradeId === this.yearAndClassList[this.indexYearType].gradeList[j].gradeId){
              this.indexGrade = j;
            }
          }
        },
//        点击选择年级后，将班级下拉框下拉的可选内容改为相应年级的班级
        checkStdInfoClick: function(){
          this.$http.post('./studentManage/findStudentInfo',{
            "schoolYearType":this.studentinfoKey.schoolYearType,
            "gradeId":this.studentinfoKey.gradeId,
            "classId":this.studentinfoKey.classId,
            "studentId":this.studentinfoKey.studentId
          },{
            "Content-Type":"application/json"
          }).then(function (response) {
            console.log(response);
            var result = response.body.result;
            if(result === "0"){
              this.modalCheckBool = true;
            }else{
              this.studentSimpleInfoList = response.body.studentSimpleInfoList;
            }
          },function(error){
            console.log("获取error");
          });
        },
//        查询学生成绩：向后台提交年制、年级、班级，后台返回相应的学生信息
        resultCheckOk:function(){
          this.modalCheckBool = false;
        },
//        确认查询成绩信息错误
        handleFormatError:function(){
          this.downloadMsg = "1";
          this.modalDownloadBool = true;
        },
//        处理文件格式出错问题
        handleSizeError:function(){
          this.downloadMsg = "2";
          this.modalDownloadBool = true;
        },
//        处理文件大小超过限制问题
        handleProgress:function(){
          this.$Message.loading("正在上传中...");
        },
//        提示用户文件正在上传
        handleSuccess:function(res){
          if(res.result=='1'){
            this.downloadMsg = "3";
            setTimeout("location.reload(true)", 4000); //4秒后刷新页面
          }else{
            this.downloadMsg = res.result;
          }
          this.modalDownloadBool = true;
        },
//        处理文件上传失败（文件已上传到数据库，但文件内容问题）或者成功事件，如果上传成功，4秒后刷新页面
        handleError:function(){
          this.downloadMsg = "4";
          this.modalDownloadBool = true;
        },
//        处理文件上传失败事件（文件未上传到数据库）
        downloadFormClick:function(){
          location.href="./studentManage/exportStudentSimpleInfoTemplet";
        },
//        下载模板
        downloadClick:function(){
          location.href="./studentManage/exportStudentSimpleInfo";
        },
//        下载学生信息文件
        checkOk:function(){
          this.modalDownloadBool = false;
        },
//        确认文件上传结果弹窗
        deleteClick:function(index){
          this.modalOperateBool = true;
          this.operateMsg = "3";
          this.index = index;
        },
//        删除学生信息时，弹窗让用户确认
        deleteOk: function(index){
          this.$http.post('./studentManage/deleteStudentInfo',{
            "studentId":this.studentSimpleInfoList[this.index].studentId
          },{
            "Content-Type":"application/json"
          }).then(function (response) {
            console.log(response);
            this.resultMsg=response.body.result;
            if(this.resultMsg==='1'){
              this.studentSimpleInfoList.splice(this.index,1);
              this.$Message.success("删除成功！");
            }else{
              this.modalResultBool = true;
            }
          },function(error){
            console.log("获取error");
          });
          this.modalOperateBool = false;
        },
//        确认删除学生信息操作
        operateCancel:function(){
          this.modalOperateBool = false;
        },
//        取消学生信息操作
        resultOk: function(){
          this.modalResultBool = false;
        }
//        确认学生信息操作结果
      }
    }
</script>

<style scoped>
    html {
        font-size: 62.5%;
    }
    #dropdownInfo{
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
      text-align: left;
    }
    .buttonWM{
      width: 5.6rem;
      margin: 0 0.7rem;
    }
    input{
      width:80%;
      text-align: center;
    }
    img{
      width: 2rem;
      height: 2rem;
      border: thin solid white;
    }
    img:hover{
      cursor: pointer;
      border: thin solid grey;
    }

    @media screen and (max-width: 1023px) {
        html {
            font-size: 56%;
        }
    }
</style>
