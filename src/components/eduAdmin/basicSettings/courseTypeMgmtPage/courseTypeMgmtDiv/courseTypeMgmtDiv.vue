<template>
  <div id="courseTypeManagementDiv">
    <div class="blank">
      <div class="positionBar">
        <span>您的当前位置：</span>
        <span><a href="#/login/main/eduAdminHome" class="returnHome">首页</a></span>
        <span> > <a href="#/login/main/eduAdminHome?baseSetting" class="returnHome">基本设置</a> > 资源管理设置 > 课程类型管理</span>
      </div>
    </div>
    <div id="tableDiv">
      <table class="operationTable">
        <thead>
          <tr>
            <th>序号</th>
            <th>课程类型名称</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(courseType,index) in courseTypeList">
            <td v-text="index+1"></td>
            <td><input :id="'input'+index" type="text" v-model="courseType.courseTypeName" readonly></td>
            <td class="operationTd">
              <img :id="'editImg'+index" src="../../../../../assets/images/edit.png" @click="editClick(index)" title="编辑">
              <img :id="'saveImg'+index" style="display: none" src="../../../../../assets/images/save.png" @click="operationClick(index,'save')" title="保存">
              <img :id="'restoreImg'+index" style="display: none" src="../../../../../assets/images/restore.png" @click="operationClick(index,'restore')" title="取消">
              <img :id="'deleteImg'+index" src="../../../../../assets/images/delete.png" @click="operationClick(index,'delete')" title="删除">
            </td>
          </tr>
          <tr id="addTr">
            <td><img src="../../../../../assets/images/add.png" @click="addClick()" title="添加"></td>
            <td></td>
            <td></td>
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
        <p>您确定删除该课程类型吗？</p>
      </div>
      <div slot="footer" style="text-align: center">
        <button id="modalBtn" @click="deleteClick(operationIndex)">确定</button>
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
        <p>您确定保存该课程类型吗？</p>
      </div>
      <div slot="footer" style="text-align: center">
        <button id="modalBtn" @click="saveClick(operationIndex)">确定</button>
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
        <p>您确定取消编辑并重置该信息吗？</p>
      </div>
      <div slot="footer" style="text-align: center">
        <button id="modalBtn" @click="restoreClick(operationIndex)">确定</button>
        <button id="modalBtn" @click="modal3 = false">取消</button>
      </div>
    </Modal>
    <Modal
        v-model="modal4"
        width="400"
        :mask-closable="false"
        id="modalBody"
        :styles="{top:'10rem'}">
      <div style="font-size: 1.1rem;text-align: center;">
        <p>{{ errorMessage }}</p>
      </div>
      <div slot="footer" style="text-align: center">
        <button id="modalBtn" @click="modal4 = false">确定</button>
      </div>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: 'courseTypeManagementDiv',
    data () {
      return {
        courseTypeList:[
          /*{ "courseTypeId":"1", "courseTypeName":"专业必修课" },
          { "courseTypeId":"2", "courseTypeName":"公共必修课" },
          { "courseTypeId":"3", "courseTypeName":"专业选修课" },
          { "courseTypeId":"4", "courseTypeName":"公共选修课" }*/
        ],
        buffer_courseTypeList:[],
        modal1: false,
        modal2: false,
        modal3: false,
        modal4: false,
        errorMessage: "",
        operationIndex: null
      }
    },
    beforeMount: function() {
      this.$http.post('./courseTypeManage/getAllCourseType',{},{
        "Content-Type":"application/json"
      }).then(function(response){
        this.courseTypeList = response.body.courseTypeList;
      },function(error){
        this.$Message.error('连接失败，请重试！');
      });
    },
    methods:{
      operationClick: function(operationIndex,operation){
//                对话框参数传递，触发对应对话框
        this.operationIndex = operationIndex;
        if(operation == "restore"){
          this.modal3 = true;
        }else if(operation == "delete"){
          this.modal1 = true;
        }else if(operation == "save"){
          this.modal2 = true;
        }
      },
      editClick: function(index){
//        编辑功能
        var input = document.getElementById("input"+index);
        var editImg = document.getElementById("editImg"+index);
        var saveImg = document.getElementById("saveImg"+index);
        var restoreImg = document.getElementById("restoreImg"+index);
        var deleteImg = document.getElementById("deleteImg"+index);

        input.readOnly = false;
        input.style.border = "0.1rem solid #d4d4d9";

        this.buffer_courseTypeList.splice(index, 1, JSON.parse(JSON.stringify(this.courseTypeList[index])));

//        更新缓存数据，以便重置
        editImg.style.display = "none";
        deleteImg.style.display = "none";
        saveImg.style.display = "inline-block";
        restoreImg.style.display = "inline-block";
//        进入编辑状态
      },
      restoreClick: function(index){
//        取消修改,重置数据,退出编辑
        var input = document.getElementById("input"+index);
        var editImg = document.getElementById("editImg"+index);
        var saveImg = document.getElementById("saveImg"+index);
        var restoreImg = document.getElementById("restoreImg"+index);
        var deleteImg = document.getElementById("deleteImg"+index);

        try{
          this.courseTypeList.splice(index, 1, JSON.parse(JSON.stringify(this.buffer_courseTypeList[index])));
        }catch (e){
          console.log(e)
        }
//        从缓存数据中重置数据

        if(this.courseTypeList[index].courseTypeId == ""){
          this.courseTypeList.splice(index, 1);
          this.buffer_courseTypeList.splice(index, 1);
        }else {
          input.readOnly = true;
          input.style.border = "none";

          editImg.style.display = "inline-block";
          deleteImg.style.display = "inline-block";
          saveImg.style.display = "none";
          restoreImg.style.display = "none";
        }
        this.modal3 = false;
      },
      addClick: function (){
//        添加未保存的新增课程，添加对应缓存
        this.buffer_courseTypeList.push(
            { "courseTypeId":"","courseTypeName":"" }
        );
        this.courseTypeList.push(
            { "courseTypeId":"","courseTypeName":"" }
        );
        this.$nextTick(function () {
          var editImg = document.getElementById("editImg" + (this.courseTypeList.length - 1));
          editImg.click();
        });
      },
      saveClick: function(index){
//        保存功能
        var input = document.getElementById("input"+index);
        var editImg = document.getElementById("editImg"+index);
        var saveImg = document.getElementById("saveImg"+index);
        var restoreImg = document.getElementById("restoreImg"+index);
        var deleteImg = document.getElementById("deleteImg"+index);

        if(this.courseTypeList[index].courseTypeName == ""){
          this.errorMessage = "课程类型名称不能为空!";
          this.modal4 = true;
          this.modal2 = false;
        }else {
          this.$http.post('./courseTypeManage/addCourseType', {
            "courseTypeId": this.courseTypeList[index].courseTypeId,
            "courseTypeName": this.courseTypeList[index].courseTypeName
          }, {
            "Content-Type": "application/json"
          }).then(function (response) {
            this.modal2 = false;
            var data = response.body;
            if (data.result == "1") {
              this.$Message.success('保存成功！');
              input.readOnly = true;
              input.style.border = "none";

              editImg.style.display = "none";
              deleteImg.style.display = "none";
              saveImg.style.display = "none";
              restoreImg.style.display = "none";
              setTimeout("location.reload()", 1500);
//                退出编辑状态
            } else {
//              this.$Message.error("操作失败,请重试!");
              this.errorMessage = "操作失败,请重试!";
              this.modal4 = true;
            }
          }, function (error) {
            this.modal2 = false;
            this.$Message.error("连接失败,请重试!");
          });
        }
      },
      deleteClick: function (index) {
        this.$http.post('./courseTypeManage/deleteCourseType',{
          "courseTypeId": this.courseTypeList[index].courseTypeId
        },{
          "Content-Type":"application/json"
        }).then(function(response){
          this.modal1 = false;
          var data = response.body;
          if (data.result == "1") {
            //          从data中的教室信息数组中删除
            this.$Message.success('删除成功！');
            this.courseTypeList.splice(index, 1);
            this.buffer_courseTypeList.splice(index, 1);
          } else {
//              this.$Message.error("操作失败,请重试!");
            this.errorMessage = "操作失败,请重试!";
            this.modal4 = true;
          }
        },function(error){
          this.modal1 = false;
          this.$Message.error('连接失败，请重试！');
        });
      }
    }
  }
</script>

<style scoped>
  #courseTypeManagementDiv {
    /*最上层Div*/
    margin: 0 auto;
    background-color: #f3f3f3;
    min-height: 39rem;
  }
  #tableDiv{
    margin: 0 5rem;
  }
  input{
    outline:none;
    border: none;
    text-align: center;
    width: 8rem;
  }
  img{
    position: relative;
    margin: 0.5rem 0.2rem;
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
  }
  #addTr:hover > td{
    background-color: white;
  }
  @media screen and (max-width: 1025px) {
    html {
    }
  }
</style>
