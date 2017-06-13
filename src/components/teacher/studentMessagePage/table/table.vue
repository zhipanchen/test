<template>
  <div>
    <div  class="positionBar">
      <span>您当前的位置：</span>
      <span><a href="#/login/main/eduAdminHome" class="returnHome">首页</a></span>
      <span>><a href="#/teacher/class/teachingEvaluate" class="returnHome">评教结果</a></span>
      <span>>学生留言</span>
    </div>
    <div id="table">
      <div id="back">
       <table class="normalTable" id="recordTable">
         <thead>
           <tr>
             <th style="border-color: white">序号</th>
             <th style="border-color: white">评教分数</th>
             <th style="border-color: white">评教时间</th>
             <th style="border-color: white"><img class="Img"  :src="iconSrc1">学生留言</th>
           </tr>
         </thead>
         <tbody>
           <tr v-for="(data,index) in resultList">
             <td>{{index+1}}</td>
             <td v-text="data.record"></td>
             <td v-text="data.evaDate"></td>
             <td v-text="data.textEva"></td>
           </tr>
         </tbody>
       </table>
      <div style="text-align: center"><button id="turn" class="am-btn am-btn-success am-radius" @click="cancel()">返回</button></div>
      </div>
    </div>
    </div>
</template>

<script>
    import icon1 from'./icon1.png'
    export default {
        name: 'table',
        data () {
            return {
                iconSrc1:icon1,
                resultList:''
            }
        },
        beforeMount:function(){
          var thisURL = document.URL;
          var courseId =thisURL.split("?")[1];
          this.$http.post('./teacherCheckEvaResultText',JSON.stringify({
              "courseAssociationId":courseId
            }),
            {"Content-Type":"application/json"}).then(function(response){
              console.log(response.body);
              this.resultList = response.body.evaResultText;
            },
            function(error){
              console.log("审核通过error:");
              console.log(error);
            });
        },
      methods:{
        cancel:function(){
//        location.reload();
          window.history.back(-1);
        }
      }
    }
</script>

<style lang="css" scoped>
  @import '../../../../assets/css/external.css';
  #table{
    background-color: #f3f3f3;
    /*width:100%;*/
    height:40rem;
    padding-right:5rem;
    padding-left:5rem;
  }
  #back{
    background-color: white;
    top:2rem;
    position: relative;
  }
  #recordTable{
    /*padding-bottom: 1rem;*/
    /*display: flex;*/
    /*justify-content: center;*/

  }
  .Img{
    width:1.2rem;
    height:1.2rem;
    margin-right:0.5rem;
  }
  #turn{
    margin-top:1rem;
    margin-bottom: 1rem;
  }

</style>
