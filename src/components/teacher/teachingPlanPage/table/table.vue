<template>
  <div id="table">
    <div  class="positionBar">
      <span>您当前的位置：</span>
      <span><a href="#/login/main/eduAdminHome" class="returnHome">首页</a></span>
      <span>>授课计划</span>
    </div>
    <div id="sel">
      <select  @change="chooseTerm(option2)" v-model="option2">
        <option v-for="option2 in semesterList" :value="option2">
          {{ option2 }}
        </option>
      </select>

    </div>
    <div id="back">
    <div id="show">
      <table class="operationTable">
        <thead>
        <tr>
          <th>上传教师</th>
          <th>教师ID</th>
          <th>课程名称</th>
          <th>类别</th>
          <th>上传时间</th>
          <th>导出</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr  v-for="(data,index) in tableList" :key="data.uploadTime">
          <td v-text="data.teacherName"></td>
          <td v-text="data.teacherId"></td>
          <td v-text="data.courseName"></td>
          <td v-text="data.coursewareType"></td>
          <td v-text="data.uploadTime"></td>
          <td><form action="./courseTeachPlan/leaderDownloadTeachPlan" method="get"><input v-model="data.teacherId" name="teacherId" readonly style="display: none"><input v-model="data.courseId" name="courseId" readonly style="display: none"><input v-model="data.type" name="coursewareType" readonly style="display: none"><button class="am-btn am-btn-success am-radius" :id="'down'+index" type="submit">下载</button></form></td>
          <td ><button :id="'buttonOne'+index" @click="successDia(index)" title="通过" class="circle" >√</button>
              <button :id="'buttonTwo'+index" @click="failDia(index)" title="不通过" class="circle" >×</button>
              <!--<img  height="30" width="30"  :src="Src1">-->
              <!--<img height="30" width="30"   :src="Src2">-->
          </td>
        </tr>
        </tbody>
      </table>
        <!--<Upload-->
        <!--ref="upload"-->
        <!--:show-upload-list="false"-->
        <!--:format="['xls','xlsx']"-->
        <!--:max-size="2048"-->
        <!--:on-format-error="handleFormatError"-->
        <!--:on-exceeded-size="handleSize"-->
        <!--:on-success="handleSuccess"-->
        <!--:on-progress="handleProgress"-->
        <!--:on-error="handleError"-->
        <!--action="../updateTest/updata.php">-->
          <!--<i-button id="ibutton" type="ghost">上传文件</i-button>-->
        <!--</Upload>-->
    </div>
    </div>
    <Modal
      v-model="modal1"
      width="400"
      :mask-closable="false"
      id="modalBody"
      :styles="{top:'10rem'}">
      <div style="font-size: 1.1rem;text-align: center;">
        <p>确认审核通过？</p>
      </div>
      <div slot="footer" style="text-align: center">
        <button id="modalBtn" @click="success(oindex)">确定</button>
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
        <p>确认审核不通过？?</p>
      </div>
      <div slot="footer" style="text-align: center">
        <button id="modalBtn" @click="fail(oindex)">确定</button>
        <button id="modalBtn" @click="modal2 = false">取消</button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import icon1 from'../table/right.png'
  import icon2 from'../table/wrong.png'
    export default {
      name: 'table',
      data () {
            return {
              Src1:icon1,
              Src2:icon2,
              option2:'2016.1',
              semesterList: [
              ],
              tableList:[],
              modal1:false,
              modal2:false,
              oindex:''
//              tableList:[{teacherId:"1"},{teacherId:"2"}]
            }
      },
      //打开页面判断状态 auditStatus
      mounted:function(){
////        this.$http.post('../jsonphp/teachingPlan.php',{},{"Content-Type":"application/json"}).then(function (response) {
//            this.$http.post('./courseTeachPlan/showTeachPlan',{},{"Content-Type":"application/json"}).then(function (response) {
//            this.tableList = response.body.tableList;
//            this.semesterList = response.body.semesterList;
//            this.option2 = response.body.currentSemester;
//            for( var i=0;i<this.tableList.length;i++){
//              console.log(this.tableList[i]);
//              if(this.tableList[i].auditStatus =="0")
//              {
//                var buttonTwo = document.getElementById("buttonTwo"+i);
//                buttonTwo.style.display = "none";
//                var buttonOne = document.getElementById("buttonOne"+i);
//                buttonOne.disabled = "true";
//                buttonOne.style.backgroundColor="white";
//                buttonOne.style.border="grey solid thin";
//                buttonOne.style.color="grey";
//              }else if(this.tableList[i].auditStatus =="1"){
//                var buttonTwoo = document.getElementById("buttonTwo"+i);
//                buttonTwoo.style.display = "none";
//                var buttonOnee = document.getElementById("buttonOne"+i);
//                buttonOnee.disabled = "true";
//                buttonOnee.style.backgroundColor="white";
//                buttonOnee.style.border="grey solid thin";
//                buttonOnee.style.color="grey";
//              }
//            }
//        },
//        this.$http.post('../testPhp/teachingPlan.php',{},{"Content-Type":"application/json"}).then(function (response) {
//        this.$http.post('../jsonphp/teachingPlan.php',
        this.$http.post('./courseTeachPlan/showTeachPlan',
          {},{"Content-Type":"application/json"}).then(function (response) {
            console.log(response.body.tableList);
//            this.tableList = response.body.tableList;
            for(var n=0;n<response.body.tableList.length;n++){
              this.tableList.push({"teacherName":response.body.tableList[n].teacherName,"teacherId":response.body.tableList[n].teacherId,"courseId":response.body.tableList[n].courseId,
                "courseName":response.body.tableList[n].courseName,"coursewareType":response.body.tableList[n].coursewareType,"auditStatus":response.body.tableList[n].auditStatus,
                "uploadTime":response.body.tableList[n].uploadTime,"type":response.body.tableList[n].coursewareType});
            }
            for(var i=0;i<response.body.tableList.length;i++){
              if(response.body.tableList[i].coursewareType=="0"){
                this.tableList[i].coursewareType="教学计划";
              }else if(response.body.tableList[i].coursewareType=="1"){
                this.tableList[i].coursewareType="课件（教案）";
              }
            }
            this.$nextTick(function () {
              for (var i = 0; i < this.tableList.length; i++) {
                console.log(this.tableList[i]);
                if (this.tableList[i].auditStatus == "0") {
                  var buttonOne = document.getElementById("buttonOne"+i);
                  buttonOne.style.display = "none";
                  var buttonTwo = document.getElementById("buttonTwo"+i);
                  buttonTwo.disabled = "true";
                  buttonTwo.style.backgroundColor="white";
                  buttonTwo.style.border="grey solid thin";
                  buttonTwo.style.color="grey";
                } else if (this.tableList[i].auditStatus == "1") {
                  var buttonTwoo = document.getElementById("buttonTwo" + i);
                  buttonTwoo.style.display = "none";
                  var buttonOnee = document.getElementById("buttonOne" + i);
                  buttonOnee.disabled = "true";
                  buttonOnee.style.backgroundColor = "white";
                  buttonOnee.style.border = "grey solid thin";
                  buttonOnee.style.color = "grey";
                }
              }
            });
            this.semesterList = response.body.semesterList;
            this.option2 = response.body.currentSemester;
          },
          function(error){
            console.log("获取教学计划error:");
            console.log(error);
          });
      },
//      mounted:function(){
//        for( var i=0;i<this.tableList.length;i++){
//          console.log(this.tableList[i]);
//          if(this.tableList[i].auditStatus =="0")
//          {alert(i);
//            var buttonTwo = document.getElementById("buttonTwo"+i);
//            buttonTwo.style.display = "none";
//            var buttonOne = document.getElementById("buttonOne"+i);
//            buttonOne.disabled = "true";
//            buttonOne.style.backgroundColor="white";
//            buttonOne.style.border="grey solid thin";
//            buttonOne.style.color="grey";
//          }else if(this.tableList[i].auditStatus =="1"){
//            var buttonTwoo = document.getElementById("buttonTwo"+i);
//            buttonTwoo.style.display = "none";
//            var buttonOnee = document.getElementById("buttonOne"+i);
//            buttonOnee.disabled = "true";
//            buttonOnee.style.backgroundColor="white";
//            buttonOnee.style.border="grey solid thin";
//            buttonOnee.style.color="grey";
//          }
//        }
//      },
      methods:{
        successDia:function(index){
          this.oindex=index;
          this.modal1 = true;
        },
        failDia:function(index){
          this.oindex=index;
          this.modal2 = true;
        },
        //通过
      success:function(index){
        var type;
         if(this.tableList[index].coursewareType=="教学计划"){
           type=0;
         }else if(this.tableList[index].coursewareType=="课件（教案）")
         {
           type=1;
         }
//          alert(this.tableList[index].teacherId);
//          this.$http.post('../jsonphp/teachingPlan.php',{
          this.modal1 = false;
          this.$http.post('./courseTeachPlan/doCheckTeachPlan',
//            this.$http.post('../jsonphp/teachingPlan.php',
            {
              "teacherId": this.tableList[index].teacherId,
              "courseId": this.tableList[index].courseId,
              "coursewareType":type,
              "msg": "1"
          },{"Content-Type":"application/json"}).then(function(response){
              console.log("审核通过:");
              console.log(response.body);
              var buttonTwo = document.getElementById("buttonTwo"+index);
              buttonTwo.style.display = "none";
              var buttonOne = document.getElementById("buttonOne"+index);
              buttonOne.disabled = "true";
              buttonOne.style.backgroundColor="white";
              buttonOne.style.border="grey solid thin";
              buttonOne.style.color="grey";
            },
            function(error){
              console.log("审核通过error:");
              console.log(error);
            });
      },
        //不通过
        fail:function(index){
              this.modal2=false;
          var type;
         if(this.tableList[index].coursewareType=="教学计划"){
           type=0;
         }else if(this.tableList[index].coursewareType=="课件（教案）")
         {
           type=1;
         }
//            this.$http.post('../jsonphp/teachingPlan.php',
              this.$http.post('./courseTeachPlan/doCheckTeachPlan',
                {
                  "teacherId": this.tableList[index].teacherId,
                  "courseId": this.tableList[index].courseId,
                  "coursewareType":type,
                  "msg": "0"
            },{"Content-Type":"application/json"}).then(function(response){
              console.log("审核不通过:");
              console.log(response.body);
              var buttonOne = document.getElementById("buttonOne"+index);
              buttonOne.style.display = "none";
              var buttonTwo = document.getElementById("buttonTwo"+index);
              buttonTwo.disabled = "true";
              buttonTwo.style.backgroundColor="white";
              buttonTwo.style.border="grey solid thin";
              buttonTwo.style.color="grey";
            },
              function(error){
                console.log("审核不通过error:");
                console.log(error);
              });

//        handleFormatError:function(){
//          this.$Message.error('文件格式错误！限制格式为'+this.$refs.upload.format,3);
//        },
//        handleSize:function(){
//          this.$Message.error('文件大小超出范围！限制最大（KB）为'+this.$refs.upload.maxSize,3);
//        },
//        handleError: function (res) {
//          var msg=document.getElementsByClassName("ivu-message-notice");
//          if(msg[0].parentNode){
////            结束进度条
//            this.$Loading.finish();
////            移除“正在上传......”的msg
//          msg[0].parentNode.removeChild(msg[0]);
//          }
//          this.$Message.error('文件上传失败！'+res,3);
//        },
//        handleProgress:function(){
//          this.$Loading.start();
//          this.$Message.loading('正在上传中',0);
//        },
//        handleSuccess:function(res){
//          this.$Loading.finish();
//          var msg=document.getElementsByClassName("ivu-message-notice");
//          msg[0].parentNode.removeChild(msg[0]);
//          this.$Message.success('文件上传成功！',3);
//          console.log(res);
//        }
      },
//       download:function(index){
//         //待修改
//         var type;
//         if(this.tableList[index].coursewareType=="教学计划"){
//           type="0";
//         }else if(this.tableList[index].coursewareType=="课件（教案）")
//         {
//           type="1";
//         }
//         this.$http.post('./courseTeachPlan/leaderDownloadTeachPlan',{
//           "teacherId": this.tableList[index].teacherId,
//           "coursewareType":type
//         },{"Content-Type":"application/json"}).then(function (response) {
//             console.log("下载:");
//             location.href='./'
//         },
//         function(error){
//           console.log("下载error:");
//           console.log(error);
//         });
//       },
        //选择学期
        chooseTerm:function(value){
//          this.$http.post('./jsonphp/teachingPlan.php',{
          this.$http.post('./courseTeachPlan/showTeachPlan',{
            "semester":value
          },{"Content-Type":"application/json"}).then(function (response) {
//              this.tableList = response.body.tableList;
//              this.semesterList = response.body.semesterList;
//              this.option2 = value;
              this.tableList = response.body.tableList;
              this.$nextTick(function () {
                for (var i = 0; i < this.tableList.length; i++) {
                  console.log(this.tableList[i]);
                  if (this.tableList[i].auditStatus == "0") {
                    var buttonOne = document.getElementById("buttonOne"+i);
                    buttonOne.style.display = "none";
                    var buttonTwo = document.getElementById("buttonTwo"+i);
                    buttonTwo.disabled = "true";
                    buttonTwo.style.backgroundColor="white";
                    buttonTwo.style.border="grey solid thin";
                    buttonTwo.style.color="grey";
                  } else if (this.tableList[i].auditStatus == "1") {
                    var buttonTwoo = document.getElementById("buttonTwo" + i);
                    buttonTwoo.style.display = "none";
                    var buttonOnee = document.getElementById("buttonOne" + i);
                    buttonOnee.disabled = "true";
                    buttonOnee.style.backgroundColor = "white";
                    buttonOnee.style.border = "grey solid thin";
                    buttonOnee.style.color = "grey";
                  }
                }
              });
              this.semesterList = response.body.semesterList;
              console.log("选择:");
              console.log(response.body);
            },
            function(error){
              console.log("error:");
              console.log(error);
            });
        }

    }}
