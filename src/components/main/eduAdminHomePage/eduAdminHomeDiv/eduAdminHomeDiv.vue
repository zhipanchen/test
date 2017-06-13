<template>
  <div id="eduAdminHomeDiv">
    <div id="menuDiv">
      <Menu
          ref="roleMenu"
          id="menu"
          :active-name="activeName"
          @on-select="roleChange"
          width="auto">
        <Menu-group title="角色类型">
          <Menu-item v-for="(role,index) in roleList" :name="role.roleId" :key="role.roleId">
            {{ role.roleName }}
          </Menu-item>
        </Menu-group>
      </Menu>

      <button class="am-btn am-btn-success am-radius" id="termStartButton" @click="modal1 = true" v-if="isEduAdmin">设置学期开始时间</button>
      <button class="am-btn am-btn-success am-radius" id="evaluationStartButton" @click="modal2 = true" v-if="isEduAdmin">设置评教起止时间</button>
      <button class="am-btn am-btn-success am-radius" id="gradeStartButton" @click="modal3 = true" v-if="isEduAdmin">设置成绩录入时间</button>
      <Modal
          v-model="modal1"
          width="400"
          :mask-closable="false"
          id="modalBody"
          :styles="{top:'10rem'}">
        <div slot="header" style="font-size: 1rem;text-align: center;padding: 0.5rem 0;" id="modalHeader">
          <span>设置学期开始时间</span>
        </div>
        <div style="font-size: 0.9rem;">
          <div style="display: flex;align-items: center;justify-content: center">第一学期：
            <Row>
              <Col span="12">
                <Date-picker v-model="firstDate" format="yyyy年MM月dd日" type="date" placeholder="选择日期" style="width: 12rem"></Date-picker>
              </Col>
            </Row>
          </div>
          <div style="display: flex;align-items: center;justify-content: center;margin-top: 1rem">第二学期：
            <Row>
              <Col span="12">
                <Date-picker v-model="secondDate" format="yyyy年MM月dd日" type="date" placeholder="选择日期" style="width: 12rem"></Date-picker>
              </Col>
            </Row>
          </div>
        </div>
        <div slot="footer" style="text-align: center">
          <button id="modalBtn" @click="termStart()">确定</button>
          <button id="modalBtn" @click="modal1 = false">取消</button>
        </div>
      </Modal>
      <Modal
          v-model="modal2"
          width="400"
          :mask-closable="false"
          id="modalBody"
          :styles="{top:'10rem'}">
        <div slot="header" style="font-size: 1rem;text-align: center;padding: 0.5rem 0;" id="modalHeader">
          <span>设置评教起止时间</span>
        </div>
        <div style="font-size: 0.9rem;display: flex;flex-direction: column;align-items: center">
          <span style="margin-bottom: 0.5rem" v-text="latelyEvaTime"></span>
          <Row>
            <Col span="12">
            <Date-picker v-model="evaluationDate" format="yyyy年MM月dd日" type="daterange" placeholder="选择日期" style="width: 20rem"></Date-picker>
            </Col>
          </Row>
        </div>
        <div slot="footer" style="text-align: center">
          <button id="modalBtn" @click="evaluationStart()">确定</button>
          <button id="modalBtn" @click="modal2 = false">取消</button>
        </div>
      </Modal>
      <Modal
          v-model="modal3"
          width="400"
          :mask-closable="false"
          id="modalBody"
          :styles="{top:'10rem'}">
        <div slot="header" style="font-size: 1rem;text-align: center;padding: 0.5rem 0;" id="modalHeader">
          <span>设置成绩录入时间</span>
        </div>
        <div style="font-size: 0.9rem;display: flex;flex-direction: column;align-items: center">
          <span style="margin-bottom: 0.5rem" v-text="latelyGradeTime"></span>
          <Row>
            <Col span="12">
            <Date-picker v-model="gradeDate" format="yyyy年MM月dd日" type="daterange" placeholder="选择日期" style="width: 20rem"></Date-picker>
            </Col>
          </Row>
        </div>
        <div slot="footer" style="text-align: center">
          <button id="modalBtn" @click="gradeStart()">确定</button>
          <button id="modalBtn" @click="modal3 = false">取消</button>
        </div>
      </Modal>
    </div>
    <!--iview的菜单组件-->
    <div id="pageDiv">
      <div id="backButtonDiv">
        <button v-if="!inFunction" id="backButton" class="am-btn am-btn-success am-radius" @click="inFunction = true">返回</button>
      </div>
      <div v-if="!inFunction" id="functionDiv">
        <div v-for="(inFuncModel,index) in inFuncModels" @mouseover="imgOver(index)" @mouseout="imgOut(index)">
          <div>
            <img :id="'img'+index+'green'" :src="inFuncModel.greenImg" v-show="inFuncModel.greenOrBlue" >
            <img :id="'img'+index+'blue'" :src="inFuncModel.blueImg" v-show="!inFuncModel.greenOrBlue" >
            <span>{{ inFuncModel.name }}</span>
          </div>
          <ul>
            <li v-for="pageModel in inFuncModel.pageModels"><a :href="pageModel.href">{{ pageModel.name }}</a></li>
          </ul>
        </div>
        <!--二级功能块-->
      </div>
      <div id="topFuncDiv" v-show="inFunction">
        <span class="pageSpan" v-for="(authorityModel,index) in authorityModels" @click="inFuncClick(index)">
          <Badge :count="authorityModel.msgNum">
            <img class="modelImg" src="" :alt="authorityModel.name"><div>{{ authorityModel.name }}</div>
          </Badge>
        </span>
      </div>
      <!--一级功能块-->
    </div>
    <div id="announcementDiv">
      <span id="topSpan"></span>
      <!--制造边框-->
      <ul id="nameUl">
        <li v-for="announcement in announcementList" :class="announcement.announcementType" :title="announcement.announcementName"  @click="announcementClick(announcement.announcementId)">
          <span class="announcementName">{{ announcement.announcementName }}</span><span>[{{ announcement.announcementTime }}]</span>
        </li>
      </ul>
      <!--公告-->
      <span id="bottomSpan"></span>
      <!--制造边框-->
      <p id="detail"><a href="#/eduAdmin/information/noticeManage">详情</a></p>
    </div>
    <Modal
        v-model="modal"
        width="400"
        :mask-closable="false"
        id="modalBody"
        :styles="{top:'10rem'}">
      <div style="font-size: 1.1rem;text-align: center;">
        <p>{{ errorMessage }}</p>
      </div>
      <div slot="footer" style="text-align: center">
        <button id="modalBtn" @click="modal = false">确定</button>
      </div>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: 'eduAdminHomeDiv',
    data () {
      return {
        baseSettingImg: require("./images/基本设置.png"),
        gradeManageImg: require("./images/成绩管理.png"),
        manageImg: require("./images/教务管理.png"),
        eduAdminManageImg: require("./images/考务管理.png"),
        emolumentImg: require("./images/课酬管理.png"),
        informationImg: require("./images/教务公告.png"),
        courseImg: require("./images/智能排课.png"),
        roleImg: require("./images/权限管理.png"),
        courseInfoImg: require("./images/课程信息维护.png"),
        teachMgmtImg: require("./images/教学管理.png"),
        courseMgmtImg: require("./images/课程管理.jpg"),
        personInfoImg: require("./images/个人信息维护.jpg"),
//        一级功能块图标地址
        inFunction: true,
        roleList: [
          /*{roleId: 3,roleName:"教务"},
          {roleId: 2,roleName:"教师"}*/
        ],
        firstEnter: 0,
//        角色列表
        authorityList: [],
//        权限id列表
        functionModels: [],
//        权限名称列表
        authorityModels: [],
//        一级功能列表
        inFuncModels: [],
//        二级功能列表
        activeName: "",
//        选中角色绑定
        announcementList: [
          /*{
            "announcementId": 1,
            "announcementName": " 关于xxx 的公告11111111111111111111111111111111",
            "announcementContent": "sss",
            "announcementTime": "2015-5-19",
            "announcementType": "部门分布"
          },
          {
            "announcementId": 2,
            "announcementName": " 关于xxx 的公告",
            "announcementContent": "sss",
            "announcementTime": "2015-5-18",
            "announcementType": "部门分布"
          },
          {
            "announcementId": 3,
            "announcementName": " 关于xxx 的公告",
            "announcementContent": "sss",
            "announcementTime": "2015-5-16",
            "announcementType": "学院公告"
          },
          {
            "announcementId": 4,
            "announcementName": " 关于xxx 的公告",
            "announcementContent": "sss",
            "announcementTime": "2015-5-20",
            "announcementType": "学院公告"
          },
          {
            "announcementId": 5,
            "announcementName": " 关于xxx 的公告",
            "announcementContent": "sss",
            "announcementTime": "2015-5-4",
            "announcementType": "校务公布"
          },
          {
            "announcementId": 6,
            "announcementName": " 关于xxx 的公告",
            "announcementContent": "sss",
            "announcementTime": "2015-5-3",
            "announcementType": "校务公布"
          },
          {
            "announcementId": 7,
            "announcementName": " 关于xxx 的公告",
            "announcementContent": "sss",
            "announcementTime": "2015-4-29",
            "announcementType": "教务文件"
          },
          {
            "announcementId": 8,
            "announcementName": " 关于xxx 的公告",
            "announcementContent": "sss",
            "announcementTime": "2015-4-19",
            "announcementType": "教务文件"
          },
          {
            "announcementId": 9,
            "announcementName": " 关于xxx 的公告",
            "announcementContent": "sss",
            "announcementTime": "2015-5-12",
            "announcementType": "对外播报"
          },
          {
            "announcementId": 10,
            "announcementName": " 关于xxx 的公告",
            "announcementContent": "sss",
            "announcementTime": "2015-5-12",
            "announcementType": "科研动态"
          },
          {
            "announcementId": 11,
            "announcementName": " 关于xxx 的公告",
            "announcementContent": "sss",
            "announcementTime": "2015-5-19",
            "announcementType": "对外播报"
          },
          {
            "announcementId": 11,
            "announcementName": " 关于xxx 的公告",
            "announcementContent": "sss",
            "announcementTime": "2015-5-19",
            "announcementType": "对外播报"
          },
          {
            "announcementId": 12,
            "announcementName": " 关于xxx 的公告",
            "announcementContent": "sss",
            "announcementTime": "2015-5-19",
            "announcementType": "对外播报"
          },
          {
            "announcementId": 13,
            "announcementName": " 关于xxx 的公告",
            "announcementContent": "sss",
            "announcementTime": "2015-5-19",
            "announcementType": "对外播报"
          },
          {
            "announcementId": 14,
            "announcementName": " 关于xxx 的公告",
            "announcementContent": "sss",
            "announcementTime": "2015-5-19",
            "announcementType": "对外播报"
          },
          {
            "announcementId": 15,
            "announcementName": " 关于xxx 的公告",
            "announcementContent": "sss",
            "announcementTime": "2015-5-19",
            "announcementType": "对外播报"
          },
          {
            "announcementId": 16,
            "announcementName": " 关于xxx 的公告",
            "announcementContent": "sss",
            "announcementTime": "2015-5-19",
            "announcementType": "对外播报"
          },
          {
            "announcementId": 17,
            "announcementName": " 关于xxx 的公告",
            "announcementContent": "sss",
            "announcementTime": "2015-5-19",
            "announcementType": "对外播报"
          }*/
        ],
//        公告信息
        isEduAdmin: true,
//        时间设置功能按钮显隐
        modal: false,
        modal1: false,
        modal2: false,
        modal3: false,
//        对话框显隐
        errorMessage: "",
//        对话框内容
        firstDate: "",
//        第一学期开始时间
        secondDate: "",
//        第二学期开始时间
        dateError: "",
//        学期设置失败回调
        evaluationDate: null,
//        评教起止时间
        gradeDate: null,
//        成绩录入起止时间
        latelyEvaTime: "",
//        最近的评教时间
        latelyGradeTime: "",
//        最近的成绩录入时间
      }
    },
    beforeMount: function() {
//    页面dom加载前获取后端数据
      this.$http.post('./announcementManage/getAllAnnouncement',{},{
//      this.$http.post('../testPhp/getAllAnnouncement.php',{},{
        "Content-Type":"application/json"
      }).then(function(response){
        this.announcementList = response.body.announcementList;
        this.announcementList = this.announcementList.reverse();
        if(this.announcementList.length == 0){
          this.announcementList.push({
            "announcementId": "null",
            "announcementName": "……",
            "announcementContent": "null",
            "announcementTime": "",
            "announcementType": "null"
          })
        }
      },function(error){
        this.$Message.error('连接失败，请重试！');
        if(this.announcementList.length == 0){
          this.announcementList.push({
            "announcementId": "null",
            "announcementName": "……",
            "announcementContent": "null",
            "announcementTime": "…",
            "announcementType": "null"
          })
        }
      });
      this.$http.post('./getPermissionByUser',{},{
//      this.$http.post('../testPhp/getPermissionByUser.php',{},{
        "Content-Type":"application/json"
      }).then(function(response){
        sessionStorage.setItem("authorityList", JSON.stringify(response.body.currentPermissionList));
      },function(error){
        this.$Message.error('连接失败，请重试！');
      });
    },

    mounted: function() {
//      dom加载后调整页面高度
      var dom = document.getElementById("eduAdminHomeDiv");
      dom.style.minHeight = window.innerHeight*0.92 + "px";

      this.$http.post('./getCurrentUser',{},{
        "Content-Type":"application/json"
      }).then(function(response){
        for (var i = 0; i < response.body.currentRoleList.length; i++) {
          if(response.body.currentRoleList[i].roleId == 1){
            location.href = '#/login/main/studentHome';
          }
        }
        this.roleList = response.body.currentRoleList;
        this.$nextTick(function () {
          try {
            var thisURL = document.URL;
            if(thisURL.indexOf("eduAdminHome?") >= 0) {
              var param = thisURL.split("eduAdminHome?")[1];
              if(param != "eduAdmin" && param != "teacher") {
                this.$http.post('./getRoleAuthority', {
                  "roleId": 3
                }, {
                  "Content-Type": "application/json"
                }).then(function (response) {
                  this.authorityList = response.body.getRoleAuthorityList.authorityIdList;
                  this.functionModels = [];
                  this.authorityModels = [];
                  for (var i = 0; i < this.authorityList.length; i++) {
//            生成权限名称列表
                    if (this.authorityList[i] == 28 || this.authorityList[i] == 29 || this.authorityList[i] == 32) {
                      var isExist = false;
                      for (var a = 0; a < this.functionModels.length; a++) {
                        if (this.functionModels[a] == "成绩") {
                          isExist = true;
                        }
                      }
                      if (!isExist)
                        this.functionModels.push("成绩");
                    } else if (this.authorityList[i] == 30 || this.authorityList[i] == 31) {
                      var isExist = false;
                      for (var a = 0; a < this.functionModels.length; a++) {
                        if (this.functionModels[a] == "补考") {
                          isExist = true;
                        }
                      }
                      if (!isExist) {
                        this.functionModels.push("补考");
                      }
                    } else if (this.authorityList[i] == 20 || this.authorityList[i] == 21 || this.authorityList[i] == 27 || this.authorityList[i] == 65) {
                      var isExist = false;
                      for (var a = 0; a < this.functionModels.length; a++) {
                        if (this.functionModels[a] == "资源管理设置") {
                          isExist = true;
                        }
                      }
                      if (!isExist) {
                        this.functionModels.push("资源管理设置");
                      }
                    } else if (this.authorityList[i] == 23 || this.authorityList[i] == 24 || this.authorityList[i] == 26 || this.authorityList[i] == 64) {
                      var isExist = false;
                      for (var a = 0; a < this.functionModels.length; a++) {
                        if (this.functionModels[a] == "人员管理设置") {
                          isExist = true;
                        }
                      }
                      if (!isExist) {
                        this.functionModels.push("人员管理设置");
                      }
                    } else if (this.authorityList[i] == 15 || this.authorityList[i] == 16 || this.authorityList[i] == 34) {
                      var isExist = false;
                      for (var a = 0; a < this.functionModels.length; a++) {
                        if (this.functionModels[a] == "教务安排") {
                          isExist = true;
                        }
                      }
                      if (!isExist) {
                        this.functionModels.push("教务安排");
                      }
                    } else if (this.authorityList[i] == 17 || this.authorityList[i] == 62) {
                      var isExist = false;
                      for (var a = 0; a < this.functionModels.length; a++) {
                        if (this.functionModels[a] == "教务审查") {
                          isExist = true;
                        }
                      }
                      if (!isExist) {
                        this.functionModels.push("教务审查");
                      }
                    } else if (this.authorityList[i] == 10) {
                      this.functionModels.push("考务管理");
                    } else if (this.authorityList[i] == 5 || this.authorityList[i] == 22) {
                      var isExist = false;
                      for (var a = 0; a < this.functionModels.length; a++) {
                        if (this.functionModels[a] == "课酬管理") {
                          isExist = true;
                        }
                      }
                      if (!isExist) {
                        this.functionModels.push("课酬管理");
                      }
                    } else if (this.authorityList[i] == 19) {
                      this.functionModels.push("教务公告");
                    } else if (this.authorityList[i] == 7 || this.authorityList[i] == 8 || this.authorityList[i] == 9 || this.authorityList[i] == 14) {
                      var isExist = false;
                      for (var a = 0; a < this.functionModels.length; a++) {
                        if (this.functionModels[a] == "排课操作") {
                          isExist = true;
                        }
                      }
                      if (!isExist) {
                        this.functionModels.push("排课操作");
                      }
                    } else if (this.authorityList[i] == 6 || this.authorityList[i] == 11 || this.authorityList[i] == 12 || this.authorityList[i] == 13) {
                      var isExist = false;
                      for (var a = 0; a < this.functionModels.length; a++) {
                        if (this.functionModels[a] == "排课信息") {
                          isExist = true;
                        }
                      }
                      if (!isExist) {
                        this.functionModels.push("排课信息");
                      }
                    } else if (this.authorityList[i] == 1 || this.authorityList[i] == 2) {
                      var isExist = false;
                      for (var a = 0; a < this.functionModels.length; a++) {
                        if (this.functionModels[a] == "权限管理") {
                          isExist = true;
                        }
                      }
                      if (!isExist) {
                        this.functionModels.push("权限管理");
                      }
                    } else if (this.authorityList[i] == 55 || this.authorityList[i] == 56) {
                      var isExist = false;
                      for (var a = 0; a < this.functionModels.length; a++) {
                        if (this.functionModels[a] == "组别管理") {
                          isExist = true;
                        }
                      }
                      if (!isExist) {
                        this.functionModels.push("组别管理");
                      }
                    } else if (this.authorityList[i] == 38 || this.authorityList[i] == 40 || this.authorityList[i] == 41 || this.authorityList[i] == 42) {
                      var isExist = false;
                      for (var a = 0; a < this.functionModels.length; a++) {
                        if (this.functionModels[a] == "课程管理") {
                          isExist = true;
                        }
                      }
                      if (!isExist) {
                        this.functionModels.push("课程管理");
                      }
                    } else if (this.authorityList[i] == 36 || this.authorityList[i] == 52) {
                      var isExist = false;
                      for (var a = 0; a < this.functionModels.length; a++) {
                        if (this.functionModels[a] == "教学管理") {
                          isExist = true;
                        }
                      }
                      if (!isExist) {
                        this.functionModels.push("教学管理");
                      }
                    } else if (this.authorityList[i] == 33 || this.authorityList[i] == 63 || this.authorityList[i] == 54) {
                      var isExist = false;
                      for (var a = 0; a < this.functionModels.length; a++) {
                        if (this.functionModels[a] == "班级管理") {
                          isExist = true;
                        }
                      }
                      if (!isExist) {
                        this.functionModels.push("班级管理");
                      }
                    } else if (this.authorityList[i] == 25 || this.authorityList[i] == 35 || this.authorityList[i] == 39) {
                      var isExist = false;
                      for (var a = 0; a < this.functionModels.length; a++) {
                        if (this.functionModels[a] == "课程信息维护") {
                          isExist = true;
                        }
                      }
                      if (!isExist) {
                        this.functionModels.push("课程信息维护");
                      }
                    } else if (this.authorityList[i] == 43 || this.authorityList[i] == 44 || this.authorityList[i] == 45 || this.authorityList[i] == 46 || this.authorityList[i] == 59) {
                      var isExist = false;
                      for (var a = 0; a < this.functionModels.length; a++) {
                        if (this.functionModels[a] == "个人信息维护") {
                          isExist = true;
                        }
                      }
                      if (!isExist) {
                        this.functionModels.push("个人信息维护");
                      }
                    }
                  }
                  for (var i = 0; i < this.functionModels.length; i++) {
//            生成一级功能块列表
                    if(this.functionModels[i] == "成绩" || this.functionModels[i] == "补考") {
                      var isExist = false;
                      for (var a = 0; a < this.authorityModels.length; a++) {
                        if (this.authorityModels[a].name == "成绩管理") {
                          isExist = true;
                        }
                      }
                      if (!isExist) {
                        this.authorityModels.push({ name:"成绩管理", msgNum:"0" });
                      }
                    }else if(this.functionModels[i] == "资源管理设置" || this.functionModels[i] == "人员管理设置") {
                      var isExist = false;
                      for (var a = 0; a < this.authorityModels.length; a++) {
                        if (this.authorityModels[a].name == "基本设置") {
                          isExist = true;
                        }
                      }
                      if (!isExist) {
                        this.authorityModels.push({ name:"基本设置", msgNum:"0" });
                      }
                    }else if(this.functionModels[i] == "教务安排" || this.functionModels[i] == "教务审查") {
                      var isExist = false;
                      for (var a = 0; a < this.authorityModels.length; a++) {
                        if (this.authorityModels[a].name == "教务管理") {
                          isExist = true;
                        }
                      }
                      if (!isExist) {
                        this.authorityModels.push({ name:"教务管理", msgNum:"0" });
                      }
                    }else if(this.functionModels[i] == "考务管理") {
                      this.authorityModels.push({ name:"考务管理", msgNum:"0" });
                    }else if(this.functionModels[i] == "课酬管理") {
                      this.authorityModels.push({ name:"课酬管理", msgNum:"0" });
                    }else if(this.functionModels[i] == "教务公告") {
                      this.authorityModels.push({ name:"教务公告", msgNum:"0" });
                    }else if(this.functionModels[i] == "排课操作" || this.functionModels[i] == "排课信息") {
                      var isExist = false;
                      for (var a = 0; a < this.authorityModels.length; a++) {
                        if (this.authorityModels[a].name == "智能排课") {
                          isExist = true;
                        }
                      }
                      if (!isExist) {
                        this.authorityModels.push({ name:"智能排课", msgNum:"0" });
                      }
                    }else if(this.functionModels[i] == "权限管理") {
                      this.authorityModels.push({ name:"权限管理", msgNum:"0" });
                    }else if(this.functionModels[i] == "组别管理"){
                      this.authorityModels.push({ name:"组别管理", msgNum:"0" });
                    }else if(this.functionModels[i] == "课程管理"){
                      this.authorityModels.push({ name:"课程管理", msgNum:"0" });
                    }else if(this.functionModels[i] == "教学管理"){
                      this.authorityModels.push({ name:"教学管理", msgNum:"0" });
                    }else if(this.functionModels[i] == "班级管理"){
                      this.authorityModels.push({ name:"班级管理", msgNum:"0" });
                    }else if(this.functionModels[i] == "课程信息维护"){
                      this.authorityModels.push({ name:"课程信息维护", msgNum:"0" });
                    }else if(this.functionModels[i] == "个人信息维护"){
                      this.authorityModels.push({ name:"个人信息维护", msgNum:"0" });
                    }
                  }
                  this.inFunction = false;
                  this.inFuncModels = [];
                  this.$nextTick(function () {
                    var img = document.getElementById("topFuncDiv").getElementsByTagName("img");
                    for (var i = 0; i < img.length; i++) {
                      if (img[i].alt == "基本设置") {
                        img[i].src = this.baseSettingImg;
                      } else if (img[i].alt == "成绩管理") {
                        img[i].src = this.gradeManageImg;
                      } else if (img[i].alt == "教务管理") {
                        img[i].src = this.manageImg;
                      } else if (img[i].alt == "考务管理") {
                        img[i].src = this.eduAdminManageImg;
                      } else if (img[i].alt == "课酬管理") {
                        img[i].src = this.emolumentImg;
                      } else if (img[i].alt == "教务公告") {
                        img[i].src = this.informationImg;
                      } else if (img[i].alt == "智能排课") {
                        img[i].src = this.courseImg;
                      } else if (img[i].alt == "权限管理") {
                        img[i].src = this.roleImg;
                      } else if (img[i].alt == "课程信息维护") {
                        img[i].src = this.courseInfoImg;
                      } else if (img[i].alt == "班级管理") {
                        img[i].src = this.baseSettingImg;
                      } else if (img[i].alt == "教学管理") {
                        img[i].src = this.teachMgmtImg;
                      } else if (img[i].alt == "课程管理") {
                        img[i].src = this.courseMgmtImg;
                      } else if (img[i].alt == "个人信息维护") {
                        img[i].src = this.personInfoImg;
                      } else{
                        img[i].src = this.baseSettingImg;
                      }
                    }
                    if (param == "gradeManage") {
                      for (var i = 0; i < this.functionModels.length; i++) {
                        if (this.functionModels[i] == "成绩") {
                          this.inFuncModels.push({
                            name: "成绩",
                            greenImg: require("./images/成绩绿.png"),
                            blueImg: require("./images/成绩蓝.png"),
                            greenOrBlue: true,
                            pageModels: []
                          });
                          for (var j = 0; j < this.authorityList.length; j++) {
                            if (this.authorityList[j] == 28) {
                              this.inFuncModels[this.inFuncModels.length - 1].pageModels.push({
                                name: "成绩统计",
                                href: "#/eduAdmin/gradeManage/grade/gradeStat"
                              });
                            } else if (this.authorityList[j] == 29) {
                              this.inFuncModels[this.inFuncModels.length - 1].pageModels.push({
                                name: "成绩查询",
                                href: "#/eduAdmin/gradeManage/grade/gradeQuery"
                              });
                            } else if (this.authorityList[j] == 30) {
                              this.inFuncModels[this.inFuncModels.length - 1].pageModels.push({
                                name: "成绩撤销",
                                href: "#/eduAdmin/gradeManage/grade/adminCancelGrade"
                              });
                            }
                          }
                        } else if (this.functionModels[i] == "补考") {
                          this.inFuncModels.push({
                            name: "补考",
                            greenImg: require("./images/补考绿.png"),
                            blueImg: require("./images/补考蓝.png"),
                            greenOrBlue: true,
                            pageModels: []
                          });
                          for (var j = 0; j < this.authorityList.length; j++) {
                            if (this.authorityList[j] == 30) {
                              this.inFuncModels[this.inFuncModels.length - 1].pageModels.push({
                                name: "补考成绩管理",
                                href: "#/eduAdmin/gradeManage/makeupExam/makeupExamAdmin"
                              });
                            } else if (this.authorityList[j] == 31) {
                              this.inFuncModels[this.inFuncModels.length - 1].pageModels.push({
                                name: "补考成绩输入",
                                href: "#/eduAdmin/gradeManage/makeupExam/makeupGradeInput"
                              });
                            }
                          }
                        }
                      }
                    } else if (param == "baseSetting") {
                      for (var i = 0; i < this.functionModels.length; i++) {
                        if (this.functionModels[i] == "资源管理设置") {
                          this.inFuncModels.push({
                            name: "资源管理设置",
                            greenImg: require("./images/资源管理设置绿.png"),
                            blueImg: require("./images/资源管理设置蓝.png"),
                            greenOrBlue: true,
                            pageModels: []
                          });
                          for (var j = 0; j < this.authorityList.length; j++) {
                            if (this.authorityList[j] == 27) {
                              this.inFuncModels[this.inFuncModels.length - 1].pageModels.push({
                                name: "教材管理",
                                href: "#/eduAdmin/baseSetting/resource/textbookMgmt"
                              });
                            } else if (this.authorityList[j] == 21) {
                              this.inFuncModels[this.inFuncModels.length - 1].pageModels.push({
                                name: "年级管理",
                                href: "#/eduAdmin/baseSetting/resource/eduAdminManageGrade"
                              });
                            } else if (this.authorityList[j] == 65) {
                              this.inFuncModels[this.inFuncModels.length - 1].pageModels.push({
                                name: "课程类型管理",
                                href: "#/eduAdmin/baseSetting/resource/courseTypeMgmt"
                              });
                            } else if (this.authorityList[j] == 20) {
                              this.inFuncModels[this.inFuncModels.length - 1].pageModels.push({
                                name: "教室管理",
                                href: "#/eduAdmin/baseSetting/resource/classroomMgmt"
                              });
                            }
                          }
                        } else if (this.functionModels[i] == "人员管理设置") {
                          this.inFuncModels.push({
                            name: "人员管理设置",
                            greenImg: require("./images/人员管理设置绿.png"),
                            blueImg: require("./images/人员管理设置蓝.png"),
                            greenOrBlue: true,
                            pageModels: []
                          });
                          for (var j = 0; j < this.authorityList.length; j++) {
                            if (this.authorityList[j] == 24) {
                              this.inFuncModels[this.inFuncModels.length - 1].pageModels.push({
                                name: "教研组管理",
                                href: "#/eduAdmin/baseSetting/person/eduResGroupMgmt"
                              });
                            } else if (this.authorityList[j] == 23) {
                              this.inFuncModels[this.inFuncModels.length - 1].pageModels.push({
                                name: "学生管理",
                                href: "#/eduAdmin/baseSetting/person/eduAdminManageStd"
                              });
                            } else if (this.authorityList[j] == 26) {
                              this.inFuncModels[this.inFuncModels.length - 1].pageModels.push({
                                name: "教师管理",
                                href: "#/eduAdmin/baseSetting/person/eduAdminManageTch"
                              });
                            } else if (this.authorityList[j] == 64) {
                              this.inFuncModels[this.inFuncModels.length - 1].pageModels.push({
                                name: "学生异动情况",
                                href: "#/eduAdmin/baseSetting/person/eduAdminManageClass"
                              });
                            }
                          }
                        }
                      }
                    } else if (param == "manage") {
                      for (var i = 0; i < this.functionModels.length; i++) {
                        if (this.functionModels[i] == "教务安排") {
                          this.inFuncModels.push({
                            name: "教务安排",
                            greenImg: require("./images/教务安排绿.png"),
                            blueImg: require("./images/教务安排蓝.png"),
                            greenOrBlue: true,
                            pageModels: []
                          });
                          for (var j = 0; j < this.authorityList.length; j++) {
                            if (this.authorityList[j] == 15) {
                              this.inFuncModels[this.inFuncModels.length - 1].pageModels.push({
                                name: "培养方案",
                                href: "#/eduAdmin/manage/plan/eduAdminEduPlan"
                              });
                            } else if (this.authorityList[j] == 16) {
                              this.inFuncModels[this.inFuncModels.length - 1].pageModels.push({
                                name: "教学进度",
                                href: "#/eduAdmin/manage/plan/eduAdminTeachProcess"
                              });
                            } else if (this.authorityList[j] == 34) {
                              this.inFuncModels[this.inFuncModels.length - 1].pageModels.push({
                                name: "教务管理督导",
                                href: "#/eduAdmin/manage/plan/eduAdminSupervisorManage"
                              });
                            }
                          }
                        } else if (this.functionModels[i] == "教务审查") {
                          this.inFuncModels.push({
                            name: "教务审查",
                            greenImg: require("./images/教务审查绿.png"),
                            blueImg: require("./images/教务审查蓝.png"),
                            greenOrBlue: true,
                            pageModels: []
                          });
                          for (var j = 0; j < this.authorityList.length; j++) {
                            if (this.authorityList[j] == 17) {
                              this.inFuncModels[this.inFuncModels.length - 1].pageModels.push({
                                name: "教学计划",
                                href: "#/eduAdmin/manage/examination/eduAdminTchTeachingPlan"
                              });
                            } else if (this.authorityList[j] == 62) {
                              this.inFuncModels[this.inFuncModels.length - 1].pageModels.push({
                                name: "教务查看评教",
                                href: "#/eduAdmin/manage/examination/eduAdminEvaTeachingResult"
                              });
                            }
                          }
                        }
                      }
                    } else if (param == "course") {
                      for (var i = 0; i < this.functionModels.length; i++) {
                        if (this.functionModels[i] == "排课操作") {
                          this.inFuncModels.push({
                            name: "排课操作",
                            greenImg: require("./images/排课操作绿.png"),
                            blueImg: require("./images/排课操作蓝.png"),
                            greenOrBlue: true,
                            pageModels: []
                          });
                          for (var j = 0; j < this.authorityList.length; j++) {
                            if (this.authorityList[j] == 14) {
                              this.inFuncModels[this.inFuncModels.length - 1].pageModels.push({
                                name: "排课课程设置",
                                href: "#/eduAdmin/course/courseOperation/couArrangeSetting"
                              });
                            } else if (this.authorityList[j] == 8) {
                              this.inFuncModels[this.inFuncModels.length - 1].pageModels.push({
                                name: "查看禁排申请",
                                href: "#/eduAdmin/course/courseOperation/banCouApply"
                              });
                            } else if (this.authorityList[j] == 9) {
                              this.inFuncModels[this.inFuncModels.length - 1].pageModels.push({
                                name: "合课设置",
                                href: "#/eduAdmin/course/courseOperation/combineCourse"
                              });
                            } else if (this.authorityList[j] == 7) {
                              this.inFuncModels[this.inFuncModels.length - 1].pageModels.push({
                                name: "排课结果课表",
                                href: "#/eduAdmin/course/courseOperation/couArrangeTable"
                              });
                            }
                          }
                        } else if (this.functionModels[i] == "排课信息") {
                          this.inFuncModels.push({
                            name: "排课信息",
                            greenImg: require("./images/排课信息绿.png"),
                            blueImg: require("./images/排课信息蓝.png"),
                            greenOrBlue: true,
                            pageModels: []
                          });
                          for (var j = 0; j < this.authorityList.length; j++) {
                            if (this.authorityList[j] == 6) {
                              this.inFuncModels[this.inFuncModels.length - 1].pageModels.push({
                                name: "查看课表",
                                href: "#/eduAdmin/course/courseInfo/checkCourse"
                              });
                            } else if (this.authorityList[j] == 12) {
                              this.inFuncModels[this.inFuncModels.length - 1].pageModels.push({
                                name: "查看调课申请",
                                href: "#/eduAdmin/course/courseInfo/adjustCouApply"
                              });
                            } else if (this.authorityList[j] == 13) {
                              this.inFuncModels[this.inFuncModels.length - 1].pageModels.push({
                                name: "查看补课申请",
                                href: "#/eduAdmin/course/courseInfo/makeupCouApply"
                              });
                            } else if (this.authorityList[j] == 11) {
                              this.inFuncModels[this.inFuncModels.length - 1].pageModels.push({
                                name: "查看停课申请",
                                href: "#/eduAdmin/course/courseInfo/suspendCouApply"
                              });
                            }
                          }
                        }
                      }
                    }
                    for (var i = 0; i < this.inFuncModels.length; i++) {
                      this.inFuncModels[i].pageModels.reverse();
                    }
                  });
                }, function (error) {});
              }else{
                if(param == "eduAdmin"){
//                  this.firstEnter = 3;
                  var roleId = 0;
                  for (var i = 0; i < this.roleList.length; i++) {
                    if(this.roleList[i].roleId == 3){
                      roleId = 3;
                    }
                  }
                  if(roleId == 3){
                    this.roleChange(3);
                  }else{
                    this.roleChange(parseInt(sessionStorage.getItem("lastClickRole")));
                  }
                }else if(param == "teacher"){
//                  this.firstEnter = 3;
                  var roleId = 0;
                  for (var i = 0; i < this.roleList.length; i++) {
                    if(this.roleList[i].roleId == 2){
                      roleId = 2;
                    }
                  }
                  if(roleId == 2){
                    this.roleChange(2);
                  }else{
                    this.roleChange(parseInt(sessionStorage.getItem("lastClickRole")));
                  }
                }
              }
            }else{
              if(sessionStorage.getItem("lastClickRole") != null){
                this.roleChange(parseInt(sessionStorage.getItem("lastClickRole")));
              }else{
                this.roleChange(this.roleList[0].roleId);
              }
            }
          }catch (e){
          }
        });
      },function(error){
        this.$Message.error('连接失败，请重试！',3);
        /*this.authorityList = [1,2,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,26,27,28,29,30,31,32,34,57,62,64,65,3, 25, 33, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 54,59,63]
        for (var i = 0; i < this.authorityList.length; i++) {
//            生成权限名称列表
          if(this.authorityList[i] == 28 || this.authorityList[i] == 29 || this.authorityList[i] == 32){
            var isExist = false;
            for (var a = 0; a < this.functionModels.length; a++) {
              if(this.functionModels[a] == "成绩") {
                isExist = true;
              }
            }
            if(!isExist)
              this.functionModels.push("成绩");
          }else if(this.authorityList[i] == 30 || this.authorityList[i] == 31){
            var isExist = false;
            for (var a = 0; a < this.functionModels.length; a++) {
              if(this.functionModels[a] == "补考") {
                isExist = true;
              }
            }
            if(!isExist){
              this.functionModels.push("补考");
            }
          }else if(this.authorityList[i] == 20 || this.authorityList[i] == 21 || this.authorityList[i] == 27 || this.authorityList[i] == 65){
            var isExist = false;
            for (var a = 0; a < this.functionModels.length; a++) {
              if(this.functionModels[a] == "资源管理设置") {
                isExist = true;
              }
            }
            if(!isExist){
              this.functionModels.push("资源管理设置");
            }
          }else if(this.authorityList[i] == 23 || this.authorityList[i] == 24 || this.authorityList[i] == 26 || this.authorityList[i] == 64){
            var isExist = false;
            for (var a = 0; a < this.functionModels.length; a++) {
              if(this.functionModels[a] == "人员管理设置") {
                isExist = true;
              }
            }
            if(!isExist){
              this.functionModels.push("人员管理设置");
            }
          }else if(this.authorityList[i] == 15 || this.authorityList[i] == 16 || this.authorityList[i] == 34){
            var isExist = false;
            for (var a = 0; a < this.functionModels.length; a++) {
              if(this.functionModels[a] == "教务安排") {
                isExist = true;
              }
            }
            if(!isExist){
              this.functionModels.push("教务安排");
            }
          }else if(this.authorityList[i] == 17 || this.authorityList[i] == 62){
            var isExist = false;
            for (var a = 0; a < this.functionModels.length; a++) {
              if(this.functionModels[a] == "教务审查") {
                isExist = true;
              }
            }
            if(!isExist){
              this.functionModels.push("教务审查");
            }
          }else if(this.authorityList[i] == 10){
            this.functionModels.push("考务管理");
          }else if(this.authorityList[i] == 5 || this.authorityList[i] == 22){
            var isExist = false;
            for (var a = 0; a < this.functionModels.length; a++) {
              if(this.functionModels[a] == "课酬管理") {
                isExist = true;
              }
            }
            if(!isExist){
              this.functionModels.push("课酬管理");
            }
          }else if(this.authorityList[i] == 19){
            this.functionModels.push("教务公告");
          }else if(this.authorityList[i] == 7 || this.authorityList[i] == 8 || this.authorityList[i] == 9 || this.authorityList[i] == 14){
            var isExist = false;
            for (var a = 0; a < this.functionModels.length; a++) {
              if(this.functionModels[a] == "排课操作") {
                isExist = true;
              }
            }
            if(!isExist){
              this.functionModels.push("排课操作");
            }
          }else if(this.authorityList[i] == 6 || this.authorityList[i] == 11 || this.authorityList[i] == 12 || this.authorityList[i] == 13){
            var isExist = false;
            for (var a = 0; a < this.functionModels.length; a++) {
              if(this.functionModels[a] == "排课信息") {
                isExist = true;
              }
            }
            if(!isExist){
              this.functionModels.push("排课信息");
            }
          }else if(this.authorityList[i] == 1 || this.authorityList[i] == 2){
            var isExist = false;
            for (var a = 0; a < this.functionModels.length; a++) {
              if(this.functionModels[a] == "权限管理") {
                isExist = true;
              }
            }
            if(!isExist){
              this.functionModels.push("权限管理");
            }
          }else if(this.authorityList[i] == 55 || this.authorityList[i] == 56){
            var isExist = false;
            for (var a = 0; a < this.functionModels.length; a++) {
              if(this.functionModels[a] == "组别管理") {
                isExist = true;
              }
            }
            if(!isExist){
              this.functionModels.push("组别管理");
            }
          }else if(this.authorityList[i] == 38 || this.authorityList[i] == 40 || this.authorityList[i] == 41 || this.authorityList[i] == 42){
            var isExist = false;
            for (var a = 0; a < this.functionModels.length; a++) {
              if(this.functionModels[a] == "课程管理") {
                isExist = true;
              }
            }
            if(!isExist){
              this.functionModels.push("课程管理");
            }
          }else if(this.authorityList[i] == 36 || this.authorityList[i] == 52){
            var isExist = false;
            for (var a = 0; a < this.functionModels.length; a++) {
              if(this.functionModels[a] == "教学管理") {
                isExist = true;
              }
            }
            if(!isExist){
              this.functionModels.push("教学管理");
            }
          }else if(this.authorityList[i] == 33 || this.authorityList[i] == 63 || this.authorityList[i] == 54){
            var isExist = false;
            for (var a = 0; a < this.functionModels.length; a++) {
              if(this.functionModels[a] == "班级管理") {
                isExist = true;
              }
            }
            if(!isExist){
              this.functionModels.push("班级管理");
            }
          }else if(this.authorityList[i] == 25 || this.authorityList[i] == 35 || this.authorityList[i] == 39){
            var isExist = false;
            for (var a = 0; a < this.functionModels.length; a++) {
              if(this.functionModels[a] == "课程信息维护") {
                isExist = true;
              }
            }
            if(!isExist){
              this.functionModels.push("课程信息维护");
            }
          }else if(this.authorityList[i] == 43 || this.authorityList[i] == 44 || this.authorityList[i] == 45 || this.authorityList[i] == 46 || this.authorityList[i] == 59){
            var isExist = false;
            for (var a = 0; a < this.functionModels.length; a++) {
              if(this.functionModels[a] == "个人信息维护") {
                isExist = true;
              }
            }
            if(!isExist){
              this.functionModels.push("个人信息维护");
            }
          }
        }
        for (var i = 0; i < this.functionModels.length; i++) {
//            生成一级功能块列表
          if(this.functionModels[i] == "成绩" || this.functionModels[i] == "补考") {
            var isExist = false;
            for (var a = 0; a < this.authorityModels.length; a++) {
              if (this.authorityModels[a].name == "成绩管理") {
                isExist = true;
              }
            }
            if (!isExist) {
              this.authorityModels.push({ name:"成绩管理", msgNum:"0" });
            }
          }else if(this.functionModels[i] == "资源管理设置" || this.functionModels[i] == "人员管理设置") {
            var isExist = false;
            for (var a = 0; a < this.authorityModels.length; a++) {
              if (this.authorityModels[a].name == "基本设置") {
                isExist = true;
              }
            }
            if (!isExist) {
              this.authorityModels.push({ name:"基本设置", msgNum:"0" });
            }
          }else if(this.functionModels[i] == "教务安排" || this.functionModels[i] == "教务审查") {
            var isExist = false;
            for (var a = 0; a < this.authorityModels.length; a++) {
              if (this.authorityModels[a].name == "教务管理") {
                isExist = true;
              }
            }
            if (!isExist) {
              this.authorityModels.push({ name:"教务管理", msgNum:"0" });
            }
          }else if(this.functionModels[i] == "考务管理") {
            this.authorityModels.push({ name:"考务管理", msgNum:"0" });
          }else if(this.functionModels[i] == "课酬管理") {
            this.authorityModels.push({ name:"课酬管理", msgNum:"0" });
          }else if(this.functionModels[i] == "教务公告") {
            this.authorityModels.push({ name:"教务公告", msgNum:"0" });
          }else if(this.functionModels[i] == "排课操作" || this.functionModels[i] == "排课信息") {
            var isExist = false;
            for (var a = 0; a < this.authorityModels.length; a++) {
              if (this.authorityModels[a].name == "智能排课") {
                isExist = true;
              }
            }
            if (!isExist) {
              this.authorityModels.push({ name:"智能排课", msgNum:"0" });
            }
          }else if(this.functionModels[i] == "权限管理") {
            this.authorityModels.push({ name:"权限管理", msgNum:"0" });
          }else if(this.functionModels[i] == "组别管理"){
            this.authorityModels.push({ name:"组别管理", msgNum:"0" });
          }else if(this.functionModels[i] == "课程管理"){
            this.authorityModels.push({ name:"课程管理", msgNum:"0" });
          }else if(this.functionModels[i] == "教学管理"){
            this.authorityModels.push({ name:"教学管理", msgNum:"0" });
          }else if(this.functionModels[i] == "班级管理"){
            this.authorityModels.push({ name:"班级管理", msgNum:"0" });
          }else if(this.functionModels[i] == "课程信息维护"){
            this.authorityModels.push({ name:"课程信息维护", msgNum:"0" });
          }else if(this.functionModels[i] == "个人信息维护"){
            this.authorityModels.push({ name:"个人信息维护", msgNum:"0" });
          }
        }
        this.$nextTick(function(){
          var img = document.getElementById("topFuncDiv").getElementsByTagName("img");
          for (var i = 0; i < img.length; i++) {
            if (img[i].alt == "基本设置") {
              img[i].src = this.baseSettingImg;
            } else if (img[i].alt == "成绩管理") {
              img[i].src = this.gradeManageImg;
            } else if (img[i].alt == "教务管理") {
              img[i].src = this.manageImg;
            } else if (img[i].alt == "考务管理") {
              img[i].src = this.eduAdminManageImg;
            } else if (img[i].alt == "课酬管理") {
              img[i].src = this.emolumentImg;
            } else if (img[i].alt == "教务公告") {
              img[i].src = this.informationImg;
            } else if (img[i].alt == "智能排课") {
              img[i].src = this.courseImg;
            } else if (img[i].alt == "权限管理") {
              img[i].src = this.roleImg;
            } else if (img[i].alt == "课程信息维护") {
              img[i].src = this.courseInfoImg;
            } else if (img[i].alt == "班级管理") {
              img[i].src = this.baseSettingImg;
            } else if (img[i].alt == "教学管理") {
              img[i].src = this.teachMgmtImg;
            } else if (img[i].alt == "课程管理") {
              img[i].src = this.courseMgmtImg;
            } else if (img[i].alt == "个人信息维护") {
              img[i].src = this.personInfoImg;
            } else{
              img[i].src = this.baseSettingImg;
            }
          }
          for (var i = 0; i < this.authorityModels.length; i++) {
            this.authorityModels[i].msgNum = String(parseInt(Math.random()*101, 10));
          }
        });*/
      });
    },//判断是否为“您的当前位置”跳转过来，并进行对应显示改变，或根据最后一次点击进行显示改变
    watch:{
      activeName: function () {
//        监听角色选择绑定的变化，生成一级功能块
        if(this.activeName == 3){
          this.isEduAdmin = true;
        }else{
          this.isEduAdmin = false;
        }
        this.$http.post('./getRoleAuthority',{
          "roleId": this.activeName
        },{
//      this.$http.post('../testPhp/getRoleAuthority.php',{},{
          "Content-Type":"application/json"
        }).then(function(response){
          this.authorityList = response.body.getRoleAuthorityList.authorityIdList;
          this.functionModels = [];
          this.authorityModels = [];
          for (var i = 0; i < this.authorityList.length; i++) {
//            生成权限名称列表
            if(this.authorityList[i] == 28 || this.authorityList[i] == 29 || this.authorityList[i] == 32){
              var isExist = false;
              for (var a = 0; a < this.functionModels.length; a++) {
                if(this.functionModels[a] == "成绩") {
                  isExist = true;
                }
              }
              if(!isExist)
                this.functionModels.push("成绩");
            }else if(this.authorityList[i] == 30 || this.authorityList[i] == 31){
              var isExist = false;
              for (var a = 0; a < this.functionModels.length; a++) {
                if(this.functionModels[a] == "补考") {
                  isExist = true;
                }
              }
              if(!isExist){
                this.functionModels.push("补考");
              }
            }else if(this.authorityList[i] == 20 || this.authorityList[i] == 21 || this.authorityList[i] == 27 || this.authorityList[i] == 65){
              var isExist = false;
              for (var a = 0; a < this.functionModels.length; a++) {
                if(this.functionModels[a] == "资源管理设置") {
                  isExist = true;
                }
              }
              if(!isExist){
                this.functionModels.push("资源管理设置");
              }
            }else if(this.authorityList[i] == 23 || this.authorityList[i] == 24 || this.authorityList[i] == 26 || this.authorityList[i] == 64){
              var isExist = false;
              for (var a = 0; a < this.functionModels.length; a++) {
                if(this.functionModels[a] == "人员管理设置") {
                  isExist = true;
                }
              }
              if(!isExist){
                this.functionModels.push("人员管理设置");
              }
            }else if(this.authorityList[i] == 15 || this.authorityList[i] == 16 || this.authorityList[i] == 34){
              var isExist = false;
              for (var a = 0; a < this.functionModels.length; a++) {
                if(this.functionModels[a] == "教务安排") {
                  isExist = true;
                }
              }
              if(!isExist){
                this.functionModels.push("教务安排");
              }
            }else if(this.authorityList[i] == 17 || this.authorityList[i] == 62){
              var isExist = false;
              for (var a = 0; a < this.functionModels.length; a++) {
                if(this.functionModels[a] == "教务审查") {
                  isExist = true;
                }
              }
              if(!isExist){
                this.functionModels.push("教务审查");
              }
            }else if(this.authorityList[i] == 10){
              this.functionModels.push("考务管理");
            }else if(this.authorityList[i] == 5 || this.authorityList[i] == 22){
              var isExist = false;
              for (var a = 0; a < this.functionModels.length; a++) {
                if(this.functionModels[a] == "课酬管理") {
                  isExist = true;
                }
              }
              if(!isExist){
                this.functionModels.push("课酬管理");
              }
            }else if(this.authorityList[i] == 19){
              this.functionModels.push("教务公告");
            }else if(this.authorityList[i] == 7 || this.authorityList[i] == 8 || this.authorityList[i] == 9 || this.authorityList[i] == 14){
              var isExist = false;
              for (var a = 0; a < this.functionModels.length; a++) {
                if(this.functionModels[a] == "排课操作") {
                  isExist = true;
                }
              }
              if(!isExist){
                this.functionModels.push("排课操作");
              }
            }else if(this.authorityList[i] == 6 || this.authorityList[i] == 11 || this.authorityList[i] == 12 || this.authorityList[i] == 13){
              var isExist = false;
              for (var a = 0; a < this.functionModels.length; a++) {
                if(this.functionModels[a] == "排课信息") {
                  isExist = true;
                }
              }
              if(!isExist){
                this.functionModels.push("排课信息");
              }
            }else if(this.authorityList[i] == 1 || this.authorityList[i] == 2){
              var isExist = false;
              for (var a = 0; a < this.functionModels.length; a++) {
                if(this.functionModels[a] == "权限管理") {
                  isExist = true;
                }
              }
              if(!isExist){
                this.functionModels.push("权限管理");
              }
            }else if(this.authorityList[i] == 55 || this.authorityList[i] == 56){
              var isExist = false;
              for (var a = 0; a < this.functionModels.length; a++) {
                if(this.functionModels[a] == "组别管理") {
                  isExist = true;
                }
              }
              if(!isExist){
                this.functionModels.push("组别管理");
              }
            }else if(this.authorityList[i] == 38 || this.authorityList[i] == 40 || this.authorityList[i] == 41 || this.authorityList[i] == 42){
              var isExist = false;
              for (var a = 0; a < this.functionModels.length; a++) {
                if(this.functionModels[a] == "课程管理") {
                  isExist = true;
                }
              }
              if(!isExist){
                this.functionModels.push("课程管理");
              }
            }else if(this.authorityList[i] == 36 || this.authorityList[i] == 52){
              var isExist = false;
              for (var a = 0; a < this.functionModels.length; a++) {
                if(this.functionModels[a] == "教学管理") {
                  isExist = true;
                }
              }
              if(!isExist){
                this.functionModels.push("教学管理");
              }
            }else if(this.authorityList[i] == 33 || this.authorityList[i] == 63 || this.authorityList[i] == 54){
              var isExist = false;
              for (var a = 0; a < this.functionModels.length; a++) {
                if(this.functionModels[a] == "班级管理") {
                  isExist = true;
                }
              }
              if(!isExist){
                this.functionModels.push("班级管理");
              }
            }else if(this.authorityList[i] == 25 || this.authorityList[i] == 35 || this.authorityList[i] == 39){
              var isExist = false;
              for (var a = 0; a < this.functionModels.length; a++) {
                if(this.functionModels[a] == "课程信息维护") {
                  isExist = true;
                }
              }
              if(!isExist){
                this.functionModels.push("课程信息维护");
              }
            }else if(this.authorityList[i] == 43 || this.authorityList[i] == 44 || this.authorityList[i] == 45 || this.authorityList[i] == 46 || this.authorityList[i] == 59){
              var isExist = false;
              for (var a = 0; a < this.functionModels.length; a++) {
                if(this.functionModels[a] == "个人信息维护") {
                  isExist = true;
                }
              }
              if(!isExist){
                this.functionModels.push("个人信息维护");
              }
            }
          }
          for (var i = 0; i < this.functionModels.length; i++) {
//            生成一级功能块列表
            if(this.functionModels[i] == "成绩" || this.functionModels[i] == "补考") {
              var isExist = false;
              for (var a = 0; a < this.authorityModels.length; a++) {
                if (this.authorityModels[a].name == "成绩管理") {
                  isExist = true;
                }
              }
              if (!isExist) {
                this.authorityModels.push({ name:"成绩管理", msgNum:"0" });
              }
            }else if(this.functionModels[i] == "资源管理设置" || this.functionModels[i] == "人员管理设置") {
              var isExist = false;
              for (var a = 0; a < this.authorityModels.length; a++) {
                if (this.authorityModels[a].name == "基本设置") {
                  isExist = true;
                }
              }
              if (!isExist) {
                this.authorityModels.push({ name:"基本设置", msgNum:"0" });
              }
            }else if(this.functionModels[i] == "教务安排" || this.functionModels[i] == "教务审查") {
              var isExist = false;
              for (var a = 0; a < this.authorityModels.length; a++) {
                if (this.authorityModels[a].name == "教务管理") {
                  isExist = true;
                }
              }
              if (!isExist) {
                this.authorityModels.push({ name:"教务管理", msgNum:"0" });
              }
            }else if(this.functionModels[i] == "考务管理") {
              this.authorityModels.push({ name:"考务管理", msgNum:"0" });
            }else if(this.functionModels[i] == "课酬管理") {
              this.authorityModels.push({ name:"课酬管理", msgNum:"0" });
            }else if(this.functionModels[i] == "教务公告") {
              this.authorityModels.push({ name:"教务公告", msgNum:"0" });
            }else if(this.functionModels[i] == "排课操作" || this.functionModels[i] == "排课信息") {
              var isExist = false;
              for (var a = 0; a < this.authorityModels.length; a++) {
                if (this.authorityModels[a].name == "智能排课") {
                  isExist = true;
                }
              }
              if (!isExist) {
                this.authorityModels.push({ name:"智能排课", msgNum:"0" });
              }
            }else if(this.functionModels[i] == "权限管理") {
              this.authorityModels.push({ name:"权限管理", msgNum:"0" });
            }else if(this.functionModels[i] == "组别管理"){
              this.authorityModels.push({ name:"组别管理", msgNum:"0" });
            }else if(this.functionModels[i] == "课程管理"){
              this.authorityModels.push({ name:"课程管理", msgNum:"0" });
            }else if(this.functionModels[i] == "教学管理"){
              this.authorityModels.push({ name:"教学管理", msgNum:"0" });
            }else if(this.functionModels[i] == "班级管理"){
              this.authorityModels.push({ name:"班级管理", msgNum:"0" });
            }else if(this.functionModels[i] == "课程信息维护"){
              this.authorityModels.push({ name:"课程信息维护", msgNum:"0" });
            }else if(this.functionModels[i] == "个人信息维护"){
              this.authorityModels.push({ name:"个人信息维护", msgNum:"0" });
            }
          }
          this.$nextTick(function(){
            var img = document.getElementById("topFuncDiv").getElementsByTagName("img");
            for (var i = 0; i < img.length; i++) {
              if (img[i].alt == "基本设置") {
                img[i].src = this.baseSettingImg;
              } else if (img[i].alt == "成绩管理") {
                img[i].src = this.gradeManageImg;
              } else if (img[i].alt == "教务管理") {
                img[i].src = this.manageImg;
              } else if (img[i].alt == "考务管理") {
                img[i].src = this.eduAdminManageImg;
              } else if (img[i].alt == "课酬管理") {
                img[i].src = this.emolumentImg;
              } else if (img[i].alt == "教务公告") {
                img[i].src = this.informationImg;
              } else if (img[i].alt == "智能排课") {
                img[i].src = this.courseImg;
              } else if (img[i].alt == "权限管理") {
                img[i].src = this.roleImg;
              } else if (img[i].alt == "课程信息维护") {
                img[i].src = this.courseInfoImg;
              } else if (img[i].alt == "班级管理") {
                img[i].src = this.baseSettingImg;
              } else if (img[i].alt == "教学管理") {
                img[i].src = this.teachMgmtImg;
              } else if (img[i].alt == "课程管理") {
                img[i].src = this.courseMgmtImg;
              } else if (img[i].alt == "个人信息维护") {
                img[i].src = this.personInfoImg;
              } else{
                img[i].src = this.baseSettingImg;
              }
            }
          });
        },function(error){
//          this.$Message.error('连接失败，请重试！');
//          this.authorityModels = [];
//          this.functionModels = [];
        });
        sessionStorage.setItem("lastClickRole", this.activeName);
        console.log(sessionStorage.getItem("lastClickRole"));
//        纪录最后一次点击角色
      },
      modal2: function () {
        if(this.modal2){
          this.$http.post('./getEvaTime',{},{
            "Content-Type":"application/json"
          }).then(function(response){
            if(response.body.result == "1") {
              this.latelyEvaTime = "最近的评教时间为：" + response.body.evaTime.startEvaTeachTime + "到" + response.body.evaTime.endEvaTeachTime;
            }else if(response.body.result == "0") {
              this.latelyEvaTime = "";
            }
          },function(error){
          });
        }
      },
      modal3: function () {
        if(this.modal3){
          this.$http.post('./getScoreInputTime',{},{
            "Content-Type":"application/json"
          }).then(function(response){
            if(response.body.result == "1") {
              this.latelyGradeTime = "最近的成绩录入时间为：" + response.body.scoreInputTime.startScoreInputTime + "到" + response.body.scoreInputTime.endScoreInputTime;
            }else if(response.body.result == "0") {
              this.latelyGradeTime = "";
            }
          },function(error){
          });
        }
      },
    },
    methods:{
      termStart: function () {
        var firstDate = new Date(this.firstDate);
        var secondDate = new Date(this.secondDate);
        if(this.firstDate == "" || this.secondDate == ""){
          this.errorMessage = "时间不能为空,请重试!";
          this.modal = true;
        }else if(firstDate >= secondDate){
          this.errorMessage = "第一学期开始时间必须早于第二学期，请重试！";
          this.modal = true;
        }else if((secondDate - firstDate) / (1000 * 3600 * 24) < 120){
          this.errorMessage = "学期间隔时间太短，请重试！";
          this.modal = true;
        }else {
          this.dateError = "";
          var firstYear = firstDate.getFullYear() + "-" + (firstDate.getFullYear() + 1) + ".1";
          this.$http.post('./setSchoolStartTime', {
            "startYearSemester": firstYear,
            "startTime": firstDate
          }, {
            "Content-Type": "application/json"
          }).then(function (res) {
            this.modal1 = false;
            if (res.body.result == "1") {
              this.$Message.success('学期开始时间设置成功！');
            } else {
              this.dateError += res.body.result + "，请重试！";
              this.errorMessage = this.dateError;
              this.modal = true;
            }
          }, function (error) {
            this.$Message.error('连接失败，请重试！');
          });

          var secondYear = (secondDate.getFullYear() - 1) + "-" + secondDate.getFullYear() + ".2";
          this.$http.post('./setSchoolStartTime', {
            "startYearSemester": secondYear,
            "startTime": secondDate
          }, {
            "Content-Type": "application/json"
          }).then(function (res) {
            this.modal1 = false;
            if (res.body.result == "1") {
              this.$Message.success('学期开始时间设置成功！');
            } else {
              this.dateError += res.body.result + "，请重试！";
              this.errorMessage = this.dateError;
              this.modal = true;
            }
          }, function (error) {
            this.$Message.error('连接失败，请重试！');
          });
        }
      },//学期开始时间设置
      evaluationStart: function () {
        console.log(this.evaluationDate);
        if(this.evaluationDate[0] == "" || this.evaluationDate[1] == ""){
          this.errorMessage = "时间区间不能为空,请重试!";
          this.modal = true;
        }else {
          this.$http.post('./setEvaTime', {
            "startEvaTeachTime": new Date(this.evaluationDate[0]),
            "endEvaTeachTime": new Date(this.evaluationDate[1])
          }, {
            "Content-Type": "application/json"
          }).then(function (res) {
            this.modal2 = false;
            if (res.body.result == "1") {
              this.$Message.success('评教时间设置成功！');
            }else{
              this.errorMessage = res.result;
              this.modal = true;
            }
          }, function (error) {
            this.modal2 = false;
            this.$Message.error('连接失败，请重试！');
          });
        }
      },//评教起止时间
      gradeStart: function () {
        if(this.gradeDate[0] == "" || this.gradeDate[1] == ""){
          this.errorMessage = "时间区间不能为空,请重试!";
          this.modal = true;
        }else {
          this.$http.post('./setScoreInputTime', {
            "startScoreInputTime": new Date(this.gradeDate[0]),
            "endScoreInputTime": new Date(this.gradeDate[1])
          }, {
            "Content-Type": "application/json"
          }).then(function (res) {
            this.modal3 = false;
            if (res.body.result == "1") {
              this.$Message.success('成绩录入时间设置成功！');
            }else{
              this.errorMessage = res.result;
              this.modal = true;
            }
          }, function (error) {
            this.$Message.error('连接失败，请重试！');
          });
        }
      },//成绩录入起止时间
      roleChange: function (name) {
//        角色选择触发绑定变化，触发中间功能块显隐
        this.inFunction = true;
        this.activeName = name;
        this.$nextTick(function () {
          this.$refs.roleMenu.updateActiveName();
        });
      },
      inFuncClick: function (index) {
//        点击二级功能块显隐，生成二级、三级功能块
        this.inFuncModels = [];
        if(this.authorityModels[index].name == "成绩管理"){
          for (var i = 0; i < this.functionModels.length; i++) {
            if(this.functionModels[i] == "成绩"){
              this.inFuncModels.push({ name:"成绩", greenImg:require("./images/成绩绿.png"), blueImg:require("./images/成绩蓝.png"), greenOrBlue:true, pageModels:[] });
              for (var j = 0; j < this.authorityList.length; j++) {
                if(this.authorityList[j] == 28){
                  this.inFuncModels[this.inFuncModels.length-1].pageModels.push({ name:"成绩统计", href:"#/eduAdmin/gradeManage/grade/gradeStat" });
                }else if(this.authorityList[j] == 29){
                  this.inFuncModels[this.inFuncModels.length-1].pageModels.push({ name:"成绩查询", href:"#/eduAdmin/gradeManage/grade/gradeQuery" });
                }else if(this.authorityList[j] == 30){
                  this.inFuncModels[this.inFuncModels.length-1].pageModels.push({ name:"成绩撤销", href:"#/eduAdmin/gradeManage/grade/adminCancelGrade" });
                }
              }
            }else if(this.functionModels[i] == "补考"){
              this.inFuncModels.push({ name:"补考", greenImg:require("./images/补考绿.png"), blueImg:require("./images/补考蓝.png"), greenOrBlue:true, pageModels:[] });
              for (var j = 0; j < this.authorityList.length; j++) {
                if(this.authorityList[j] == 30){
                  this.inFuncModels[this.inFuncModels.length-1].pageModels.push({ name:"补考成绩管理", href:"#/eduAdmin/gradeManage/makeupExam/makeupExamAdmin"});
                }else if(this.authorityList[j] == 31){
                  this.inFuncModels[this.inFuncModels.length-1].pageModels.push({ name:"补考成绩输入", href:"#/eduAdmin/gradeManage/makeupExam/makeupGradeInput" });
                }
              }
            }
          }
        }else if(this.authorityModels[index].name == "基本设置"){
          for (var i = 0; i < this.functionModels.length; i++) {
            if(this.functionModels[i] == "资源管理设置"){
              this.inFuncModels.push({ name:"资源管理设置", greenImg:require("./images/资源管理设置绿.png"), blueImg:require("./images/资源管理设置蓝.png"), greenOrBlue:true, pageModels:[] });
              for (var j = 0; j < this.authorityList.length; j++) {
                if(this.authorityList[j] == 27){
                  this.inFuncModels[this.inFuncModels.length-1].pageModels.push({ name:"教材管理", href:"#/eduAdmin/baseSetting/resource/textbookMgmt" });
                }else if(this.authorityList[j] == 21){
                  this.inFuncModels[this.inFuncModels.length-1].pageModels.push({ name:"年级管理", href:"#/eduAdmin/baseSetting/resource/eduAdminManageGrade" });
                }else if(this.authorityList[j] == 65){
                  this.inFuncModels[this.inFuncModels.length-1].pageModels.push({ name:"课程类型管理", href:"#/eduAdmin/baseSetting/resource/courseTypeMgmt" });
                }else if(this.authorityList[j] == 20){
                  this.inFuncModels[this.inFuncModels.length-1].pageModels.push({ name:"教室管理", href:"#/eduAdmin/baseSetting/resource/classroomMgmt" });
                }
              }
            }else if(this.functionModels[i] == "人员管理设置"){
              this.inFuncModels.push({ name:"人员管理设置", greenImg:require("./images/人员管理设置绿.png"), blueImg:require("./images/人员管理设置蓝.png"), greenOrBlue:true, pageModels:[] });
              for (var j = 0; j < this.authorityList.length; j++) {
                if(this.authorityList[j] == 24){
                  this.inFuncModels[this.inFuncModels.length-1].pageModels.push({ name:"教研组管理", href:"#/eduAdmin/baseSetting/person/eduResGroupMgmt"});
                }else if(this.authorityList[j] == 23){
                  this.inFuncModels[this.inFuncModels.length-1].pageModels.push({ name:"学生管理", href:"#/eduAdmin/baseSetting/person/eduAdminManageStd" });
                }else if(this.authorityList[j] == 26){
                  this.inFuncModels[this.inFuncModels.length-1].pageModels.push({ name:"教师管理", href:"#/eduAdmin/baseSetting/person/eduAdminManageTch" });
                }else if(this.authorityList[j] == 64){
                  this.inFuncModels[this.inFuncModels.length-1].pageModels.push({ name:"学生异动情况", href:"#/eduAdmin/baseSetting/person/eduAdminManageClass" });
                }
              }
            }
          }
        }else if(this.authorityModels[index].name == "教务管理"){
          for (var i = 0; i < this.functionModels.length; i++) {
            if(this.functionModels[i] == "教务安排"){
              this.inFuncModels.push({ name:"教务安排", greenImg:require("./images/教务安排绿.png"), blueImg:require("./images/教务安排蓝.png"), greenOrBlue:true, pageModels:[] });
              for (var j = 0; j < this.authorityList.length; j++) {
                if(this.authorityList[j] == 15){
                  this.inFuncModels[this.inFuncModels.length-1].pageModels.push({ name:"培养方案", href:"#/eduAdmin/manage/plan/eduAdminEduPlan" });
                }else if(this.authorityList[j] == 16){
                  this.inFuncModels[this.inFuncModels.length-1].pageModels.push({ name:"教学进度", href:"#/eduAdmin/manage/plan/eduAdminTeachProcess" });
                }else if(this.authorityList[j] == 34){
                  this.inFuncModels[this.inFuncModels.length-1].pageModels.push({ name:"教务管理督导", href:"#/eduAdmin/manage/plan/eduAdminSupervisorManage" });
                }
              }
            }else if(this.functionModels[i] == "教务审查"){
              this.inFuncModels.push({ name:"教务审查", greenImg:require("./images/教务审查绿.png"), blueImg:require("./images/教务审查蓝.png"), greenOrBlue:true, pageModels:[] });
              for (var j = 0; j < this.authorityList.length; j++) {
                if(this.authorityList[j] == 17){
                  this.inFuncModels[this.inFuncModels.length-1].pageModels.push({ name:"教学计划", href:"#/eduAdmin/manage/examination/eduAdminTchTeachingPlan" });
                }else if(this.authorityList[j] == 62){
                  this.inFuncModels[this.inFuncModels.length-1].pageModels.push({ name:"教务查看评教", href:"#/eduAdmin/manage/examination/eduAdminEvaTeachingResult" });
                }
              }
            }
          }
        }else if(this.authorityModels[index].name == "考务管理"){
          location.href = "#/eduAdmin/eduAdminManage";
        }else if(this.authorityModels[index].name == "课酬管理"){
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == 5){
              location.href = "#/eduAdmin/emolument/salary";
              return;
            }
          }
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == 22){
              location.href = "#/eduAdmin/emolument/setPrice";
              return;
            }
          }
        }else if(this.authorityModels[index].name == "教务公告"){
          location.href = "#/eduAdmin/information/noticeManage";
        }else if(this.authorityModels[index].name == "智能排课"){
          for (var i = 0; i < this.functionModels.length; i++) {
            if(this.functionModels[i] == "排课操作"){
              this.inFuncModels.push({ name:"排课操作", greenImg:require("./images/排课操作绿.png"), blueImg:require("./images/排课操作蓝.png"), greenOrBlue:true, pageModels:[] });
              for (var j = 0; j < this.authorityList.length; j++) {
                if(this.authorityList[j] == 14){
                  this.inFuncModels[this.inFuncModels.length-1].pageModels.push({ name:"排课课程设置", href:"#/eduAdmin/course/courseOperation/couArrangeSetting" });
                }else if(this.authorityList[j] == 8){
                  this.inFuncModels[this.inFuncModels.length-1].pageModels.push({ name:"查看禁排申请", href:"#/eduAdmin/course/courseOperation/banCouApply" });
                }else if(this.authorityList[j] == 9){
                  this.inFuncModels[this.inFuncModels.length-1].pageModels.push({ name:"合课设置", href:"#/eduAdmin/course/courseOperation/combineCourse" });
                }else if(this.authorityList[j] == 7){
                  this.inFuncModels[this.inFuncModels.length-1].pageModels.push({ name:"排课结果课表", href:"#/eduAdmin/course/courseOperation/couArrangeTable" });
                }
              }
            }else if(this.functionModels[i] == "排课信息"){
              this.inFuncModels.push({ name:"排课信息", greenImg:require("./images/排课信息绿.png"), blueImg:require("./images/排课信息蓝.png"), greenOrBlue:true, pageModels:[] });
              for (var j = 0; j < this.authorityList.length; j++) {
                if(this.authorityList[j] == 6){
                  this.inFuncModels[this.inFuncModels.length-1].pageModels.push({ name:"查看课表", href:"#/eduAdmin/course/courseInfo/checkCourse" });
                }else if(this.authorityList[j] == 12){
                  this.inFuncModels[this.inFuncModels.length-1].pageModels.push({ name:"查看调课申请", href:"#/eduAdmin/course/courseInfo/adjustCouApply" });
                }else if(this.authorityList[j] == 13){
                  this.inFuncModels[this.inFuncModels.length-1].pageModels.push({ name:"查看补课申请", href:"#/eduAdmin/course/courseInfo/makeupCouApply" });
                }else if(this.authorityList[j] == 11){
                  this.inFuncModels[this.inFuncModels.length-1].pageModels.push({ name:"查看停课申请", href:"#/eduAdmin/course/courseInfo/suspendCouApply" });
                }
              }
            }
          }
        }else if(this.authorityModels[index].name == "权限管理"){
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == 1){
              location.href = "#/eduAdmin/role/authorityMgmt1";
              return;
            }
          }
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == 2){
              location.href = "#/eduAdmin/role/eduAdminAuthorityManage2";
              return;
            }
          }
        }else if(this.authorityModels[index].name == "组别管理"){
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == 56){
              location.href = "#/teacher/group/eduAdminTchTeachingPlan";
              return;
            }
          }
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == 55){
              location.href = "#/teacher/group/research";
              return;
            }
          }
        }else if(this.authorityModels[index].name == "课程管理"){
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == 41){
              location.href = "#/teacher/course/makeupClass";
              return;
            }
          }
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == 40){
              location.href = "#/teacher/course/tchManuAdjCl";
              return;
            }
          }
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == 39){
              location.href = "#/teacher/course/stopClass";
              return;
            }
          }
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == 38){
              location.href = "#/teacher/course/requirement";
              return;
            }
          }
        }else if(this.authorityModels[index].name == "教学管理"){
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == 36){
              location.href = "#/teacher/teach/courseList";
              return;
            }
          }
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == 52){
              location.href = "#/teacher/teach/director";
              return;
            }
          }
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == 37){
              location.href = "#/teacher/teach/normalSchedule";
              return;
            }
          }
        }else if(this.authorityModels[index].name == "班级管理"){
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == 63){
              location.href = "#/teacher/class/teachingEvaluate";
              return;
            }
          }
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == 33){
              location.href = "#/teacher/class/tchGradesInput";
              return;
            }
          }
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == 54){
              location.href = "#/teacher/class/classList";
              return;
            }
          }
        }else if(this.authorityModels[index].name == "课程信息维护"){
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == 39){
              location.href = "#/teacher/classInfo/tchCheckTimetable";
              return;
            }
          }
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == 25){
              location.href = "#/teacher/classInfo/teacherTestInfo";
              return;
            }
          }
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == 35){
              location.href = "#/teacher/classInfo/tchCheckSalary";
              return;
            }
          }
        }else if(this.authorityModels[index].name == "个人信息维护"){
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == 43){
              location.href = "#/teacher/personInfo/basicMessage";
              return;
            }
          }
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == 44){
              location.href = "#/teacher/info/educationManege";
              return;
            }
          }
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == 46){
              location.href = "#/teacher/info/certificateManege";
              return;
            }
          }
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == 45){
              location.href = "#/teacher/info/experience";
              return;
            }
          }
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == 59){
              location.href = "#/teacher/info/passwdChange";
              return;
            }
          }
        }
        for (var i = 0; i < this.inFuncModels.length; i++) {
          this.inFuncModels[i].pageModels.reverse();
        }
        this.inFunction = false;
      },
      imgOver: function (index){
//        鼠标滑上切换图片
        this.inFuncModels[index].greenOrBlue = false;
      },
      imgOut: function (index){
//        鼠标滑出切换图片
        this.inFuncModels[index].greenOrBlue = true;
      },
      announcementClick: function (id) {
//        公告点击跳转详情
        if(id != "null") {
          location.href = "#/eduAdmin/information/notifyInformation?" + id;
        }
      }
    }

  }
