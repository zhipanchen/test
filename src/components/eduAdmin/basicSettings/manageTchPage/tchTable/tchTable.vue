<template>
  <div>
    <div id="dropdownInfo">
      <span><input type="text" id="tchName" class="inputWM" placeholder="请输入姓名" v-model="teacherinfoKey.teacherName" @click="tchNameClick"></span>
      <span><input type="text" id="tchID" class="inputWM" placeholder="请输入编号" v-model="teacherinfoKey.teacherId" @click="tchIdClick"></span>
      <!--教师姓名，编号输入框-->
      <span><button id="searchFor" class="am-btn am-btn-success am-radius buttonWM" @click="checkTchInfoClick()">查找</button></span>
      <span><button id="downloadForm" class="am-btn am-btn-success am-radius buttonWM" @click="downloadFormClick()">下载模板</button></span>
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
          action="./teacherManage/uploadTeacherInfo">
        <button type="ghost" id="leadIn" class="am-btn am-btn-success am-radius buttonWM">上传</button>
        </Upload>
      </span>
      <span><button id="leadOut" class="am-btn am-btn-success am-radius buttonWM" @click="downloadClick">下载</button></span>
      <!--查找，上传，下载按钮-->
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
    <!--文件上传失败信息弹窗-->
    <div id="tchTable" style="padding: 0.6rem 5rem;background-color: #f3f3f3">
      <table id="eduAdminTchTableSy" class="operationTable" style="table-layout: fixed;">
        <!--table-layout: fixed;固定表格格局-->
        <thead>
        <tr>
          <th width="10%">教师号</th>
          <th width="10%">姓名</th>
          <th width="20%">身份证号</th>
          <th width="8%">性别</th>
          <th width="10%">手机号码</th>
          <th width="8%">聘用校区</th>
          <th width="8%">教学职称</th>
          <th width="8%">工作职称</th>
          <th width="8%">教师类型</th>
          <th width="10%">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(teacherSimpleInfo,index) in teacherSimpleInfoList" :id="'inputTable'+index">
          <td><input :id="index + 'input1'" :value="teacherSimpleInfo.teacherId" readonly="readonly" style="border: none"></td>
          <td><input :id="index + 'input2'" :value="teacherSimpleInfo.teacherName" readonly="readonly" style="border: none"></td>
          <td><input :id="index + 'input3'" :value="teacherSimpleInfo.teacherIdcard" readonly="readonly" style="border: none"></td>
          <td><input :id="index + 'input4'" :value="teacherSimpleInfo.teacherGender" readonly="readonly" style="border: none"></td>
          <td><input :id="index + 'input5'" :value="teacherSimpleInfo.phoneNumber" readonly="readonly" style="border: none"></td>
          <td>
            <span v-if="teacherSimpleInfo.hireCampus==='1'"><input value="校本部" readonly="readonly" style="border: none;"></span>
            <span v-else><input value="新校区" readonly="readonly" style="border: none;"></span>
            <select :id="index + 'select'" class="selectWM" v-model="hireCampusEle" style="display: none">
              <option v-for="hireCampus in hireCampusList" :value="hireCampus">{{hireCampus}}</option>
            </select>
          </td>
          <td>
            <span v-if="teacherSimpleInfo.currentWorkTitle==='1'"><input value="助教" readonly="readonly" style="border: none;"></span>
            <span v-else-if="teacherSimpleInfo.currentWorkTitle==='2'"><input value="讲师" readonly="readonly" style="border: none;"></span>
            <span v-else-if="teacherSimpleInfo.currentWorkTitle==='3'"><input value="副教授" readonly="readonly" style="border: none;"></span>
            <span v-else-if="teacherSimpleInfo.currentWorkTitle==='4'"><input value="教授" readonly="readonly" style="border: none;"></span>
            <span v-else><input value="无" readonly="readonly" style="border: none;"></span>
            <select :id="index + 'select'" class="selectWM" v-model="currentWorkTitleEle" style="display: none">
              <option v-for="currentWorkTitle in currentWorkTitleList" :value="currentWorkTitle">{{currentWorkTitle}}</option>
            </select>
          </td>
          <td>
            <span v-if="teacherSimpleInfo.currentWorkDuty==='1'"><input value="医师" readonly="readonly" style="border: none;"></span>
            <span v-else-if="teacherSimpleInfo.currentWorkDuty==='2'"><input value="主治医师" readonly="readonly" style="border: none;"></span>
            <span v-else-if="teacherSimpleInfo.currentWorkDuty==='3'"><input value="副主任医师" readonly="readonly" style="border: none;"></span>
            <span v-else-if="teacherSimpleInfo.currentWorkDuty==='4'"><input value="主任医师" readonly="readonly" style="border: none;"></span>
            <span v-else-if="teacherSimpleInfo.currentWorkDuty==='5'"><input value="护士" readonly="readonly" style="border: none;"></span>
            <span v-else-if="teacherSimpleInfo.currentWorkDuty==='6'"><input value="护师" readonly="readonly" style="border: none;"></span>
            <span v-else-if="teacherSimpleInfo.currentWorkDuty==='7'"><input value="主管护师" readonly="readonly" style="border: none;"></span>
            <span v-else-if="teacherSimpleInfo.currentWorkDuty==='8'"><input value="副主任护师" readonly="readonly" style="border: none;"></span>
            <span v-else-if="teacherSimpleInfo.currentWorkDuty==='9'"><input value="主任护师" readonly="readonly" style="border: none;"></span>
            <span v-else><input value="无" readonly="readonly" style="border: none;"></span>
            <select :id="index + 'select'" class="selectWM" v-model="currentWorkDutyEle" style="display: none">
              <option v-for="currentWorkDuty in currentWorkDutyList" :value="currentWorkDuty">{{currentWorkDuty}}</option>
            </select>
          </td>
          <td>
            <span v-if="teacherSimpleInfo.teacherType==='1'"><input value="在职" readonly="readonly" style="border: none;"></span>
            <span v-else-if="teacherSimpleInfo.teacherType==='2'"><input value="离职" readonly="readonly" style="border: none;"></span>
            <span v-else><input value="外聘" readonly="readonly" style="border: none;"></span>
            <select :id="index + 'select'" class="selectWM" v-model="teacherTypeEle" style="display: none">
              <option v-for="teacherType in teacherTypeList" :value="teacherType">{{teacherType}}</option>
            </select>
          </td>
          <td>
            <img :id="'editImg'+index" title="修改" src="./images/edit.png" @click="editClick(index)">
            <img :id="'saveImg'+index" title="保存" src="./images/save.png" style="display: none" @click="saveClick(index)">
            <img :id="'deleteImg'+index" title="删除" src="./images/delete.png" @click="deleteClick(index)">
            <img :id="'restoreImg'+index" title="取消" src="./images/restore.png" style="display: none" @click="restoreClick(index)">
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <!--教师信息表格-->
    <div>
      <modal v-model="modalOperateBool" width="400" id="modalBody">
        <div style="text-align: center;font-size: 1.1rem;">
          <p v-if="operateMsg==='1'">是否确定保存修改</p>
          <p v-else-if="operateMsg==='2'">是否确定取消修改</p>
          <p v-else>是否确定删除</p>
        </div>
        <div slot="footer" style="text-align: center">
          <button v-if="operateMsg==='1'" id="modalBtn" @click="saveOk()">确定</button>
          <button v-else-if="operateMsg==='2'" id="modalBtn" @click="cancelOk()">确定</button>
          <button v-else id="modalBtn" @click="deleteOk()">确定</button>
          <button id="modalBtn" @click="operateCancel">取消</button>
        </div>
      </modal>
      <!--用户修改，取消修改教师信息，删除教师时，弹窗确认-->
      <modal v-model="modalResultBool" width="400" id="modalBody">
        <div style="text-align: center;font-size: 1.1rem;">
          <p v-if="operateMsg == '1'">保存修改失败</p>
          <p v-else-if="operateMsg == '3'">删除失败</p>
          <p v-else>处理出错</p>
        </div>
        <div slot="footer" style="text-align: center">
          <button id="modalBtn" @click="resultOk">确定</button>
        </div>
      </modal>
      <!--弹窗提示确认保存修改，删除失败信息-->
    </div>
  </div>
