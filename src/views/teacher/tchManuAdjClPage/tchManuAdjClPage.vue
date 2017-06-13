<template>
  <div id="tchManuCou">
    <top-title></top-title>
    <top-bar></top-bar>
    
    <adj-show></adj-show>
  </div>
</template>

<script>
import topTitle from '../../../components/public/topTitle/topTitle'
import topBar from '../../../components/teacher/tchManuAdjClPage/topBar/topBar'
import adjShow from '../../../components/teacher/tchManuAdjClPage/adjShow/adjShow'

export default {
  name: 'tchManuCou',
  data () {
    return {
      
    }
  },
  components: {
    topTitle, topBar, adjShow
  },
  methods: {
    
  }
}
</script>

<style scoped>
@media screen and (max-width: 1023px) {
  html {
  }
}
</style>
