<template>
  <div id="eduAdminHome">
    <topTitle></topTitle>
    <eduAdminHomeDiv></eduAdminHomeDiv>
  </div>
</template>

<script>
  import topTitle from './../../../components/public/topTitle/topTitle.vue'
  import eduAdminHomeDiv from '../../../components/main/eduAdminHomePage/eduAdminHomeDiv/eduAdminHomeDiv.vue'
  export default {
    name: 'eduAdminHome',
    data () {
      return {
        msg: ''
      }
    },
    components: {
      topTitle,
      eduAdminHomeDiv
    },
    mounted: function() {
//      dom加载后调整页面高度
      var dom = document.getElementById("eduAdminHome");
      dom.style.minHeight = window.innerHeight + "px";
    }
  }
</script>

<style scoped>
  #eduAdminHome {
    /*padding-top: 1rem;*/

  }
  @media screen and (max-width: 1025px) {
    html {
    }
  }
</style>
