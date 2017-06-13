<template>
    <!--使用import引入的组件组合page页面-->
    <div id="manageClassPage">
      <topTitle></topTitle>
      <topBar></topBar>
      <div class="positionBar">
        <span>您的当前位置是：</span>
        <span><a href="#/login/main/eduAdminHome" class="returnHome">首页</a></span>
        <span> > <a href="#/login/main/eduAdminHome?baseSetting" class="returnHome">基本设置</a> > 人员管理设置 > 学生异动情况 </span>
      </div>
      <stdInfoTable></stdInfoTable>
    </div>
</template>

<script>
  /*import引入该page页面的单文件组件*/
  import topTitle from '../../../../components/public/topTitle/topTitle.vue'
  import topBar from '../../../../components/eduAdmin/eduManage/manageClassPage/topBar/topBar.vue'
  import stdInfoTable from '../../../../components/eduAdmin/eduManage/manageClassPage/stdInfoTable/stdInfoTable.vue'
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
      stdInfoTable
    }
  }
</script>

<style scoped>
    html {
        font-size: 100%;
    }
    #manageClassPage{
      min-height: 50rem;
    }
    @media screen and (max-width: 1023px) {
        html {
            font-size: 56%;
        }
    }
</style>
