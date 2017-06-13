<template>
  <div id="app">
    <router-view></router-view>
    <!--路由加载-->
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
      }
    },
    /*created: function() {
      this.$http.get('../test.php').then(function(response){
        console.log(response.body);
      });
    }*/
  }

</script>

<style lang="css">
  @import './assets/css/external.css';/*写在app中即可*/
  html{
    font-size: 100%;
    font-family: 微软雅黑;
  }
  body{
    margin: 0;
  }
  @media screen and (max-width:1023px) {
    html {
      font-size: 56%;
    }
  }
</style>
