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
            <td>毕业院校：</td>
            <td><input type="text" onkeyup="this.value=this.value.replace(/\s+/g,'')" v-model="graduateSchool" /></td>
          </tr>
          <tr>
            <td>毕业专业：</td>
            <td><input type="text"onkeyup="this.value=this.value.replace(/\s+/g,'')" v-model="secialty" /></td>
          </tr>
          <tr>
            <td>学制：</td>
            <td><input type="number" onkeyup="this.value=this.value.replace(/\D/g,'')" name="points" min="1" max="10"  v-model="schoolSystem" /></td>
          </tr>
          <tr>
            <td>最高学历：</td>
            <td>
                  <select style="width:11.3rem;" v-model="highestEDU">
                    <option v-for="EDU in EDUs">{{ EDU }}</option>
                  </select>
            </td>
          </tr>
          <tr>
            <td>最高学位：</td>
            <td>
              <select style="width:11.3rem;" v-model="highestDegree">
                <option v-for="degree in degrees">{{ degree }}</option>
              </select>
            </td>
          </tr>
        </table>

      </div>
      <div id="buttonDiv">
        <button class="am-btn am-btn-success am-radius" @click="saveDia(graduateSchool,secialty,schoolSystem,highestEDU,highestDegree)">保存</button>
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
        <button id="modalBtn" @click="save(ograduateSchool,osecialty,oschoolSystem,ohighestEDU,ohighestDegree)">确定</button>
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
        <p>您确定取消操作吗？</p>
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
        subtitle2:'教育管理',
        EDUs:['中专','高中','专科','本科','硕士研究生','博士研究生'],
        degrees:['学士','硕士','博士'],
        graduateSchool:'',
        secialty:'',
        schoolSystem:'',
        highestEDU:'',
        highestDegree:'',
        ograduateSchool:'',
        osecialty:'',
        oschoolSystem:'',
        ohighestEDU:'',
        ohighestDegree:'',
        modal1: false,
//        modal3: false,
        modal2: false
      }
    },
    beforeMount:function(){
      this.$http.post('./teacherManage/getTeacherEduInfo',{},
//        this.$http.post('../jsonphp/education.php',{},
        {"Content-Type":"application/json"}).then(function (response) {
          console.log(response);
          this.graduateSchool = response.body.graduateSchool;
          this.secialty = response.body.secialty;
          this.schoolSystem = response.body.schoolSystem;
          this.highestEDU = response.body.highestEDU;
          this.highestDegree = response.body.highestDegree;
        },
        function(error){
          console.log("获取error:");
          console.log(error);
        });
    },
    methods: {
      //打开对话框
      saveDia:function(graduateSchool,secialty,schoolSystem,highestEDU,highestDegree){
          this.ograduateSchool=graduateSchool;
          this.osecialty=secialty;
          this.oschoolSystem=schoolSystem;
          this.ohighestEDU=highestEDU;
          this.ohighestDegree=highestDegree;
          this.modal1 = true;
      },
      cancelDia:function(){
        this.modal2 = true;
      },
      //保存
      save:function(graduateSchool,secialty,schoolSystem,highestEDU,highestDegree){
        this.modal1 = false;
        console.log(highestEDU);
        console.log(highestDegree);
//        this.$http.post('../jsonphp/education.php',{
        this.$http.post('./teacherManage/editTeacherEduInfo',{
         "graduateSchool":graduateSchool,
         "secialty":secialty,
         "schoolSystem":schoolSystem,
         "highestEDU":highestEDU,
         "highestDegree":highestDegree
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
      //刷新
      cancel:function(){
        location.reload();
      }
    }

  }

</script>

<style lang="css" scoped>
  @import '../../../../assets/css/external.css';
  html{
    font-size: 16px;
  } /*整个页面的样式*/
  #selfMessage-teacher-tableDiv{
    background-color: #f3f3f3;
    position:relative;
    display: flex;
    height:30rem;
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

    width: 5.6rem;
    margin:0.7rem;

  }
  input{
    width:10rem;
  }
</style>
