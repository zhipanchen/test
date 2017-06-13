<template>
    <div  id="staffAuthorityAll">
      <div id="dropdownStaff">
        <div>
          <p class="topP">职务</p>
          <table class="dropdownStaffTable" id="tchDropdownTable">
            <tr v-for="(role,index) in roleEleList">
              <td><input :id="'roleNameInput'+index" class="inputWM" v-model="role.roleName" readonly="readonly" style="border: none"@click="checkStaffAuthorityClick(index)"></td>
              <td>
                <img :id="'editImg'+index" title="修改" src="./images/edit.png" @click="editClick(index)">
                <img :id="'saveImg'+index" title="保存" src="./images/save.png" style="display: none" @click="saveClick(index)">
                <img :id="'deleteImg'+index" title="删除" src="./images/delete.png" @click="deleteClick(index)">
                <img :id="'restoreImg'+index" title="取消" src="./images/restore.png" style="display: none" @click="restoreClick(index)">
              </td>
              <!--修改，保存，删除，取消保存按钮-->
            </tr>
            <tr>
              <td width="30%"><img :id="AddImg" title="添加" src="./images/add.png" @click="addClick()"></td>
              <td width="70%"></td>
            </tr>
            <!--添加新角色按钮-->
          </table>
        </div>
        <!--角色名设置，修改，删除和添加组件-->
        <div>
          <modal v-model="modalNameOperateBool" width="400" id="modalBody">
            <div style="text-align: center;font-size: 1.1rem;">
              <p v-if="operateNameMsg==='1'">是否确定保存修改</p>
              <p v-else-if="operateNameMsg==='2'">是否确定取消修改</p>
              <p v-else>是否确定删除</p>
            </div>
            <div slot="footer" style="text-align: center">
              <button v-if="operateNameMsg==='1'" id="modalBtn" @click="saveNameOk()">确定</button>
              <button v-else-if="operateNameMsg==='2'" id="modalBtn" @click="cancelNameOk()">确定</button>
              <button v-else id="modalBtn" @click="deleteNameOk()">确定</button>
              <button id="modalBtn" @click="operateNameCancel">取消</button>
            </div>
          </modal>
          <!--用户对角色名进行修改，取消修改，删除角色操作时，弹窗确认-->
          <modal v-model="modalNameResultBool" width="400" id="modalBody">
            <div style="text-align: center;font-size: 1.1rem;">
              <p v-if="operateNameMsg === '1'">保存修改失败</p>
              <p v-else-if="operateNameMsg === '3'">删除失败</p>
              <p v-else>添加新角色失败</p>
            </div>
            <div slot="footer" style="text-align: center">
              <button id="modalBtn" @click="resultNameOk">确定</button>
            </div>
          </modal>
          <!--弹窗提示修改角色名，保存角色名修改，删除角色，添加角色操作结果-->
        </div>
      </div>

      <div id="staffAuthority">
        <div>
          <p class="topP" id="topStaff">{{roleNameEle}}</p>
          <input type="checkbox" id="all" @click="allCheck()" style="margin-left: 3rem;">
          <label style="font-size: 1.2rem" for="all">全选</label>
          <span><button id="cancel" class="bottomButton am-btn am-btn-success am-radius rightButton" @click="restoreAuthorityClick()">取消</button></span>
          <span><button id="saveInf" class="bottomButton am-btn am-btn-success am-radius rightButton" @click="saveAuthorityClick()">保存</button></span>
          <!--权限修改提交或取消按钮-->
          <ul>
            <li  v-for="authorityEle in authorityList">
              <input type="checkbox" :id="authorityEle.authorityId" :value="authorityEle.authorityId" v-model="authorityIdList">
              <label :for="authorityEle.authorityId">{{authorityEle.authorityName}}</label>
            </li>
          </ul>
        </div>
        <!--权限修改div-->
      </div>
      <div>
        <modal v-model="modalAuthorityOperateBool" width="400" id="modalBody">
          <div style="text-align: center;font-size: 1.1rem;">
            <p v-if="operateAuthorityMsg==='1'">是否确定保存修改</p>
            <p v-else-if="operateAuthorityMsg==='2'">是否确定取消修改</p>
          </div>
          <div slot="footer" style="text-align: center">
            <button v-if="operateAuthorityMsg==='1'" id="modalBtn" @click="saveAuthorityOk()">确定</button>
            <button v-else-if="operateAuthorityMsg==='2'" id="modalBtn" @click="cancelAuthorityOk()">确定</button>
            <button id="modalBtn" @click="operateAuthorityCancel">取消</button>
          </div>
        </modal>
        <!--用户进行保存，取消权限设置时，弹窗确认-->
        <modal v-model="modalAuthorityResultBool" width="400" id="modalBody">
          <div style="text-align: center;font-size: 1.1rem;">
            <p v-if="operateAuthorityMsg === '1'">保存修改失败</p>
          </div>
          <div slot="footer" style="text-align: center">
            <button id="modalBtn" @click="resultAuthorityOk">确定</button>
          </div>
        </modal>
        <!--弹窗提示保存，取消权限设置结果-->
      </div>
    </div>
