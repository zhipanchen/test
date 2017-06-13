<template>
  <div id="couArrangeTableDiv">
    <div id="operationDiv">
      <div id="selectDiv">
        <button id="queryButton" @click="modal = true"  class="am-btn am-btn-success am-radius">智能排课</button>
        <form action="./autoArrangeSeeCurriculumExcel" method="get">
          <button id="exportButton" class="am-btn am-btn-success am-radius" type="submit" style="margin-left: 1.4rem">导出</button>
        </form>
      </div>
    </div>
    <div class="positionBar">
      <span>您的当前位置：</span>
      <span><a href="#/login/main/eduAdminHome" class="returnHome">首页</a></span>
      <span> > <a href="#/login/main/eduAdminHome?course" class="returnHome">智能排课</a> > 排课操作 > 排课结果课表</span>
    </div>
    <div id="mainDiv">
      <p id="tableTipP">显示当前智能排课结果生成的课表；支持调换选定的两门课程；重新排课之后可能会由于程序运行时间问题，需要等待并刷新页面。</p>
      <p id="tableInfoP">当前排课课表：</p>
      <tableDiv :queryCourse="queryCourse"></tableDiv><!--表格组件-->
    </div>

    <Modal
        v-model="modal"
        width="400"
        :mask-closable="false"
        id="modalBody"
        :closable="closable"
        :style="{top:'10rem'}">
      <div style="font-size: 1.1rem;text-align: center;">
        <p>{{ modalMessage }}</p>
      </div>
      <div slot="footer" style="text-align: center">
        <Button  id="modalBtn" @click="restartArrangeClick()" :loading="loading">确定</Button>
        <button id="modalBtn" @click="closeModal()">取消</button>
      </div>
    </Modal>
  </div>
</template>
<!--待完善查询课表的数据交互，需要确认后端的查询方式；待完善下拉搜索功能，需要确认后端提供数据库搜索支持还是前端通过js搜索处理-->
<script>
  import tableDiv from '../tableDiv/tableDiv.vue'
  export default {
    name: 'couArrangeTableDiv',
    data () {
      return {
        modal: false,
//        对话框显隐
        modalMessage: "您确定进行智能排课吗?",
        loading: false,
//        异步关闭对话框
        closable: false,
//        取消esc关闭对话框和左上角×
        isClose: true
//        是否允许关闭对话框
      }
    },
    components: {
      tableDiv
    },
    /*beforeMount: function() {
      this.$http.post('./alternateLessionHandle.action',{},{
//            this.$http.post('../testPhp/adjustCouApply.php',{},{
        "Content-Type":"application/json"
      }).then(function(response){
        console.log(response.body);
        var data = response.body;
        this.applications = data.applicationsList;
      },function(error){
        this.$Message.error("连接失败，请重试！");
      });
    },*/
    methods: {
      restartArrangeClick: function(){
//        重新智能排课
        this.modalMessage = '正在智能排课中……';
        this.loading = true;
        this.isClose = false;
        this.$http.post('./acdeminArrangeCurriculum',{},{
//        this.$http.post('../testPhp/adjustCouApplySetTrue.php',{},{
          "Content-Type":"application/json"
        }).then(function(response){
          location.reload();
          this.modal = false;
          this.isClose = true;
          this.loading = false;
          this.modalMessage =  "您确定进行智能排课吗?";
          console.log(response.body);
        },function(error){
          this.modalMessage =  "排课失败，请重试！";
          this.isClose = true;
          this.$Message.error("连接失败，请重试！");
        });
      },
      closeModal: function () {
//        关闭对话框
        if(this.isClose){
          this.modal = false;
          this.loading = false;
          this.modalMessage =  "您确定进行智能排课吗?";
        }
      }
    }
  }
</script>

<style scoped>
  #couArrangeTableDiv{
    background-color: #f3f3f3;
  }
  #mainDiv{
    /*页面*/
    background-color: white;
    margin: 0 5rem;
    min-height: 33rem;
  }
  select{
    margin-right: 1.4rem;
  }
  #operationDiv{
    background-color: white;
    margin: 0 0 0.6rem;
  }
  #selectDiv{
    padding: 0.6rem 5rem;
    display: flex;
  }
  #tableTipP{
    /*功能页面标题*/
    color: #C1C1C1;
    position: relative;
    text-align: left;
    z-index: 2;
    padding: 1rem;
    margin: 0;
  }
  #tableInfoP{
    /*表格课表标题*/
    text-align: left;
    position: relative;
    margin-top: 0;
    left: 1rem;
  }
  @media screen and (max-width:1025px) {
    html {
      font-size: 56%;
    }
  }
</style>
