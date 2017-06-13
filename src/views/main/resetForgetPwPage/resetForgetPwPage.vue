<template>
  <div id="resetForgetPassword" :style="{ backgroundImage: 'url(' + img1 + ')' }">
    <div id="main">
      <div id="titleDiv">
        <a :href="imgHref"><img id="schoolImg" src="../../../assets/images/title.png" alt="四川省医科科学院·四川省人民医院·护士学校" ></a>
        <div id="userExitDiv">
          <a :href="exitHref"><img id="exitImg" src="../../../assets/images/exit.png" alt="退出图标" title="退出"></a>
        </div>
      </div>
      <div id="stepDiv">
        <Steps :current="2">
          <Step title="已完成" content="输入帐号与验证邮箱"></Step>
          <Step title="已完成" content="发送验证邮件"></Step>
          <Step title="进行中" content="设置新密码"></Step>
        </Steps>
      </div>
      <div id="inputDiv">
        <p class="operationP">
          输入新密码：
          <input type="password" v-model="newPwd">
        </p>
        <span style="display: none;color: red" id="pwIsNormalP">密码要求为6-15位的数字或字母组成！</span>
        <p class="operationP">
          确认新密码：
          <input type="password" v-model="confirmPwd">
        </p>
        <p class="operationP">
          <button id="nextButton" class="am-btn am-btn-success am-radius" @click="nextClick">确定</button>
        </p>
        <p id="tipP">加载中……</p>
      </div>
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
  var CryptoJS = require("crypto-js");
  export default {
    name: "resetForgetPassword",
    data () {
      return {
        img1: require("../../../assets/images/login-background.jpg"),//页面背景图片
        imgHref: "http://www.samsph.com/hsxx/1092/1/",//官网
        exitHref: "#/login",//退出跳转
        newPwd: "",//新密码
        confirmPwd: "",//确认密码
        userId: "",//用户帐号
        modal: false,//对话框显隐
        errorMessage: "",
        isNormal: true,
//        密码是否符合要求
      }
    },
    mounted: function() {
//      dom加载后获取后端的邮箱验证结果
      var dom = document.getElementById("resetForgetPassword");
      dom.style.height = window.innerHeight + "px";
      var thisURL = document.URL;
      try{
        var param =thisURL.split("?")[1];
        var paramA= param.split("&")[0];
        var paramB= param.split("&")[1];
        var sid = null;
        if(paramA.split("=")[0] == "sid"){
          sid = paramA.split("=")[1];
          this.userId = paramB.split("=")[1];
        }else{
          this.userId = paramA.split("=")[1];
          sid = paramB.split("=")[1];
        }
      }catch (e){}
//      this.$http.post('../testPhp/loginCheck.php', {
      this.$http.post('./checkLink', {
          "sid": sid,
          "userId": this.userId
      }, {
        "Content-Type": "application/json"
      }).then(function (response) {
        console.log(response.body);
        var operationP = document.getElementsByClassName("operationP");
        var tipP = document.getElementById("tipP");
        try{
          if(response.body.result == "1"){
            for(var i = 0;i < operationP.length;i++){
              operationP[i].style.display = "block";
            }
            tipP.style.display = "none";
          }else if(response.body.result == "2"){
            tipP.innerHTML = "验证链接超时失效，请重试！"
          }else{
            tipP.innerHTML = "验证链接有误，请重试！"
          }
        }catch (e){
          console.log(e);
        }
      }, function (error) {
        document.getElementById("tipP").innerHTML = "连接失败，请重试！";
      });
    },
    watch: {
      newPwd: function () {
        var pwIsNormalP = document.getElementById("pwIsNormalP");
        if(this.newPwd.match(/^[a-zA-Z0-9]{6,10}$/)){
          this.isNormal = true;
          pwIsNormalP.style.display = "none";
        }else{
          this.isNormal = false;
          pwIsNormalP.style.display = "block";
        }
      }
    },
    methods: {
      nextClick: function(){
//        修改密码
        if(this.newPwd == ""){
          this.errorMessage = "密码不能为空,请确认重试！";
          this.modal = true;
        }else if(!this.isNormal){
          this.errorMessage = "密码要求为6-15位的数字或字母组成！";
          this.modal = true;
        }else if(this.newPwd != this.confirmPwd){
          this.errorMessage = "两次输入的新密码不相同！";
          this.modal = true;
        }else{
          var a = CryptoJS.MD5(this.newPwd + this.userId + "护士学校");
          a = a.toString().toUpperCase();
          function encrypt(data) {
            var key  = CryptoJS.enc.Latin1.parse('uestc2017nurse01');
            var iv   = CryptoJS.enc.Latin1.parse('10esrun7102ctseu');
            return CryptoJS.AES.encrypt(data, key, {iv:iv,mode:CryptoJS.mode.CBC,padding:CryptoJS.pad.ZeroPadding}).toString();
          }
//          this.$http.post('../testPhp/loginCheck.php', {
          this.$http.post('./setNewPwd', {
            "userId": this.userId,
            "newPwd": JSON.stringify(encrypt(a))
          }, {
            "Content-Type": "application/json"
          }).then(function (response) {
            console.log(response.body);
            if(response.body.result == "1"){
              this.$Message.success("修改成功，请牢记新密码！5s后跳转到登录页面……");
              setTimeout("location.href = '#/login'", 5000);
            }else{
//              this.$Message.error("修改失败，请确认新密码是否符合要求或验证是否仍有效！")
              this.errorMessage = "修改失败，请确认新密码是否符合要求或验证是否仍有效！";
              this.modal = true;
            }
          }, function (error) {
            this.$Message.error('连接失败，请重试！',3);
          });
        }
      }
    }
  }
</script>

<style scoped>
  #resetForgetPassword{
    min-height: 35rem;
    display: flex;
    align-items: center;
    background-size: cover;
  }
  #schoolImg{
    /*学校图标*/
    width: 23rem;
    height: 3rem;
    border-radius: 1rem;
  }
  #userExitDiv{
    /*退出区域*/
    float: right;
    display: flex;
    align-items: center;
    position: relative;
    top: 0.5rem;
  }
  #exitImg{
    /*退出图标*/
    position: relative;
    top: 0.2rem;
    padding-left: 0.7rem;
    width: 2rem;
    height: 2rem;
  }
  #main{
    /*主要内容区域*/
    border: solid LightGreen;
    background-color: white;
    border-radius: 1rem;
    height: 26rem;
    width: 50%;
    margin: 0 auto;
    padding: 1rem;
  }
  #stepDiv{
    /*步骤条区域*/
    margin-left: 15%;
    margin-top: 1rem;
    background-color: white;
  }
  #titleDiv{
    /*主要内容的顶部区域*/
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding-top: 1rem;
  }
  #inputDiv{
    /*输入区域*/
    border-top: thin solid #f3f3f3;
    height: 60%;
    margin: 1rem 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-content: center;
  }
  .operationP{
    /*输入区域*/
    display: none;
  }
  #nextButton{
    /*修改密码按钮*/
    width: 5.6rem;
  }
  #tipP{
    /*操作提示*/
    font-size: 1.2rem;
  }
  /*@media screen and (max-width:769px) {
    #schoolImg{
      !*学校图标*!
      width: 15rem;
      height: 2rem;
    }
    #main{
      width: 80%;
    }
  }*/
</style>
