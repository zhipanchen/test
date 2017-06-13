<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div id="selectDiv">
    <div class="positionBar">
      <span>您的当前位置：</span>
      <span><a :href="studentPageUrl" class="returnHome">首页</a></span>
      <span> > 学生评教</span>
    </div>
    <div class="blank">
      <select class="selectStyle1" v-model="termSelect">
        <option value="选择学期" disabled selected>选择学期</option>
        <option v-for="term in terms" v-bind:value="term">{{term}}</option>
      </select>

      <button class="changeTermButton am-btn am-btn-success am-radius" @click="changTo">切换学期</button>
      <button class="updateButton am-btn am-btn-success am-radius" v-show="all">提交所有评教</button>
    </div>
    <div id="checkCourse_tableDiv">
      <table id="tableDiv" class="normalTable" border="1">
        <tr  id="weekdayTr">
          <th>课程代码</th>
          <th>课程名称</th>
          <th>教师姓名</th>
          <th>是否评教</th>
        </tr>
        <tr  v-for="(evalution,index) in evalutions" id="courseTr">
          <td>{{ evalution.courseId }}</td>
          <td>{{ evalution.courseName }}</td>
          <td>{{ evalution.teacherName }}</td>
          <td>
            <a class="aStyle" @click="checkClick(index)">{{ evalution.result }}</a>
          </td>
        </tr>
      </table>
    </div>
    <Modal v-model="modal2" id="modalBody" :styles="{top:'10rem'}" width:700>
      <table>
        <tr>
        </tr>
        <!--表头-->
        <tr>
          <td class="spanStyle">1.教师上课认真程度:</td>
          <td><input type="radio" value="20" name="tr1" @click="first"/>优秀</td>
          <td><input type="radio" value="18" name="tr1" @click="first"/>良好</td>
          <td><input type="radio" value="16" name="tr1" @click="first"/>中等</td>
          <td><input type="radio" value="14" name="tr1" @click="first"/>较差</td>
          <td><input type="radio" value="12" name="tr1" @click="first"/>差</td>
        </tr>

        <tr>
          <td class="spanStyle">2.教室课堂气氛:</td>
          <td><input type="radio" value="20" name="tr2" @click="second"/>优秀</td>
          <td><input type="radio" value="18" name="tr2" @click="second"/>良好</td>
          <td><input type="radio" value="16" name="tr2" @click="second"/>中等</td>
          <td><input type="radio" value="14" name="tr2" @click="second"/>较差</td>
          <td><input type="radio" value="12" name="tr2" @click="second"/>差</td>
        </tr>

        <tr>
          <td class="spanStyle">3.作业批改情况:</td>
          <td><input type="radio" value="20" name="tr3" @click="third"/>优秀</td>
          <td><input type="radio" value="18" name="tr3" @click="third"/>良好</td>
          <td><input type="radio" value="16" name="tr3" @click="third"/>中等</td>
          <td><input type="radio" value="14" name="tr3" @click="third"/>较差</td>
          <td><input type="radio" value="12" name="tr3" @click="third"/>差</td>
        </tr>

        <tr>
          <td class="spanStyle">4.课堂收获情况:</td>
          <td><input type="radio" value="20" name="tr4" @click="fourth"/>优秀</td>
          <td><input type="radio" value="18" name="tr4" @click="fourth"/>良好</td>
          <td><input type="radio" value="16" name="tr4" @click="fourth"/>中等</td>
          <td><input type="radio" value="14" name="tr4" @click="fourth"/>较差</td>
          <td><input type="radio" value="12" name="tr4" @click="fourth"/>差</td>
        </tr>

        <tr>
          <td class="spanStyle">5.教师上课情况:</td>
          <td><input type="radio" value="20" name="tr5" @click="fifth"/>优秀</td>
          <td><input type="radio" value="18" name="tr5" @click="fifth"/>良好</td>
          <td><input type="radio" value="16" name="tr5" @click="fifth"/>中等</td>
          <td><input type="radio" value="14" name="tr5" @click="fifth"/>较差</td>
          <td><input type="radio" value="12" name="tr5" @click="fifth"/>差</td>
        </tr>
      </table>
      <div class="content" v-show="txt">
        <span class="textaraeTitle">文字评教：</span>
        <textarea class="text" id="txt"></textarea>
      </div>
      <div slot="footer" style="text-align:center;">
        <Button id="modalBtn" @click="ok2()">确定</Button>
        <Button id="modalBtn" @click="cancel2()">取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: '',
    data () {
      return {
        modal1:false,//模态对话框1隐藏
        modal2:false,//模态对话框2隐藏
        okValue:0,//值为0无法执行，为1可以执行
        nowIndex:0,//当前选中数组第几项
        txt:false,//文字输入框隐藏
        studentPageUrl:'#/login/main/studentHome',//学生首页url
        termSelect:'选择学期',//选择学期默认选项
        all:false,//提交所有申请的按钮作废，暂时隐藏
        val1:0,//评教1分值
        val2:0,//评教2分值
        val3:0,//评教3分值
        val4:0,//评教4分值
        val5:0,//评教5分值
        terms:[
          //学期数组
          /*
          '2016-2017-1',
          '2016-2017-2',
          '2017-2018-1',
          '2017-2018-2',
          '2018-2019-1',
          '2018-2019-2',
          '2019-2020-1',
          '2019-2020-2',
          */
        ],
        evalutions: [
          //评教表格数组
          /*
          {courseId: 'k2201710', courseName: '企业课I',  teacherName: '兰刚',teacherId:'1',classId:'1',evaTeach:false,result: '未评教',studentId:'1'},
          {courseId: 'k2210710', courseName: '硬件设计', teacherName: '兰刚',teacherId:'2',classId:'1',evaTeach:false,result: '未评教',studentId:'1'},
          {courseId: 'k2017010', courseName: '合作课程', teacherName: '兰刚',teacherId:'3',classId:'1',evaTeach:false,result: '未评教',studentId:'1'},
          */
        ]
      }
    },
    beforeMount:function() {//初始化学期选项
      this.$http.post('./getYearTermList').then(function (response) {
        var data = response.body.yearTerm;
        var a=[];
        for(var i=0;i<data.length;i++){
          a.push(data[i].startYearSemester);
        }
        this.terms=a;
      });
    },
    methods: {
      ok2 () {//模态对话框确认按钮
        if(this.okValue==0) {
          //过滤评教点选按钮是否选完
          if (this.val1 == 0 || this.val2 == 0 || this.val3 == 0 || this.val4 == 0 || this.val5 == 0) {
            this.$Message.error("存在未选项！");
          } else {//过滤评教点选按钮是完毕
            var code = parseInt(this.val1) + parseInt(this.val2) + parseInt(this.val3) + parseInt(this.val4) + parseInt(this.val5);
            //分数高于80分，直接拼接字符串信息，发送给后端
            if (code >= 80) {
              //在nowIndex中提取数据
              var string='1.教师上课认真程度:'+this.val1+';'+
                '2.教室课堂气氛:'+this.val2+';'+
                '3.作业批改情况:'+this.val3+';'+
                '4.课堂收获情况:'+this.val4+';'+
                '5.教师上课情况:'+this.val5+';';
              this.$http.post('./commitStuEvaList', {
                courseId: this.evalutions[this.nowIndex].courseId,
                teacherId:this.evalutions[this.nowIndex].teacherId,
                studentId:this.evalutions[this.nowIndex].studentId,
                record:code,
                textEva:string
              }, {
                "Content-Type": "application/json"
              }).then(function (response) {
                if (response.body.result == "1") {
                  this.$Message.success('评教提交成功！');
                  this.clearFun();//评教结束，调用还原界面的函数
                  this.modal2=false;
                  this.evalutions[this.nowIndex].result = "已评教";
                } else {
                  this.$Message.error('评教提交失败！');
                }
              }, function (error) {
                this.$Message.error("连接失败,请确认重试！");
                console.log(error);
              });
            } else {
              this.txt = true;
              this.okValue=1;
            }
          }
          //分数低于80分，需要多填写一个文字信息，生成字符串发送给后端
        }else if(this.okValue==1) {
          var t = document.getElementById("txt");
          var text= t.value;//输入空中数据
          var string='1.教师上课认真程度:'+this.val1+';'+
            '2.教室课堂气氛:'+this.val2+';'+
            '3.作业批改情况:'+this.val3+';'+
            '4.课堂收获情况:'+this.val4+';'+
            '5.教师上课情况:'+this.val5+';'+ text;
          //在nowIndex中提取数据
          this.$http.post('./commitStuEvaList', {
            courseId: this.evalutions[this.nowIndex].courseId,
            teacherId:this.evalutions[this.nowIndex].teacherId,
            studentId:this.evalutions[this.nowIndex].studentId,
            record:code,
            textEva:string
          }, {
            "Content-Type": "application/json"
          }).then(function (response) {
            if (response.body.result == "1") {
              this.$Message.success('评教提交成功！');
              this.clearFun();//评教结束，调用还原界面的函数
              this.modal2=false;
              this.evalutions[this.nowIndex].result = "已评教";
            } else {
              this.$Message.error('评教提交失败！');
            }
          }, function (error) {
            this.$Message.error("连接失败,请确认重试！");
            console.log(error);
          });
        }
      },
      cancel2(){//模态对话框取消按钮
        this.modal2=false;
        this.clearFun();
      },
      checkClick: function (index) {//评教点击事件
        if(this.evalutions[index].result=="未评教") {
          this.nowIndex = index;
          this.modal2 = true;
        }else if(this.evalutions[index].result=="已评教"){
          //nothing
        }
      },
      first:function(){//获取选中radio1
        var radio = document.getElementsByName("tr1");
        for (var i=0; i<radio.length; i++) {
          if (radio[i].checked) {
            this.val1=radio[i].value;
          }
        }
      },
      second:function(){//获取选中radio2
        var radio = document.getElementsByName("tr2");
        for (var i=0; i<radio.length; i++) {
          if (radio[i].checked) {
            this.val2=radio[i].value;
          }
        }
      },
      third:function(){//获取选中radio3
        var radio = document.getElementsByName("tr3");
        for (var i=0; i<radio.length; i++) {
          if (radio[i].checked) {
            this.val3=radio[i].value;
          }
        }
      },
      fourth:function(){//获取选中radio4
        var radio = document.getElementsByName("tr4");
        for (var i=0; i<radio.length; i++) {
          if (radio[i].checked) {
            this.val4=radio[i].value;
          }
        }
      },
      fifth:function(){//获取选中radio5
        var radio = document.getElementsByName("tr5");
        for (var i=0; i<radio.length; i++) {
          if (radio[i].checked) {
            this.val5=radio[i].value;
          }
        }
      },
      clearFun:function(){//清空函数
        var radio1 = document.getElementsByName("tr1");
        var radio2 = document.getElementsByName("tr2");
        var radio3 = document.getElementsByName("tr3");
        var radio4 = document.getElementsByName("tr4");
        var radio5 = document.getElementsByName("tr5");
        for (var i=0; i<radio1.length; i++) {
          if (radio1[i].checked) {
            radio1[i].checked = false;
          }
        }

        for (var i=0; i<radio2.length; i++) {
          if (radio2[i].checked) {
            radio2[i].checked = false;
          }
        }

        for (var i=0; i<radio3.length; i++) {
          if (radio3[i].checked) {
            radio3[i].checked = false;
          }
        }

        for (var i=0; i<radio4.length; i++) {
          if (radio4[i].checked) {
            radio4[i].checked = false;
          }
        }

        for (var i=0; i<radio5.length; i++) {
          if (radio5[i].checked) {
            radio5[i].checked = false;
          }
        }

        var t = document.getElementById("txt");
        t.value="";//清空

        this.txt=false;
      },
      changTo:function(){//获取对应学期评教数据
        this.$http.post('./getStuEvaCourseList', {
          "yearTerm": this.termSelect,
        }, {
          "Content-Type": "application/json"
        }).then(function (response) {
          var a=response.body.result;
          for(var i=0;i< a.length;i++){
            if(a[i].evaTeach) {
              a[i]["result"] = "已评教";
            }else{
              a[i]["result"] = "未评教";
            }
          }
          this.evalutions=a;
        });
      },
    }
  }
</script>

<style scoped>
  html {
    font-size: 100%;
  }
  .selectStyle1{
    margin-left:5rem;
  }
  #selectDiv{
    height:2.2rem;
  }
  .changeTermButton{
    margin-left:5rem;
    width:5.6rem;
    outline: none;
  }
  .updateButton{
    float:right;
    margin-top:0.5rem;
    margin-right:5rem;
    width:8rem;
    outline: none;
  }
  #checkCourse_tableDiv{
    height:30rem;
    padding:1rem 5rem 2rem 5rem;
    background-color: #f3f3f3;
  }
  #tableDiv{
    position: relative;
    width: 100%;
    border: 0 solid #d4d4d9;
    border-collapse: collapse;
    table-layout: fixed;
    text-align: center;
  }
  .aStyle{
    color:#3985FF;
    cursor: pointer;
  }
  .spanStyle{
    float:left;
  }




  .content{
    width:80%;
    margin:0 auto;
  }
  .textaraeTitle{
    font-size:1rem;
    /*display: block;*/
  }
  .text{
    width:100%;
    background-color: #E5E5E5;
    height:10rem;
    font-size:1.2rem;
  }

</style>
