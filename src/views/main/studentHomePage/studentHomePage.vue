<template>
  <div id="studentHome">
    <topTitle></topTitle>
    <studentHomeDiv></studentHomeDiv>
  </div>
</template>

<script>
  import topTitle from './../../../components/public/topTitle/topTitle.vue'
  import studentHomeDiv from '../../../components/main/studentHomePage/studentHomeDiv/studentHomeDiv.vue'
  export default {
    name: 'studentHome',
    data () {
      return {
        msg: ''
      }
    },
    components: {
      topTitle,
      studentHomeDiv
    },
    mounted: function() {
//      dom加载后调整页面高度
      var dom = document.getElementById("studentHome");
      dom.style.minHeight = window.innerHeight + "px";
    }
  }
</script>

<style scoped>
  #studentHome {
    /*padding-top: 1rem;*/

  }
  @media screen and (max-width: 1025px) {
    html {
    }
  }
</style>