</template>

<script>
    export default {
        name: '',
        data () {
            return {
              roleIdEle:'',
              roleNameEle:'请选择职务',
              newRoleName:"未命名角色",
              newRoleId:'',
              index:'',
              modalNameOperateBool:false,
              modalNameResultBool:false,
              operateNameMsg:'',
              roleEleList:[
                {roleId:'12345',roleName:'教师'},
                {roleId:'12346',roleName:'督导'},
                {roleId:'12347',roleName:'教研组组长'}
              ],
              roleList:[
//                {roleId:'12345',roleName:'教师'},
//                {roleId:'12346',roleName:'督导'},
//                {roleId:'12347',roleName:'教研组组长'}
              ],
              authorityIdList:['1','4'],
              authorityList:[
                {authorityId:'1',authorityName:'查看个人成绩'},
                {authorityId:'2',authorityName:'查看全班成绩'},
                {authorityId:'3',authorityName:'管理成绩（导入、更新、修改、提交成绩）'},
                {authorityId:'4',authorityName:'管理教师个人信息'},
                {authorityId:'5',authorityName:'班主任信息管理'},
                {authorityId:'6',authorityName:'班主任信息修改'},
                {authorityId:'7',authorityName:'班级信息管理'}
              ],
              modalAuthorityOperateBool:false,
              modalAuthorityResultBool:false,
              operateAuthorityMsg:''
            }
        },
      beforeMount:function() {
        this.$http.post('./getAllRoleAuthority',{},{
          "Content-Type":"application/json"
        }).then(function (response) {
          console.log(response);
          this.roleEleList = response.body.getAllRoleAuthorityList.roleList;
          for(var i=0;i<this.roleEleList.length;i++){
            this.roleList.push(
              {roleId:this.roleEleList[i].roleId,roleName:this.roleEleList[i].roleName}
            )
          }
//          不可以直接将response.body.getAllRoleAuthorityList.roleList赋值给roleEleList和roleEleList，因为这样赋值只是将指针给数组，会导致两个数据指向同一个指针
          this.authorityList = response.body.getAllRoleAuthorityList.authorityList;
        },function(error){
          console.log("获取error");
        });
      },
//        初始化页面时，获取角色列表，角色权限列表
      methods:{
        editClick: function(index){
          var roleNameInput = document.getElementById("roleNameInput"+index);
          var editImg = document.getElementById("editImg"+index);
          var saveImg = document.getElementById("saveImg"+index);
          var deleteImg = document.getElementById("deleteImg"+index);
          var restoreImg = document.getElementById("restoreImg"+index);
          roleNameInput.readOnly = false;
          roleNameInput.value = "";
          roleNameInput.style.border = "0.1rem solid #d4d4d9";
          editImg.style.display = "none";
          saveImg.style.display = "inline";
          deleteImg.style.display = "none";
          restoreImg.style.display = "inline";
        },
//        修改角色名
        saveClick:function(index){
          this.modalNameOperateBool = true;
          this.operateNameMsg = "1";
          this.index = index;
        },
//        保存修改角色名时，弹窗提醒用户确认
        restoreClick:function(index){
          this.modalNameOperateBool = true;
          this.operateNameMsg = "2";
          this.index = index;
        },
//        取消修改角色名时，弹窗提醒用户确认
        deleteClick:function(index){
          this.modalNameOperateBool = true;
          this.operateNameMsg = "3";
          this.index = index;
        },
//        删除角色时，弹窗提醒用户确认
        saveNameOk: function(){
          var roleNameInput = document.getElementById("roleNameInput"+this.index);
          var editImg = document.getElementById("editImg"+this.index);
          var saveImg = document.getElementById("saveImg"+this.index);
          var deleteImg = document.getElementById("deleteImg"+this.index);
          var restoreImg = document.getElementById("restoreImg"+this.index);
          this.$http.post('./saveNewRole',{
            "roleId":this.roleEleList[this.index].roleId,
            "roleName":this.roleEleList[this.index].roleName
          },{
            "Content-Type":"application/json"
          }).then(function (response) {
            console.log(response);
            var saveResult = response.body.result;
            if(saveResult == '1'){
              this.$Message.success("保存成功！");
              roleNameInput.readOnly = true;
//            true或false不可用引号
              roleNameInput.style.border = "none";
              this.roleList[this.index].roleName = this.roleEleList[this.index].roleName;
              editImg.style.display = "inline";
              saveImg.style.display = "none";
              deleteImg.style.display = "inline";
              restoreImg.style.display = "none";
            }else{
              this.modalNameResultBool = true;
            }
          },function(error){
            console.log("获取error");
          });
          this.modalNameOperateBool = false;
        },
//        保存对角色名的修改
        cancelNameOk: function(){
          var roleNameInput = document.getElementById("roleNameInput"+this.index);
          var editImg = document.getElementById("editImg"+this.index);
          var saveImg = document.getElementById("saveImg"+this.index);
          var deleteImg = document.getElementById("deleteImg"+this.index);
          var restoreImg = document.getElementById("restoreImg"+this.index);
          this.modalNameOperateBool = false;
          roleNameInput.readOnly = true;
          roleNameInput.style.border = "none";
          this.roleEleList[this.index].roleName = this.roleList[this.index].roleName;
          editImg.style.display = "inline";
          saveImg.style.display = "none";
          deleteImg.style.display = "inline";
          restoreImg.style.display = "none";
        },
//        取消对角色名的修改
        deleteNameOk: function(){
          this.$http.post('./deleteRole',{
            "roleId":this.roleList[this.index].roleId
          },{
            "Content-Type":"application/json"
          }).then(function (response) {
            console.log(response);
            var deleteResult = response.body.result;
            if(deleteResult == '1'){
              this.$Message.success("删除成功！");
              this.roleList.splice(this.index,1);
              this.roleEleList.splice(this.index,1);
            }else{
              this.modalNameResultBool = true;
            }
          },function(error){
            console.log("获取error");
          });
          this.modalNameOperateBool = false;
        },
//        删除角色
        operateNameCancel:function(){
          this.modalNameOperateBool = false;
        },
//        取消保存，删除，取消保存等操作
        resultNameOk: function(){
          this.modalNameResultBool = false;
        },
//        弹窗让用户确认操作失败信息
        addClick: function(){
          this.$http.post('./addNewRole',{},{
            "Content-Type":"application/json"
          }).then(function (response) {
            console.log(response);
            this.newRoleId = response.body.addNewRoleList.roleId;
            var addResult = response.body.addNewRoleList.result;
            if(addResult == "1"){
              this.roleList.push(
                {roleId:this.newRoleId,roleName:this.newRoleName}
              );
              this.roleEleList.push(
                {roleId:this.newRoleId,roleName:this.newRoleName}
              );
              this.roleNameEle = this.newRoleName;
              console.log(this.roleEleList);
              console.log(this.roleList);
            }else{
              this.modalAddResultBool = true;
            }
          },function(error){
            console.log("获取error");
          });
        },
//        添加角色
        allCheck: function(){
          if(this.authorityIdList.length===this.authorityList.length){
            this.authorityIdList=[];
          }
          else {
            this.authorityIdList=[];
            for(var i=0;i<this.authorityList.length;i++){
              this.authorityIdList.push(this.authorityList[i].authorityId);
            }
          }
        },
//        用于多选框的全选或全不选，方法是对数组tchAuthorityNames进行操作，此数组用v-model绑定到了多选框上
        checkStaffAuthorityClick: function(index){
          this.$http.post('./getRoleAuthority',{
            "roleId":this.roleList[index].roleId
          },{
            "Content-Type":"application/json"
          }).then(function (response) {
            console.log(response);
            this.authorityIdList = response.body.getRoleAuthorityList.authorityIdList;
          },function(error){
            console.log("获取error");
          });
          this.roleIdEle = this.roleList[index].roleId;
          this.roleNameEle = this.roleList[index].roleName;
        },
//        点击角色名时，权限列表中对该角色的权限打钩
        saveAuthorityClick:function(){
          this.modalAuthorityOperateBool = true;
          this.operateAuthorityMsg = "1";
        },
//        保存修改权限时，弹窗提醒用户确认
        restoreAuthorityClick:function(){
          this.modalAuthorityOperateBool = true;
          this.operateAuthorityMsg = "2";
        },
//        取消修改权限时，弹窗提醒用户确认
        saveAuthorityOk: function(){
          this.$http.post('./setRoleAuthority',{
            "roleId":this.roleIdEle,
            "authorityIdList":this.authorityIdList
          },{
            "Content-Type":"application/json"
          }).then(function (response) {
            console.log(response);
            var saveAuthorityResult = response.body.result;
            if(saveAuthorityResult == '1'){
              this.$Message.success("保存成功！");
            }else{
              this.modalAuthorityResultBool = true;
            }
          },function(error){
            console.log("获取error");
          });
          this.modalAuthorityOperateBool = false;
        },
//        保存对权限的修改
        cancelAuthorityOk: function(){
          this.$http.post('./getRoleAuthority',{
            "roleId":this.roleIdEle
          },{
            "Content-Type":"application/json"
          }).then(function (response) {
            console.log(response);
            this.authorityIdList = response.body.getRoleAuthorityList.authorityIdList;
          },function(error){
            console.log("获取error");
          });
          this.modalAuthorityOperateBool = false;
        },
//        取消对权限的修改
        operateAuthorityCancel:function(){
          this.modalAuthorityOperateBool = false;
        },
//      取消保存权限的操作
        resultAuthorityOk: function(){
          this.modalAuthorityResultBool = false;
        }
//      弹窗让用户确认权限保存操作的失败信息
      }
    }
