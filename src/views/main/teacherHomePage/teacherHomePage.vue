<template>
  <div id="teacherHome">
    <topTitle></topTitle>
    <teacherHomeDiv></teacherHomeDiv>
  </div>
</template>

<script>
  import topTitle from './../../../components/public/topTitle/topTitle.vue'
  import teacherHomeDiv from '../../../components/main/teacherHomePage/teacherHomeDiv/teacherHomeDiv.vue'
  export default {
    name: 'teacherHome',
    data () {
      return {
        msg: ''
      }
    },
    components: {
      topTitle,
      teacherHomeDiv
    },
    mounted: function() {
      var dom = document.getElementById("teacherHome");
      dom.style.minHeight = window.innerHeight + "px";
    }
  }
</script>

<style scoped>
  #teacherHome {
    /*padding-top: 1rem;*/

  }
  @media screen and (max-width: 1025px) {
    html {
    }
  }
</style>
