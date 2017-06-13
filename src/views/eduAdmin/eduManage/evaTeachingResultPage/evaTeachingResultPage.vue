<template>
    <!--使用import引入的组件组合page页面-->
    <div id="evaTeachingReasultPage">
      <topTitle></topTitle>
      <topBar></topBar>
      <div class="positionBar">
        <span>您的当前位置是：</span>
        <span><a href="#/login/main/eduAdminHome" class="returnHome">首页</a></span>
        <span> > <a href="#/login/main/eduAdminHome?manage" class="returnHome">教务管理</a> > 教务省察 > 教务查看评教 </span>
      </div>
      <evaResultTable></evaResultTable>
    </div>
</template>

<script>
  /*import引入该page页面的单文件组件*/
  import topTitle from '../../../../components/public/topTitle/topTitle.vue'
  import topBar from '../../../../components/eduAdmin/eduManage/evaTeachingResultPage/topBar/topBar.vue'
  import evaResultTable from '../../../../components/eduAdmin/eduManage/evaTeachingResultPage/evaResultTable/evaResultTable.vue'
  export default {
    name: 'manageClassPage',
    data () {
      return {
        msg: ''
      }
    },
    /*注册import引入的单文件组件*/
    components: {
      topTitle,
      topBar,
      evaResultTable
    }
  }
</script>

<style scoped>
    /*html {*/
        /*font-size: 100%;*/
    /*}*/
    #evaTeachingReasultPage{
      min-height: 50rem;
    }
    @media screen and (max-width: 1023px) {
      html {
        font-size: 56%;
      }
    }
</style>
