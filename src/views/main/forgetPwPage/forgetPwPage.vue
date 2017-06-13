<template>
  <div id="forgetPassword" :style="{ backgroundImage: 'url(' + img1 + ')' }">
    <div id="main">
      <div id="titleDiv">
        <a :href="imgHref"><img id="schoolImg" src="../../../assets/images/title.png" alt="四川省医科科学院·四川省人民医院·护士学校" ></a>
        <div id="userExitDiv">
          <a :href="exitHref"><img id="exitImg" src="../../../assets/images/exit.png" alt="退出图标" title="退出"></a>
        </div>
      </div>
      <div id="stepDiv">
        <Steps :current="current">
          <Step :title="step1" content="输入帐号与验证邮箱"></Step>
          <Step :title="step2" content="发送验证邮件"></Step>
          <Step title="待进行" content="设置新密码"></Step>
        </Steps>
      </div>
      <div id="inputDiv">
        <p class="operationP">
          帐号：
          <input type="text" v-model="userId">
        </p>
        <p class="operationP">
          邮箱：
          <input type="text" v-model="email">
        </p>
        <p class="operationP">
          <button id="nextButton" class="am-btn am-btn-success am-radius" @click="nextClick">下一步</button>
        </p>
        <p id="emailP" style="display: none;font-size: 1.2rem"></p>
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
  export default {
    name: "forgetPassword",
    data () {
      return {
        img1: require("../../../assets/images/login-background.jpg"),//页面背景图片
        imgHref: "http://www.samsph.com/hsxx/1092/1/",//官网
        exitHref: "#/login",
//        退出返回登录
        step1: "进行中",
        step2: "待进行",
//        步骤状态
        current: 0,
//        活动步骤
        userId: "",
//        用户帐号
        email: "",
//        验证邮箱
        sending: false,
//        邮件发送状态
        modal: false,
//        对话框显隐
        errorMessage: ""
      }
    },
    mounted: function() {
      var dom = document.getElementById("forgetPassword");
      dom.style.height = window.innerHeight + "px";
    },
    methods: {
      removeLoading: function(){
//        移除正在发送邮件的提示
        try {
          var msg = document.getElementsByClassName("ivu-message-custom-content ivu-message-loading");
          if (!!window.ActiveXObject || "ActiveXObject" in window) {
            for (var i = 0; i < msg.length; i++) {
              msg[i].parentNode.parentNode.parentNode.innerHTML = "";
            }
            this.sending = false;
//                IE浏览器对removeChild实现有问题
          } else {
            for (var i = 0; i < msg.length; i++) {
              msg[i].parentNode.parentNode.parentNode.removeChild(msg[i].parentNode.parentNode);
            }
            this.sending = false;
          }
        }catch (e){
          this.sending = false;
        }
      },
      nextClick: function(){
//        发送验证邮件
        if(!this.sending) {
          if(this.userId == ""){
            this.errorMessage = "帐号不能为空,请确认重试！";
            this.modal = true;
          }else if(this.email.indexOf("@") < 0){
            this.errorMessage = "邮件输入格式有误,请确认重试！";
            this.modal = true;
          }else {
            this.sending = true;
            this.$Message.loading('正在验证并发送邮件，请等待……', 0);
            this.$Loading.start();
//        this.$http.post('../testPhp/loginCheck.php', {
            this.$http.post('./findbackPwd', {
              "userId": this.userId,
              "email": this.email
            }, {
              "Content-Type": "application/json"
            }).then(function (response) {
              this.removeLoading();
              console.log(response.body);
              if (response.body.result == "1") {
                this.$Loading.finish();
                this.current = 1;
                this.step1 = "已完成";
                this.step2 = "进行中";
                var operationP = document.getElementsByClassName("operationP");
                for (var i = 0; i < operationP.length; i++) {
                  operationP[i].style.display = "none";
                }
                var emailP = document.getElementById("emailP");
                emailP.style.display = "block";
                emailP.innerHTML = "验证邮件已发送到" + this.email + ",请在有效期内点击打开邮件内链接完成验证。";
              } else {
                this.$Loading.error();
//              this.$Message.error("帐号或邮件地址有误,请确认重试！");
                this.errorMessage = "帐号或邮件地址有误,请确认重试！";
                this.modal = true;
              }
            }, function (error) {
              this.$Message.error('连接失败，请重试！', 3);
              this.$Loading.error();
              this.removeLoading();
            });
          }
        }
      }
    }
  }
</script>

<style scoped>
  #forgetPassword{
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
  #nextButton{
    /*邮件发送验证按钮*/
    width: 5.6rem;
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