</template>

<script>
    export default {
        name: '',
        data () {
            return {
              teacherinfoKey: {
                teacherName: '',
                teacherId:''
            },
              hireCampusList:[
                '1:校本部','2:新校区'
              ],
              currentWorkTitleList:[
                '1:助教','2:讲师','3:副教授','4:教授','5:无'
              ],
              currentWorkDutyList:[
                '1:医师','2:主治医师','3:副主任医师','4:主任医师','5:护士','6:护师','7:主管护师','8:副主任护师','9:主任护师','10:无'
              ],
              teacherTypeList:[
                '1:在职','2:离职','3:外聘'
              ],
              hireCampusEle:'',
              currentWorkTitleEle:'',
              currentWorkDutyEle:'',
              teacherTypeEle:'',
              index:'',
              modalDownloadBool:false,
              modalOperateBool:false,
              modalResultBool:false,
              downloadMsg:'',
              operateMsg:'',
              resultMsg:'1',
              teacherSimpleInfoList:[
                  {teacherId:'11234567',teacherName:'何平',teacherIdcard:'321281199503285555',teacherGender:'男',phoneNumber:'15680991111',hireCampus:'1',currentWorkTitle:'1',currentWorkDuty:'3',teacherType:'1'},
                  {teacherId:'21234567',teacherName:'何平',teacherIdcard:'321281199503285555',teacherGender:'男',phoneNumber:'15680991111',hireCampus:'2',currentWorkTitle:'3',currentWorkDuty:'7',teacherType:'2'}
                ]
            }
        },
      beforeMount:function() {
        this.$http.post('./teacherManage/getTeacherInfo',{},{
          "Content-Type":"application/json"
        }).then(function (response) {
          console.log(response);
          this.teacherSimpleInfoList = response.body.teacherSimpleInfoList;
        },function(error){
          console.log("获取error");
        });
      },
      methods:{
        tchNameClick:function(){
          this.teacherinfoKey.teacherId = "";
        },
//        点击教师姓名输入框时，清空教师编号输入框
        tchIdClick:function(){
          this.teacherinfoKey.teacherName = "";
        },
//        点击教师编号输入框时，清空教师姓名输入框
        checkTchInfoClick:function() {
          this.$http.post('./teacherManage/findTeacherInfo',{
            "teacherName":this.teacherinfoKey.teacherName,
            "teacherId":this.teacherinfoKey.teacherId
          },{
            "Content-Type":"application/json"
          }).then(function (response) {
            console.log(response);
            var result = response.body.result;
            if(result === "0"){
              alert("请输入正确的教师信息！");
            }else{
              this.teacherSimpleInfoList = response.body.teacherSimpleInfoList;
            }
          },function(error){
            console.log("获取error");
          });
        },
//        提交教师姓名和编号，接收教师信息
        handleFormatError:function(){
          this.downloadMsg = "1";
          this.modalDownloadBool = true;
        },
//        处理上传文件格式不正确问题
        handleSizeError:function(){
          this.downloadMsg = "2";
          this.modalDownloadBool = true;
        },
//        处理上传文件过大问题
        handleProgress:function(){
          this.$Message.loading("正在上传中...");
        },
//        message提示：上传文件中
        handleSuccess:function(res){
          if(res.result==='1'){
            this.downloadMsg = "3";
            setTimeout("location.reload(true)", 4000); //4秒后刷新页面
          }else{
            this.downloadMsg = res.result;
          }
          this.modalDownloadBool = true;
        },
//        文件上传成功后，如果上传文件没有问题，4秒后刷新页面，如果文件内容出错，提示文件出错信息
        handleError:function(){
          this.downloadMsg = "4";
          this.modalDownloadBool = true;
        },
//        提示文件上传失败
        downloadFormClick:function(){
          location.href="./teacherManage/exportTeacherInfoTemplet";
        },
//        下载上传模板
        downloadClick:function(){
          location.href="./teacherManage/exportTeacherInfo";
        },
//        下载教师信息Excel表
        checkOk:function(){
          this.modalDownloadBool = false;
        },
//        用户确认文件上传操作结果
        editClick: function(index){
          var inputTable = document.getElementById("inputTable"+index);
          var input = inputTable.getElementsByTagName("input");
          var select = inputTable.getElementsByTagName("select");
          var editImg = document.getElementById("editImg"+index);
          var saveImg = document.getElementById("saveImg"+index);
          var deleteImg = document.getElementById("deleteImg"+index);
          var restoreImg = document.getElementById("restoreImg"+index);
          for(var i1=0;i1<2;i1++){
            var hireCampusSplit = this.hireCampusList[i1].split(":");
            if(this.teacherSimpleInfoList[index].hireCampus === hireCampusSplit[0]){
              this.hireCampusEle = this.hireCampusList[i1];
            }
          }
          for(var i2=0;i2<5;i2++){
            var currentWorkTitleSplit = this.currentWorkTitleList[i2].split(":");
            if(this.teacherSimpleInfoList[index].currentWorkTitle === currentWorkTitleSplit[0]){
              this.currentWorkTitleEle = this.currentWorkTitleList[i2];
            }
          }
          for(var i3=0;i3<10;i3++){
            var currentWorkDutySplit = this.currentWorkDutyList[i3].split(":");
            if(this.teacherSimpleInfoList[index].currentWorkDuty === currentWorkDutySplit[0]){
              this.currentWorkDutyEle = this.currentWorkDutyList[i3];
            }
          }
          for(var i4=0;i4<3;i4++){
            var teacherTypeSplit = this.teacherTypeList[i4].split(":");
            if(this.teacherSimpleInfoList[index].teacherType === teacherTypeSplit[0]){
              this.teacherTypeEle = this.teacherTypeList[i4];
            }
          }
//          用户点击编辑图标时，下拉框内默认为当前用户信息
          for(var i = 5;i<9;i++){
            input[i].style.display = "none";
            select[i-5].style.display = "inline";
          }
          editImg.style.display = "none";
          saveImg.style.display = "inline";
          deleteImg.style.display = "none";
          restoreImg.style.display = "inline";
        },
//        修改教师信息
        saveClick:function(index){
          this.modalOperateBool = true;
          this.operateMsg = "1";
          this.index = index;
        },
//        保存对教师信息的修改时，弹窗确认
        restoreClick:function(index){
          this.modalOperateBool = true;
          this.operateMsg = "2";
          this.index = index;
        },
//        取消对教师信息的修改时，弹窗确认
        deleteClick:function(index){
          this.modalOperateBool = true;
          this.operateMsg = "3";
          this.index = index;
        },
//        删除教师时，弹窗确认
        saveOk: function(){
          var inputTable = document.getElementById("inputTable"+this.index);
          var input = inputTable.getElementsByTagName("input");
          var select = inputTable.getElementsByTagName("select");
          var editImg = document.getElementById("editImg"+this.index);
          var saveImg = document.getElementById("saveImg"+this.index);
          var deleteImg = document.getElementById("deleteImg"+this.index);
          var restoreImg = document.getElementById("restoreImg"+this.index);
          var hireCampusSplit = this.hireCampusEle.split(":");
          var currentWorkTitleSplit = this.currentWorkTitleEle.split(":");
          var currentWorkDutySplit = this.currentWorkDutyEle.split(":");
          var teacherTypeSplit = this.teacherTypeEle.split(":");
          this.$http.post('./teacherManage/editTeacherInfo',{
            "teacherId":input[0].value,
            "hireCampus":hireCampusSplit[0],
            "currentWorkTitle":currentWorkTitleSplit[0],
            "currentWorkDuty":currentWorkDutySplit[0],
            "teacherType":teacherTypeSplit[0]
          },{
            "Content-Type":"application/json"
          }).then(function (response) {
            console.log(response);
            this.resultMsg=response.body.result;
            if(this.resultMsg==='1'){
              this.teacherSimpleInfoList[this.index].hireCampus = hireCampusSplit[0];
              this.teacherSimpleInfoList[this.index].currentWorkTitle = currentWorkTitleSplit[0];
              this.teacherSimpleInfoList[this.index].currentWorkDuty = currentWorkDutySplit[0];
              this.teacherSimpleInfoList[this.index].teacherType = teacherTypeSplit[0];
              this.$Message.success("保存成功！");
            }else{
              this.modalResultBool = true;
            }
          },function(error){
            console.log("获取error");
          });
          for(var i = 5;i<9;i++){
            input[i].style.display = "inline";
            select[i-5].style.display = "none";
          }
          this.modalOperateBool = false;
          editImg.style.display = "inline";
          saveImg.style.display = "none";
          deleteImg.style.display = "inline";
          restoreImg.style.display = "none";
        },
//        保存对教师信息的修改
        cancelOk: function(){
          var inputTable = document.getElementById("inputTable"+this.index);
          var input = inputTable.getElementsByTagName("input");
          var select = inputTable.getElementsByTagName("select");
          var editImg = document.getElementById("editImg"+this.index);
          var saveImg = document.getElementById("saveImg"+this.index);
          var deleteImg = document.getElementById("deleteImg"+this.index);
          var restoreImg = document.getElementById("restoreImg"+this.index);
          for(var i = 5;i<9;i++){
            input[i].style.display = "inline";
            select[i-5].style.display = "none";
          }
          this.modalOperateBool = false;
          editImg.style.display = "inline";
          saveImg.style.display = "none";
          deleteImg.style.display = "inline";
          restoreImg.style.display = "none";
        },
//        取消对教师信息的修改
        deleteOk: function(){
          this.$http.post('./teacherManage/deleteTeacherInfo',{
            "teacherId":this.teacherSimpleInfoList[this.index].teacherId
          },{
            "Content-Type":"application/json"
          }).then(function (response) {
            console.log(response);
            this.resultMsg=response.body.result;
            if(this.resultMsg==='1'){
              this.teacherSimpleInfoList.splice(this.index,1);
              this.$Message.success("删除成功！");
            }else{
              this.modalResultBool = true;
            }
          },function(error){
            console.log("获取error");
          });
          this.modalOperateBool = false;
        },
//        删除教师及其所有信息
        operateCancel:function(){
          this.modalOperateBool = false;
        },
//        取消掉保存，删除，取消保存等操作
        resultOk: function(){
          this.modalResultBool = false;
        }
//        确认操作失败信息
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
    .inputWM{
      width: 8rem;
      margin: 0 0.7rem;
      text-align: left;
    }
    .buttonWM{
      width: 5.6rem;
      margin: 0 0.7rem;
    }
    .selectWM{
      width: 80%;
    }
    input{
      width: 80%;
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
