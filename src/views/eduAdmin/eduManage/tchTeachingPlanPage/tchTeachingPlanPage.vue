<template>
    <!--使用import引入的组件组合page页面-->
    <div id="tchTeachingPlanPage">
      <topTitle></topTitle>
      <topBar></topBar>
      <div class="positionBar">
        <span>您的当前位置是：</span>
        <span><a href="#/login/main/eduAdminHome" class="returnHome">首页</a></span>
        <span> > <a href="#/login/main/eduAdminHome?manage" class="returnHome">教务管理</a> > 教务审查 > 教学计划 </span>
      </div>
      <courseGroupTable></courseGroupTable>
    </div>
</template>

<script>
  /*import引入该page页面的单文件组件*/
  import topTitle from '../../../../components/public/topTitle/topTitle.vue'
  import topBar from '../../../../components/eduAdmin/eduManage/tchTeachingPlanPage/topBar/topBar.vue'
  import courseGroupTable from '../../../../components/eduAdmin/eduManage/tchTeachingPlanPage/courseGroupTable/courseGroupTable.vue'
  export default {
    name: 'eduPlanPage',
    data () {
      return {
        msg: ''
      }
    },
    /*注册import引入的单文件组件*/
    components: {
      topTitle,
      topBar,
      courseGroupTable
    }
  }
</script>

<style scoped>
    html {
        font-size: 100%;
    }
    #tchTeachingPlanPage{
      min-height: 50rem;
    }
    @media screen and (max-width: 1023px) {
        html {
            font-size: 56%;
        }
    }
</style>