</script>

<style lang="css" scoped>
  @import '../../../../assets/css/external.css';
  html{
    font-size: 16px;
  }
  button{
    height:2rem;
  }
  #back{
    background-color: #f3f3f3;
    /*padding-top:0.1rem;*/
    height:100%;
  }
  #sel{
    display: flex;
    padding-left:5rem;
    background-color: white;

    padding-top: 1rem;
    padding-bottom: 1rem;
  }
  select{
    border: 0.1rem solid #d4d4d9;
    border-radius: 0.7rem;
    outline: none;
    padding: 0.3rem 0.5rem;
    /*margin-right:3rem;*/
    font-size: 0.8rem;

  }
  #show{
    background-color: white;
    margin-right:5rem;
    margin-left:5rem;
    height:30rem;
    position: relative;
    top:2rem;

  }
  /*button{*/
    /*color: white;*/
    /*background-color: mediumseagreen;*/
    /*border: none;*/
    /*border-radius: 0.2rem;*/
    /*width: 5rem;*/
    /*height: 2rem;*/
    /*!*min-width: 5rem;*!*/
    /*outline:none;*/
  /*}*/
  #ibutton:hover{
    color: white;
    background-color: mediumseagreen;
    border: none;
    border-radius: 0.2rem;
    width: 5rem;
    height: 2rem;
    /*min-width: 5rem;*/
    outline:none;
  }
  /*table{*/
    /*border: solid 1px white;*/
    /*border-collapse: collapse;*/
    /*margin-left:1rem;*/
    /*margin-right:1rem;*/
    /*width:96%;*/

  /*}*/
  thead{
    border-bottom:solid 2px lightgrey;
  }

  tr{
    height:3rem;
  }
 /* #upload{
    position: relative;
    top:15rem;
  }*/
  .circle{
    border:solid thin grey;
    color: grey;
    background-color: white;
    width: 1.5rem;
    height: 1.5rem;
    -webkit-border-radius: 0.75rem;
    outline:none;
  }
  .circle:hover{
    color:white;
    background-color: red;
    border:solid thin red;
  }
</style>