</script>

<style scoped>
    html {
        font-size: 100%;
    }
    #staffAuthorityAll{
      display: flex;
      justify-content: space-between;
      padding: 3.5rem 5rem;
    }
    #dropdownStaff{
      width: 20rem;
      min-height: 30rem;
      border: 2px solid #d4d4d9;
    }
    img{
      width: 2rem;
      height: 2rem;
      margin-left: 1rem;
      border: thin solid white;
    }
    img:hover{
      cursor: pointer;
      border: thin solid grey;
    }
    .dropdownStaffTable{
      width: 100%;
      height:2rem;
      border-bottom: 1px solid #d4d4d9;
      border-collapse: collapse;
      table-layout: fixed;
      text-align: center;
    }
    #staffAuthority{
      width: 47rem;
      min-height: 30rem;
      border: 2px solid #d4d4d9;
    }
    .topP{
      font-size: 1.5rem;
      margin-top: 0;
      padding: 1rem 3rem 1rem;
      border-bottom: 2px solid #158064;
    }
    .inputWM{
      width:80%;
      text-align: center;
      cursor: pointer;
      color: #158064;
      font-size: 1.0rem;
    }
    .inputWM:hover{
      color: black;
    }
    ul li{
      float: left;
      min-height: 2rem;
      font-size: 1.0rem;
      width: 33%;
    }
    .bottomButton{
      margin-right: 1.4rem;
    }
    .rightButton{
      float: right;
      margin-right: 1.4rem;
    }
    @media screen and (max-width: 1023px) {
        html {
            font-size: 56%;
        }
    }
</style>
