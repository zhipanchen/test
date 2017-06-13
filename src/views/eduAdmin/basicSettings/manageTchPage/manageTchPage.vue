<template>
    <!--使用import引入的组件组合page页面-->
    <div id="manageTchPage">
      <topTitle></topTitle>
      <topBar></topBar>
      <div class="positionBar">
        <span>您的当前位置是：</span>
        <span><a href="#/login/main/eduAdminHome" class="returnHome">首页</a></span>
        <span> > <a href="#/login/main/eduAdminHome?baseSetting" class="returnHome">基本设置</a> > 人员管理设置 > 教师管理 </span>
      </div>
      <tchTable></tchTable>
    </div>
</template>

<script>
  /*import引入该page页面的单文件组件*/
  import topTitle from '../../../../components/public/topTitle/topTitle.vue'
  import topBar from '../../../../components/eduAdmin/basicSettings/manageTchPage/topBar/topbar.vue'
  import tchTable from '../../../../components/eduAdmin/basicSettings/manageTchPage/tchTable/tchTable.vue'
  export default {
    name: 'manageTchPage',
    data () {
      return {
        msg: ''
      }
    },
    /*注册import引入的单文件组件*/
    components:{
      topTitle,
      topBar,
      tchTable
    }
  }
</script>

<style scoped>
    html {
        font-size: 100%;
    }
    #manageTchPage{
      min-height:50rem;
    }
    @media screen and (max-width: 1023px) {
        html {
            font-size: 56%;
        }
    }
</style>
