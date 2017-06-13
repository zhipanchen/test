<template>
  <div id="makeUp">
    <div  class="positionBar">
      <span>您当前的位置：</span>
      <span><a href="#/login/main/eduAdminHome" class="returnHome">首页</a></span>
      <span>>停课申请</span>
    </div>
    <div id="adjShow">
      <div id="adjTop1">
        <span>当前学年学期：{{presentYear}}</span>
        <span>当前周数：{{presentWeek}}</span>
        <span>请提前2天申请，若当前时间是17：00后，则顺延一天</span>
      </div>
      <div id="adjTop2">
        <span>何老师，您在【{{presentYear}}】共上【{{presentClass}}】个班的课，在调课补课时您所选上课时已过冲突筛选请留意。</span>
      </div>
      <div class="adjShowDiv">
        <table class="table table-hover table-bordered" cellspacing="1">
          <thead>
          <tr>
            <th width="9%">请选择</th>
            <th width="8%">序号</th>
            <th width="35%">班级名称</th>
            <th width="16%">课程名称</th>
            <th width="16%">课程编号</th>
            <th width="16%">任课老师</th>
            <!--<th width="14%">课程详情</th>-->
          </tr>
          </thead>
          <tbody>
          <tr v-for="(data,index) in tableList">
            <td>
              <span :id="'show'+index" @click="show(index)" style="text-decoration:underline;cursor: pointer;" >申请停课</span>
            </td>
            <td v-text="index+1"></td>
            <td  v-text="data.className+data.classSerial"></td>
            <td  v-text="data.courseName"></td>
            <td  v-text="data.courseSerial"></td>
            <td  v-text="data.teacherName+data.teacherSerial"></td>
            <!--<td  v-text="data.courseDetail"></td>-->
          </tr>
          </tbody>
          <!-- 			<tfoot>
                            <tr>
                                <td colspan="4">
                                    <div class="pull-left">
                                        <button class="btn btn-default" v-on:click="refresh">刷新</button>
                                    </div>
                                    <div class="pull-right">
                                        <boot-page v-ref:page :async="false", :data="lists" :lens="lenArr", :page-len="pageLen", :param="param"></boot-page>
                                    </div>
                                </td>
                            </tr>
                        </tfoot>
             -->
        </table>
      </div>
    </div>
    <div v-show="seenS" id="adjSel">
      <div id="adjTop3"><spam>温馨提示:调课时需要实验室、机房等重要设备的教室时，请与相关教务员或实验员联系，否则申请教室不能使用后果自负。</spam></div>
      <table>
        <tbody>
        <tr>
          <td class="designation" width="8%">
            <span>停课具体时间：</span>
          </td>
          <td class="choice" width="24%">
            <select v-model="selected1">
              <option>选择天数</option>
              <option v-for="option1 in options1" :value="option1.originWeek+'-'+option1.originWeekDay+'-'+option1.originSection">
                第{{option1.originWeek}}周-第{{option1.originWeekDay}}天-第{{option1.originSection}}节
              </option>
            </select>
          </td>
        </tr>
        <tr>
          <td class="designation" width="8%">
            <span>具体理由：</span>
          </td>
          <td class="choice" width="24%">
            <textarea v-model="message2"></textarea>
          </td>
        </tr>
        </tbody>
      </table>
      <div style="text-align: center">
      <button   class="am-btn am-btn-success am-radius"  @click="saveDia(selected1,message2)">保存</button>
      <button class="am-btn am-btn-success am-radius" @click="cancel">取消</button></div>
    </div>
    <Modal
      v-model="modal1"
      width="400"
      :mask-closable="false"
      id="modalBody"
      :styles="{top:'10rem'}">
      <div style="font-size: 1.1rem;text-align: center;">
        <p>您确定提交该申请？</p>
      </div>
      <div slot="footer" style="text-align: center">
        <button id="modalBtn" @click="saveSel(oselected1,omessage2)">确定</button>
        <button id="modalBtn" @click="modal1 = false">取消</button>
      </div>
    </Modal>
  </div>
</template>

