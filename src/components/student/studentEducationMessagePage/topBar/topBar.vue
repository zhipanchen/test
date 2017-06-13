<template>
  <div class="topBarDiv am-btn-group">
    <a :href="manualCouUrl">
      <button id="manualCouButton" class="topBarButton am-btn am-btn-success btn-active">{{ manualCouButton }}</button>
    </a>
  </div>
</template>

<script>
  export default {
    name: 'topBarDiv',
    data () {
      return {
        manualCouButton: '信息通知',
        manualCouUrl:  '#/student/query/educationMessage',
      }
    }
  }
</script>

<style lang="css" scoped>

  html {
    font-size: 16px;
  }
  #manualCouButton {
    margin-left: 5rem;
  }
  @media screen and (max-width:1023px) {
    html {
      font-size: 9px;
    }
  }
</style>