</script>

<style scoped>
  #eduAdminHomeDiv {
    background-color: white;
    display: flex;
    border: thin solid whitesmoke;
    border-top: thin solid #DCDCDC;
    overflow-x: hidden;
  }
  #menuDiv{
    /*左侧功能栏*/
    width: 13rem;
    min-width: 13rem;
    background-color: #EEF3FA;
    border: thin solid #EEF3FA;
  }
  #menu{
    background-color: transparent;
  }
  #termStartButton{
    /*学期开始时间设置按钮*/
    margin-top: 2rem;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
  #evaluationStartButton{
    /*评教起止时间设置按钮*/
    margin-top: 2rem;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
  #gradeStartButton{
    margin-top: 2rem;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
  .ivu-menu-item-selected{
    /*角色被选中的背景色*/
    background-color: white;
  }
  #pageDiv{
    /*功能块区域*/
    width: 75%;
    height: 100%;
    padding: 1rem;
    display: flex;
    /*flex-direction: column;*/
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
  }
  #topFuncDiv{
    /*一级功能块区域*/
    width: 95% ;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-left: 1rem;
  }
  .modelImg{
    /*一级功能块图片*/
    font-weight: normal;
    font-size: 0.7rem;
    height: 5rem;
  }
  .pageSpan{
    /*功能块*/
    width: 20%;
    min-width: 5rem;
    padding-bottom: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-direction: column;
    font-weight: bold;
    cursor: pointer;
    height: 7rem;
    margin: 1.5rem 2.5rem;
    background-color: transparent;
    text-align: center;
    border: thick solid #E9ECF2;
    border-image:-webkit-linear-gradient(-45deg, #A7C8D9,#B2E9D5) 30 30;
    border-image:-moz-linear-gradient(-45deg,#A7C8D9,#B2E9D5) 30 30;
    border-image:linear-gradient(-45deg,#A7C8D9,#B2E9D5) 30 30;
    box-shadow: 0.2rem 0.2rem 0.5rem 0.1rem grey;
  }
  .pageSpan li{
    font-weight: normal;
  }
  ul{
    margin: 0.5rem 0 0 0;
    padding: 0;
  }
  a{
    text-decoration: none;
    color: black;
  }
  a:hover{
    cursor: pointer;
    color: red;
  }
  #functionDiv{
    /*二级三级功能块区域*/
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    align-items: flex-start;
    height: 20rem;
  }
  #functionDiv ul{
    /*三级功能列表*/
    display: flex;
    align-items: center;
    margin-left: 1rem;
  }#functionDiv li{
     /*三级功能列表*/
     margin-left: 2rem;
   }
  #functionDiv div{
    /*二级功能块区域*/
    display: flex;
  }
  #functionDiv div div{
    /*二级功能块*/
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  #functionDiv div:hover{
    color: red;
  }
  #functionDiv img{
    height: 5rem;
  }
  #backButtonDiv{
    /*返回一级功能块的按钮区域*/
    width:100%;
    text-align: center;
    margin-top: 2rem
  }
  .announcementName{
    /*公告*/
    width: 13.5rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
  }
  #announcementDiv{
    /*公告区域*/
    display: flex;
    width: 25rem;
    margin-top: 2rem;
    height: 28rem;
    position: relative;
    right: 1.5rem;
  }
  #topSpan:before {
    /*公告区域边框*/
    content: "";
    position: relative;
    width: 0.3rem;
    height: 15rem;
    bottom: 7.5rem;
    left: 5rem;
    background-color: #B2E9D5;
    display: block;
    transform: rotate(90deg);
  }
  #bottomSpan:before{
    /*公告区域边框*/
    content: "";
    position: relative;
    width: 0.3rem;
    height: 15rem;
    right: 4.8rem;
    top: 22.5rem;
    background-color: #B2E9D5;
    display: block;
    transform: rotate(90deg);
  }
  #announcementDiv:before {
    /*公告区域边框*/
    content: "";
    position: relative;
    width: 0.3rem;
    height: 8rem;
    bottom: 0.6rem;
    right: 0.8rem;
    background-color: #A7C8D9;
    display: block;
  }
  #announcementDiv:after {
    /*公告区域边框*/
    content: "";
    position: relative;
    width: 0.3rem;
    height: 8rem;
    left: 1rem;
    top: 22.6rem;
    background-color: #A7C8D9;
    display: block;
  }
  #nameUl{
    /*公告列表*/
    overflow-y: auto;
  }
  #nameUl li{
    line-height: 1.5rem;
    display: flex;
    font-size: 0.9rem;
  }
  #nameUl li span{
    display: inline-block;
  }
  #nameUl li:hover{
    text-decoration: underline;
    color: #0DA3E2;
    cursor: pointer;
  }
  #detail{
    /*详情点击*/
    position: absolute;
    top: 27rem;
    left: 15.5rem;
  }
  #detail:hover{
    cursor: pointer;
    color: red;
  }
  img{
    width: 5rem;
  }
  @media screen and (max-width: 1384px) {
    .announcementName{
      width: 10.5rem;
    }
  }
  @media screen and (min-width:320px) and (max-width:769px) {
    #menuDiv{
      min-width: 11rem;
    }
  }
</style>