<script>
  // import bootPage from './components/bootPage'

  export default {
    name: 'nameUp',
    data () {
      return {
        presentYear:'2016-2017年第一学期',
        presentWeek:'21',
        presentClass:'3',
        seenS:false,
        tableList: [],
        message2:'',
        selected1:'选择天数',
        options1: [{},{}],
        change:'',
        modal1:false,
        oselected1:'',
        omessage2:''
      }
    },
    beforeMount:function(){
      this.$http.post('./teacherCloseCourseApplyShow',{},
//        this.$http.post('../jsonphp/stopClass.php',{},
        {"Content-Type":"application/json"}).then(function (response) {
          console.log(response);
          this.presentYear = response.body.presentYear;
          this.presentWeek = response.body.presentWeek;
          this.presentClass = response.body.presentClass;
          this.tableList = response.body.tableList;
          this.options1 = response.body.options1;
        },
        function(error){
          console.log("获取error:");
          console.log(error);
        });
    },
    methods:{
      saveDia:function(selected1,message2){
        this.oselected1=selected1;
        this.omessage2=message2;
        this.modal1 = true;
      },
      //展示申请停课的申请内容
      show:function(index){
          this.seenS=true;
          this.change=index;
//          this.$http.post('../jsonphp/stopClass.php',{
          this.$http.post('./teacherCloseCourseApplyReturn',{
            "classSerial": this.tableList[index].classSerial,
            "courseplanId":this.tableList[index].courseplanId,
            "teacherSerial":this.tableList[index].teacherSerial
        },{"Content-Type":"application/json"}).then(function (response) {
            console.log("传递:");
            console.log(response.body);
            this.options1=response.body.options1;
//            options1.originWeek=response.body.options1.originWeek;
//            var list=[];
//            list = options1.originWeek;
//            var i, j,n;
//            for(i=0;i<options1.originWeek.length;i++){
//              for(j=i;i<options1.originWeek.length;j++){
//                if(list[i]==list[j]){
//                  list[j]=-1;
//                }
//              }
//            }
//            for(n;n<options1.options1.originWeek.length;n++){
//             if(list[n]!="-1"){
//               options1.originWeek=list[n];
//             }
//            }
        },
          function(error){
            console.log("传递error:");
            console.log(error);
          });
      },
      //保存申请
      saveSel:function(value,message){
          console.log(message);
          this.modal1=false;
          var originWeek = value.split("-")[0];
          var originWeekDay = value.split("-")[1];
          var originSection = value.split("-")[2];
//          this.$http.post('../jsonphp/stopClass.php',{
          this.$http.post('./teacherCloseCourseApplyHandle',{
            "changeType":1,
            "className": this.tableList[this.change].className,
            "courseplanId": this.tableList[this.change].courseplanId,
            "classSerial": this.tableList[this.change].classSerial,
            "courseName": this.tableList[this.change].courseName,
            "courseSerial": this.tableList[this.change].courseSerial,
            "teacherInfo": this.tableList[this.change].teacherInfo,
            "teacherSerial": this.tableList[this.change].teacherSerial,
//            "courseDetail": this.tableList[this.change].courseDetail,
            "originWeek": originWeek,
            "originWeekDay":originWeekDay,
          "originSection":originSection,
            "appReason":message
          },{"Content-Type":"application/json"}).then(function (response) {
             if(response.body.result=="1")
             {this.$Message.success('操作成功！');
               var t=setTimeout(" location.reload();",3000);}
              console.log("保存:");
              console.log(response.body);
            },
            function(error){
              console.log("保存error:");
              console.log(error);
            });
        this.seenS=false;

        },
      cancel:function(){
        location.reload();
      }
      }
  }

</script>

<style scoped>
  @import '../../../../assets/css/external.css';
  #adjTop1{
    background-color: white;
    position: relative;
    height:2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.3rem;

  }       /*提示1*/
  #adjTop2{
    background-color: white;
    position: relative;
    height:2rem;
    display: flex;
    align-items: center;
    padding: 0.3rem;
  }       /*提示2*/
  #adjTop3{
    background-color: white;
    position: relative;
    height:2rem;
    display: flex;
    align-items: center;
    padding: 0.3rem;
  }       /*提示3*/
  #adjShow {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 1.5rem;
    margin-left: 1rem;
    margin-right: 1rem;
    margin-bottom: 1rem;
    background: ghostwhite;



  }

  .adjShowDiv {
    background-color: white;
    border: thin solid lightgrey;
    font-size: 1rem;
    position: relative;
    top:1rem;
    margin-bottom: 2rem;

  }
   table{
     border-collapse: collapse;
     width:100%;
   }
  .table th {
    font-size: 0.9rem;
    font-weight: bold;
    background-color: white;
    height: 2rem;
    border:thin solid lightgrey;

  }    /*表格菜单*/
  .table td {
    font-size: 0.5rem;
    background-color: white;
    height: 2rem;
    border:thin solid lightgrey;
  }    /*表格内容*/
  #adjSel {
    text-align: center;
    margin: 20px;
    margin-top: 0.2rem;
    background: white;
    height: 12rem;
  }     /*选择框的背景*/
  #adjSel table {
    width: 100%;
  }
  .designation {
    text-align: right;
  }
  .choice {
    text-align: left;
  }
  #adjSel tr {
    height: 2.4rem;
  }
  #adjSel td {
    position: relative;
  }
  textarea{
    border: 0.1rem solid #d4d4d9;
  }
  button{
   width:5.6rem;
    position: relative;
    top:1rem;
    margin:0.7rem;
  }
  select{
    border: 0.1rem solid #d4d4d9;
    border-radius: 0.7rem;
    outline: none;
    padding: 0.3rem 0.5rem;
    margin: 0.1rem;
    font-size: 0.8rem;
  }
  @media screen and (max-width:1023px) {
    html {
      font-size: 9px;
    }
  }



</style>
